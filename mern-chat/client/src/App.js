// import React, { useState } from 'react';
// import Login from './components/Login';
// import Chat from './components/Chat';

// function App() {
//   const saved = JSON.parse(localStorage.getItem('chat_user') || 'null');
//   const [user, setUser] = useState(saved);

//   const onLogout = () => {
//     localStorage.removeItem('chat_user');
//     setUser(null);
//   };

//   return (
//     <div style={{ fontFamily: 'Arial, sans-serif', height: '100vh', display:'flex', justifyContent:'center', alignItems:'center' }}>
//       <div style={{ width: 800, height: 600, border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)'}}>
//         {!user ? <Login onLogin={setUser} /> : <Chat user={user} onLogout={onLogout} />}
//       </div>
//     </div>
//   );
// }



// import React, { useState } from 'react';
// import Login from './components/Login';
// import Chat from './components/Chat';
// import bg from './assets/bg.jpg';


// function App() {
//   const saved = JSON.parse(localStorage.getItem('chat_user') || 'null');
//   const [user, setUser] = useState(saved);

//   const onLogout = () => {
//     localStorage.removeItem('chat_user');
//     setUser(null);
//   };

//   return (
    
    
//     <div
//       style={{
//         height: '100vh',
//         width: '100vw',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundImage: `url(${bg})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       {/* Glass Card */}
//       <div
//         style={{
//           width: 800,
//           height: 600,
//           borderRadius: 16,
//           padding: 0,
//           overflow: 'hidden',
//           backdropFilter: 'blur(12px)',
//           background: 'rgba(255, 255, 255, 0.15)',
//           border: '1px solid rgba(255, 255, 255, 0.3)',
//           boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
//         }}
//       >
//         {!user ? (
//           <Login onLogin={setUser} />
//         ) : (
//           <Chat user={user} onLogout={onLogout} />
//         )} 
        
//       </div>
//     </div>
//   );
// }

// export default App;



import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import bg from './assets/bg.jpg';

function App() {
  const saved = JSON.parse(localStorage.getItem('chat_user') || 'null');
  const [user, setUser] = useState(saved);

  const onLogout = () => {
    localStorage.removeItem('chat_user');
    setUser(null);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* Blurred Glass Container */}
      <div
        style={{
          width: "90%",
          maxWidth: 950,
          height: "85%",
          maxHeight: 650,
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(12px)",
          borderRadius: 20,
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        {!user ? (
          <Login onLogin={setUser} />
        ) : (
          <Chat user={user} onLogout={onLogout} />
        )}
      </div>

    </div>
  );
}

export default App;
