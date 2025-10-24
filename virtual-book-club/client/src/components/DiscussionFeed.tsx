import { useEffect, useRef, useState } from 'react';
import useDiscussionHook from '../hooks/useDiscussion';

export default function DiscussionFeed({ clubId }: { clubId: string }) {
  const { messages, sendMessage } = useDiscussionHook(clubId);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="card flex flex-col h-[480px]">
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {messages.map((m) => (
          <div key={m.id} className="rounded-xl bg-white/60 dark:bg-gray-700/60 p-2">
            <div className="text-xs opacity-70">{m.name} • {new Date(m.timestamp).toLocaleTimeString()}</div>
            <div>{m.content}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 rounded-2xl px-3 py-2 bg-white/70 dark:bg-gray-800/70 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share your thought..."
          onKeyDown={(e) => { if (e.key === 'Enter' && input.trim()) { sendMessage(input); setInput(''); }}}
        />
        <button className="btn" onClick={() => { if (input.trim()) { sendMessage(input); setInput(''); } }}>Send</button>
      </div>
    </div>
  );
}
