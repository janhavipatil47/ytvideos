import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DiscussionFeed from '../components/DiscussionFeed';
import { fetchAIQuestions } from '../utils/api';

export default function ClubPage() {
  const { id } = useParams();
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const qs = await fetchAIQuestions({ bookTitle: 'Sample Book', author: 'Author', progress: 42 });
      setQuestions(qs);
    })();
  }, [id]);

  if (!id) return null;
  return (
    <div className="space-y-4">
      <div className="card">
        <h1 className="font-serif text-2xl">Club #{id} Discussion</h1>
        <p className="opacity-80">Live chat and AI prompts below.</p>
      </div>
      {questions.length > 0 && (
        <div className="card">
          <h3 className="font-serif mb-2">AI Questions</h3>
          <ul className="list-disc pl-6 space-y-1">
            {questions.map((q, i) => (<li key={i}>{q}</li>))}
          </ul>
        </div>
      )}
      <DiscussionFeed clubId={id} />
    </div>
  );
}
