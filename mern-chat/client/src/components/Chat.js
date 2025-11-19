import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Chat({ user, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const socketRef = useRef(null);
  const bottomRef = useRef();

  useEffect(() => {
    fetch(`${API}/api/messages`)
      .then(r => r.json())
      .then(data => setMessages(data))
      .catch(err => console.error(err));

    socketRef.current = io(API);
    socketRef.current.on('connect', () => {
      socketRef.current.emit('join', user.username);
    });

    socketRef.current.on('message', (m) => {
      setMessages(prev => [...prev, m]);
    });

    socketRef.current.on('user-joined', ({ username }) => {
      setMessages(prev => [...prev, { _id: `sys-${Date.now()}`, sender: 'System', content: `${username} joined` }]);
    });

    socketRef.current.on('user-left', ({ username }) => {
      setMessages(prev => [...prev, { _id: `sys-${Date.now()}`, sender: 'System', content: `${username} left` }]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [user.username]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (e) => {
    e?.preventDefault();
    if (!text.trim()) return;
    const payload = { username: user.username, content: text.trim() };
    socketRef.current.emit('message', payload);
    setText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: 12, borderBottom: '1px solid #eee', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <strong>Chat Room</strong>
          <div style={{ fontSize: 12, color: '#666' }}>Logged in as: {user.username}</div>
        </div>
        <div>
          <button onClick={() => { onLogout(); }}>Logout</button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 12, background: '#fafafa' }}>
        {messages.map(m => (
          <div key={m._id} style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 12, color: '#888' }}>{m.sender} <span style={{ fontSize: 11, color:'#aaa' }}>{m.createdAt ? (new Date(m.createdAt).toLocaleTimeString()) : ''}</span></div>
            <div style={{ padding: 8, background: '#fff', borderRadius: 6 }}>{m.content}</div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <form onSubmit={send} style={{ display: 'flex', padding: 12, borderTop: '1px solid #eee' }}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Type a message..." style={{ flex: 1, marginRight: 8 }} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
