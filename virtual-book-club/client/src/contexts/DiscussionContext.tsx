import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface Message {
  id: string;
  userId: string;
  name: string;
  role: 'member' | 'moderator' | 'admin';
  content: string;
  timestamp: string;
}

interface DiscussionContextValue {
  socket: Socket | null;
  messages: Message[];
  connectToClub: (clubId: string) => void;
  sendMessage: (content: string) => void;
}

const DiscussionContext = createContext<DiscussionContextValue | undefined>(undefined);
const WS_URL = import.meta.env.VITE_WS_URL as string;

export function DiscussionProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const currentClubId = useRef<string | null>(null);

  useEffect(() => {
    const s = io(WS_URL, { autoConnect: false, transports: ['websocket'] });
    setSocket(s);
    return () => {
      s.close();
    };
  }, []);

  const connectToClub = (clubId: string) => {
    if (!socket) return;
    if (currentClubId.current) socket.emit('leave', { clubId: currentClubId.current });
    currentClubId.current = clubId;
    socket.connect();
    socket.emit('join', { clubId });

    socket.off('message');
    socket.on('message', (msg: Message) => setMessages((m) => [...m, msg]));
  };

  const sendMessage = (content: string) => {
    if (!socket || !currentClubId.current) return;
    socket.emit('message', { clubId: currentClubId.current, content });
  };

  const value = useMemo(() => ({ socket, messages, connectToClub, sendMessage }), [socket, messages]);
  return <DiscussionContext.Provider value={value}>{children}</DiscussionContext.Provider>;
}

export function useDiscussion() {
  const ctx = useContext(DiscussionContext);
  if (!ctx) throw new Error('useDiscussion must be used within DiscussionProvider');
  return ctx;
}
