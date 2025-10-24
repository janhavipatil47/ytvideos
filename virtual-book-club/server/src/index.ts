import http from 'http';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Server as IOServer } from 'socket.io';
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';
import clubRoutes from './routes/clubs.js';
import discussionRoutes from './routes/discussions.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true }));

const server = http.createServer(app);
const io = new IOServer(server, {
  cors: { origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }
});

io.on('connection', (socket) => {
  socket.on('join', ({ clubId }) => {
    socket.join(`club:${clubId}`);
  });
  socket.on('leave', ({ clubId }) => {
    socket.leave(`club:${clubId}`);
  });
  socket.on('message', ({ clubId, content }) => {
    const msg = {
      id: Math.random().toString(36).slice(2),
      userId: 'anon',
      name: 'Guest',
      role: 'member',
      content,
      timestamp: new Date().toISOString(),
    };
    io.to(`club:${clubId}`).emit('message', msg);
  });
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/ai', aiRoutes);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/virtual_book_club';
mongoose.connect(MONGODB_URI).then(() => {
  const PORT = Number(process.env.PORT) || 4000;
  server.listen(PORT, () => console.log(`Server listening on :${PORT}`));
}).catch((err) => {
  console.error('Mongo connection error', err);
  process.exit(1);
});
