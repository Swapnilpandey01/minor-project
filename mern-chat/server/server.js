require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const Message = require('./models/Message');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('join', (username) => {
    socket.username = username;
    console.log(`${username} joined`);
    socket.broadcast.emit('user-joined', { username });
  });

  socket.on('message', async (msgData) => {
    let username = msgData.username || socket.username || 'Anonymous';
    try {
      const message = new Message({
        sender: username,
        content: msgData.content,
        createdAt: new Date()
      });
      await message.save();
      io.emit('message', {
        _id: message._id,
        sender: message.sender,
        content: message.content,
        createdAt: message.createdAt
      });
    } catch (err) {
      console.error('Error saving message', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
    if (socket.username) {
      socket.broadcast.emit('user-left', { username: socket.username });
    }
  });
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('MongoDB connected');
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
