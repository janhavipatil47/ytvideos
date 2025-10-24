import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState } from 'react';

export default function NotesEditor({ onSave }: { onSave: (markdown: string) => void }) {
  const [markdown, setMarkdown] = useState<string>('');
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card">
        <h3 className="font-serif mb-2">Notes</h3>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="w-full h-64 p-3 rounded-2xl bg-white/70 dark:bg-gray-800/70 outline-none"
          placeholder="Write your thoughts in Markdown..."
        />
        <button className="btn mt-3" onClick={() => onSave(markdown)}>Save</button>
      </div>
      <div className="card">
        <h3 className="font-serif mb-2">Preview</h3>
        <article className="prose dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
