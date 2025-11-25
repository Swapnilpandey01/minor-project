// import React, { useEffect, useState, useRef } from 'react';
// import { io } from 'socket.io-client';

// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// export default function Chat({ user, onLogout }) {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState('');
//   const socketRef = useRef(null);
//   const bottomRef = useRef();

//   useEffect(() => {
//     fetch(`${API}/api/messages`)
//       .then(r => r.json())
//       .then(data => setMessages(data))
//       .catch(err => console.error(err));

//     socketRef.current = io(API);
//     socketRef.current.on('connect', () => {
//       socketRef.current.emit('join', user.username);
//     });

//     socketRef.current.on('message', (m) => {
//       setMessages(prev => [...prev, m]);
//     });

//     socketRef.current.on('user-joined', ({ username }) => {
//       setMessages(prev => [...prev, { _id: `sys-${Date.now()}`, sender: 'System', content: `${username} joined` }]);
//     });

//     socketRef.current.on('user-left', ({ username }) => {
//       setMessages(prev => [...prev, { _id: `sys-${Date.now()}`, sender: 'System', content: `${username} left` }]);
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [user.username]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const send = (e) => {
//     e?.preventDefault();
//     if (!text.trim()) return;
//     const payload = { username: user.username, content: text.trim() };
//     socketRef.current.emit('message', payload);
//     setText('');
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//       <div style={{ padding: 12, borderBottom: '1px solid #eee', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
//         <div>
//           <strong>Chat Room</strong>
//           <div style={{ fontSize: 12, color: '#666' }}>Logged in as: {user.username}</div>
//         </div>
//         <div>
//           <button onClick={() => { onLogout(); }}>Logout</button>
//         </div>
//       </div>

//       <div style={{ flex: 1, overflowY: 'auto', padding: 12, background: '#fafafa' }}>
//         {messages.map(m => (
//           <div key={m._id} style={{ marginBottom: 8 }}>
//             <div style={{ fontSize: 12, color: '#888' }}>{m.sender} <span style={{ fontSize: 11, color:'#aaa' }}>{m.createdAt ? (new Date(m.createdAt).toLocaleTimeString()) : ''}</span></div>
//             <div style={{ padding: 8, background: '#fff', borderRadius: 6 }}>{m.content}</div>
//           </div>
//         ))}
//         <div ref={bottomRef}></div>
//       </div>

//       <form onSubmit={send} style={{ display: 'flex', padding: 12, borderTop: '1px solid #eee' }}>
//         <input value={text} onChange={e => setText(e.target.value)} placeholder="Type a message..." style={{ flex: 1, marginRight: 8 }} />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }


//version 2

// import React, { useEffect, useState, useRef } from "react";
// import { io } from "socket.io-client";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// export default function Chat({ user, onLogout }) {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const socketRef = useRef(null);
//   const bottomRef = useRef();

//   useEffect(() => {
//     fetch(`${API}/api/messages`)
//       .then((r) => r.json())
//       .then((data) => setMessages(data))
//       .catch((err) => console.error(err));

//     socketRef.current = io(API);

//     socketRef.current.on("connect", () => {
//       socketRef.current.emit("join", user.username);
//     });

//     socketRef.current.on("message", (m) => {
//       setMessages((prev) => [...prev, m]);
//     });

//     socketRef.current.on("user-joined", ({ username }) => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           _id: `sys-${Date.now()}`,
//           sender: "System",
//           content: `${username} joined`,
//         },
//       ]);
//     });

//     socketRef.current.on("user-left", ({ username }) => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           _id: `sys-${Date.now()}`,
//           sender: "System",
//           content: `${username} left`,
//         },
//       ]);
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [user.username]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const send = (e) => {
//     e?.preventDefault();
//     if (!text.trim()) return;

//     const payload = { username: user.username, content: text.trim() };
//     socketRef.current.emit("message", payload);
//     setText("");
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         width: "100%",
//         backdropFilter: "blur(10px)",
//         background: "rgba(255,255,255,0.35)",
//         borderRadius: 20,
//         overflow: "hidden",
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           padding: "14px 20px",
//           background: "rgba(255,255,255,0.6)",
//           borderBottom: "1px solid rgba(0,0,0,0.1)",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           backdropFilter: "blur(8px)",
//         }}
//       >
//         <div>
//           <strong style={{ fontSize: 18 }}>Chat Room</strong>
//           <div style={{ fontSize: 12, color: "#666" }}>
//             Logged in as: {user.username}
//           </div>
//         </div>

//         <button
//           onClick={onLogout}
//           style={{
//             padding: "6px 14px",
//             background: "#7A43FF",
//             color: "#fff",
//             border: "none",
//             borderRadius: 6,
//             cursor: "pointer",
//             fontSize: 13,
//           }}
//         >
//           Logout
//         </button>
//       </div>

//       {/* Message Area */}
//       <div
//         style={{
//           flex: 1,
//           overflowY: "auto",
//           padding: "18px",
//           background: "rgba(255,255,255,0.2)",
//         }}
//       >
//         {messages.map((m) => {
//           const isMine = m.sender === user.username;
//           const isSystem = m.sender === "System";

//           return (
//             <div
//               key={m._id}
//               style={{
//                 marginBottom: 12,
//                 textAlign: isMine ? "right" : "left",
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: 11,
//                   color: isSystem ? "#888" : "#555",
//                   marginBottom: 4,
//                 }}
//               >
//                 {!isSystem && m.sender}
//               </div>

//               <div
//                 style={{
//                   display: "inline-block",
//                   padding: "10px 14px",
//                   borderRadius: 10,
//                   maxWidth: "70%",
//                   background: isSystem
//                     ? "rgba(100,100,100,0.15)"
//                     : isMine
//                     ? "#7A43FF"
//                     : "white",
//                   color: isMine ? "white" : "#333",
//                   boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//                   fontSize: 14,
//                 }}
//               >
//                 {m.content}
//               </div>
//             </div>
//           );
//         })}

//         <div ref={bottomRef}></div>
//       </div>

//       {/* Input */}
//       <form
//         onSubmit={send}
//         style={{
//           display: "flex",
//           padding: "14px",
//           background: "rgba(255,255,255,0.5)",
//           borderTop: "1px solid rgba(0,0,0,0.1)",
//           backdropFilter: "blur(8px)",
//         }}
//       >
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Type a message..."
//           style={{
//             flex: 1,
//             padding: "12px",
//             borderRadius: 10,
//             border: "1px solid rgba(0,0,0,0.15)",
//             fontSize: 14,
//             outline: "none",
//           }}
//         />

//         <button
//           type="submit"
//           style={{
//             marginLeft: 10,
//             padding: "12px 18px",
//             background: "#7A43FF",
//             color: "#fff",
//             border: "none",
//             borderRadius: 10,
//             cursor: "pointer",
//             fontWeight: 600,
//             fontSize: 14,
//           }}
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }

// version 3

import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Chat({ user, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // NEW
  const [typingUsers, setTypingUsers] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);

  const socketRef = useRef(null);
  const bottomRef = useRef();
  const typingTimeout = useRef(null);

  useEffect(() => {
    fetch(`${API}/api/messages`)
      .then((r) => r.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));

    socketRef.current = io(API);

    socketRef.current.on("connect", () => {
      socketRef.current.emit("join", user.username);
    });

    socketRef.current.on("message", (m) => {
      setMessages((prev) => [...prev, m]);
    });

    socketRef.current.on("user-joined", ({ username }) => {
      setMessages((prev) => [
        ...prev,
        {
          _id: `sys-${Date.now()}`,
          sender: "System",
          content: `${username} joined`,
        },
      ]);
    });

    socketRef.current.on("user-left", ({ username }) => {
      setMessages((prev) => [
        ...prev,
        {
          _id: `sys-${Date.now()}`,
          sender: "System",
          content: `${username} left`,
        },
      ]);
    });

    // NEW — typing listener
    socketRef.current.on("typing", ({ username }) => {
      setTypingUsers((prev) =>
        prev.includes(username) ? prev : [...prev, username]
      );
    });

    socketRef.current.on("stop-typing", ({ username }) => {
      setTypingUsers((prev) => prev.filter((u) => u !== username));
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [user.username]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // NEW — send typing event
  const handleTyping = (v) => {
    setText(v);

    socketRef.current.emit("typing", { username: user.username });

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socketRef.current.emit("stop-typing", { username: user.username });
    }, 700);
  };

  const send = (e) => {
    e?.preventDefault();
    if (!text.trim()) return;

    const payload = { username: user.username, content: text.trim() };
    socketRef.current.emit("message", payload);
    setText("");

    socketRef.current.emit("stop-typing", { username: user.username });
    setShowEmoji(false);
  };

  // NEW — emoji picker list
  const emojis = ["😀", "😂", "😍", "😎", "😅", "🙌", "🎉", "👍", "🔥", "❤️"];

  const addEmoji = (emoji) => {
    setText((t) => t + emoji);
    setShowEmoji(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.35)",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 20px",
          background: "rgba(255,255,255,0.6)",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backdropFilter: "blur(8px)",
        }}
      >
        <div>
          <strong style={{ fontSize: 18 }}>Chat Room</strong>
          <div style={{ fontSize: 12, color: "#666" }}>
            Logged in as: {user.username}
          </div>
        </div>

        <button
          onClick={onLogout}
          style={{
            padding: "6px 14px",
            background: "#7A43FF",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          Logout
        </button>
      </div>

      {/* Message Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "18px",
          background: "rgba(255,255,255,0.2)",
        }}
      >
        {messages.map((m) => {
          const isMine = m.sender === user.username;
          const isSystem = m.sender === "System";

          return (
            <div
              key={m._id}
              style={{
                marginBottom: 12,
                textAlign: isMine ? "right" : "left",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: isSystem ? "#888" : "#555",
                  marginBottom: 4,
                }}
              >
                {!isSystem && m.sender}
              </div>

              <div
                style={{
                  display: "inline-block",
                  padding: "10px 14px",
                  borderRadius: 10,
                  maxWidth: "70%",
                  background: isSystem
                    ? "rgba(100,100,100,0.15)"
                    : isMine
                    ? "#7A43FF"
                    : "white",
                  color: isMine ? "white" : "#333",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  fontSize: 14,
                }}
              >
                {m.content}
              </div>
            </div>
          );
        })}

        {/* NEW — Typing indicator */}
        {typingUsers.length > 0 && (
          <div style={{ fontSize: 12, color: "#666", marginBottom: 10 }}>
            <em>{typingUsers.join(", ")} typing...</em>
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <form
        onSubmit={send}
        style={{
          display: "flex",
          padding: "14px",
          background: "rgba(255,255,255,0.5)",
          borderTop: "1px solid rgba(0,0,0,0.1)",
          backdropFilter: "blur(8px)",
          position: "relative",
        }}
      >
        {/* NEW — Emoji Button */}
        <button
          type="button"
          onClick={() => setShowEmoji((s) => !s)}
          style={{
            fontSize: 20,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            marginRight: 8,
          }}
        >
          😊
        </button>

        {/* Emoji Picker Popup */}
        {showEmoji && (
          <div
            style={{
              position: "absolute",
              bottom: 60,
              left: 10,
              background: "#fff",
              padding: 10,
              borderRadius: 10,
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              width: 200,
              zIndex: 10,
            }}
          >
            {emojis.map((e) => (
              <button
                key={e}
                onClick={() => addEmoji(e)}
                style={{
                  fontSize: 20,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {e}
              </button>
            ))}
          </div>
        )}

        <input
          value={text}
          onChange={(e) => handleTyping(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.15)",
            fontSize: 14,
            outline: "none",
            marginRight: 8,
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px 18px",
            background: "#7A43FF",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
