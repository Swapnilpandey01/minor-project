import React, { useState } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('login'); // or 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch(`${API}/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) { setMsg(data.message || 'Error'); return; }
      if (mode === 'login') {
        localStorage.setItem('chat_user', JSON.stringify({ token: data.token, username: data.username }));
        onLogin({ token: data.token, username: data.username });
      } else {
        setMsg('Registered! Now switch to Login.');
        setMode('login');
      }
    } catch (err) {
      setMsg('Network error');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={submit}>
        <div style={{ marginBottom: 8 }}>
          <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
      </form>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          Switch to {mode === 'login' ? 'Register' : 'Login'}
        </button>
      </div>
      {msg && <p style={{ color: 'red' }}>{msg}</p>}
      <p style={{ marginTop: 12, fontSize: 12, color: '#666' }}>Tip: register, then login. Tokens stored in localStorage.</p>
    </div>
  );
}
