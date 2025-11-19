import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  const saved = JSON.parse(localStorage.getItem('chat_user') || 'null');
  const [user, setUser] = useState(saved);

  const onLogout = () => {
    localStorage.removeItem('chat_user');
    setUser(null);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', height: '100vh', display:'flex', justifyContent:'center', alignItems:'center' }}>
      <div style={{ width: 800, height: 600, border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)'}}>
        {!user ? <Login onLogin={setUser} /> : <Chat user={user} onLogout={onLogout} />}
      </div>
    </div>
  );
}

export default App;
