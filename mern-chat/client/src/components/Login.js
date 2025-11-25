// import React, { useState } from 'react';
// const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
// export default function Login({ onLogin }) {
//   const [mode, setMode] = useState('login'); // or 'register'
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [msg, setMsg] = useState('');

//   const submit = async (e) => {
//     e.preventDefault();
//     setMsg('');
//     try {
//       const res = await fetch(`${API}/api/auth/${mode}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//       });
//       const data = await res.json();
//       if (!res.ok) { setMsg(data.message || 'Error'); return; }
//       if (mode === 'login') {
//         localStorage.setItem('chat_user', JSON.stringify({ token: data.token, username: data.username }));
//         onLogin({ token: data.token, username: data.username });
//       } else {
//         setMsg('Registered! Now switch to Login.');
//         setMode('login');
//       }
//     } catch (err) {
//       setMsg('Network error');
//     }
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
//       <form onSubmit={submit}>
//         <div style={{ marginBottom: 8 }}>
//           <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
//         </div>
//         <div style={{ marginBottom: 8 }}>
//           <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
//         </div>
//         <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
//       </form>
//       <div style={{ marginTop: 12 }}>
//         <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
//           Switch to {mode === 'login' ? 'Register' : 'Login'}
//         </button>
//       </div>
//       {msg && <p style={{ color: 'red' }}>{msg}</p>}
//       <p style={{ marginTop: 12, fontSize: 12, color: '#666' }}>Tip: register, then login. Tokens stored in localStorage.</p>
//     </div>
//   );
// }
import React, { useState } from "react";
const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch(`${API}/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMsg(data.message || "Error");
        return;
      }

      if (mode === "login") {
        localStorage.setItem(
          "chat_user",
          JSON.stringify({ token: data.token, username: data.username })
        );
        onLogin({ token: data.token, username: data.username });
      } else {
        setMsg("Registered! Now you can login.");
        setMode("login");
      }
    } catch {
      setMsg("Network error");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        padding: "40px 32px",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        textAlign: "center",
      }}
    >
      {/* Top Icon */}
      <div
        style={{
          width: 58,
          height: 58,
          borderRadius: "50%",
          background: "rgba(122, 67, 255, 0.15)",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <span
          style={{
            fontSize: 28,
            color: "#7A43FF",
          }}
        >
          💬
        </span>
      </div>

      <h2 style={{ margin: 0, fontSize: 22, color: "#333", fontWeight: 600 }}>
        {mode === "login" ? "Login to Chat App" : "Create Account"}
      </h2>

      <p style={{ marginTop: 6, color: "#777", fontSize: 14 }}>
        {mode === "login"
          ? "Welcome back! Please login to your account"
          : "Join us! Create your new account"}
      </p>

      <form
        onSubmit={submit}
        style={{ marginTop: 25, textAlign: "left", width: "100%" }}
      >
        <label style={{ fontSize: 13, fontWeight: 600, color: "#444" }}>
          Username or Email
        </label>
        <input
          style={{
            width: "100%",
            padding: "12px",
            marginTop: 6,
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 14,
          }}
          placeholder="Username or Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#444",
            marginTop: 16,
            display: "block",
          }}
        >
          Password
        </label>
        <input
          type="password"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: 6,
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 14,
          }}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#7A43FF",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            border: "none",
            borderRadius: 8,
            marginTop: 20,
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>

      {/* Switch Section */}
      <div style={{ marginTop: 20, fontSize: 14 }}>
        {mode === "login" ? (
          <>
            <span style={{ color: "#777" }}>New to ChatHub?</span>{" "}
            <button
              onClick={() => setMode("register")}
              style={{
                color: "#7A43FF",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Create New Account
            </button>
          </>
        ) : (
          <>
            <span style={{ color: "#777" }}>Already have an account?</span>{" "}
            <button
              onClick={() => setMode("login")}
              style={{
                color: "#7A43FF",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Login
            </button>
          </>
        )}
      </div>

      {msg && (
        <p style={{ color: "red", marginTop: 14, fontSize: 14 }}>{msg}</p>
      )}
    </div>
  );
}
