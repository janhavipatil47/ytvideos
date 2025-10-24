# Virtual Book Club

A beautiful, real-time, full-stack web app for collaborative reading. Track progress, take notes, and join live book discussions with AI-generated prompts.

## Stack
- Frontend: React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide
- Backend: Node.js + Express + MongoDB (Mongoose) + JWT + Socket.IO
- DevOps: Docker + docker-compose, GitHub Actions CI (lint, test, build)

## Quick Start

### 1) Environment
Create `.env` at the repo root (or copy `.env.example`):

```
PORT=4000
MONGODB_URI=mongodb://mongo:27017/virtual_book_club
JWT_SECRET=change_me_in_production
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development

VITE_API_BASE_URL=http://localhost:4000
VITE_WS_URL=http://localhost:4000
```

### 2) Run with Docker

```
docker-compose up --build
```
- Client: http://localhost:5173
- Server: http://localhost:4000
- MongoDB: mongodb://localhost:27017

### 3) Run locally without Docker

Terminal A (Server):
```
cd server
npm ci
npm run dev
```

Terminal B (Client):
```
cd client
npm ci
npm run dev
```

## Features
- JWT auth with role-based access (member, moderator, admin)
- Realtime discussion and reading progress via Socket.IO
- AI-style discussion questions (mocked) via `/api/ai/questions`
- Markdown notes editor with live preview
- Dark/light theme with persistence

## Scripts
See `client/package.json` and `server/package.json` for scripts: dev, build, lint, test, start.

## Deployment
- Frontend: Render/Vercel
- Backend: Render/Railway

Update environment variables accordingly; the client reads `VITE_*` env vars at build time.
