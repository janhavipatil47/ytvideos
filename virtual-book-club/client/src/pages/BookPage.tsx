import { useParams } from 'react-router-dom';
import { useReadingProgress } from '../hooks/useReadingProgress';
import ReadingTracker from '../components/ReadingTracker';
import NotesEditor from '../components/NotesEditor';

export default function BookPage() {
  const { id } = useParams();
  const { currentPage, percent, updatePage } = useReadingProgress(300);

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex justify-between items-center">
          <h1 className="font-serif text-2xl">Book #{id}</h1>
          <div className="flex items-center gap-2">
            <input type="number" className="rounded-2xl px-3 py-2 bg-white/70 dark:bg-gray-800/70 w-28" value={currentPage} onChange={(e) => updatePage(Number(e.target.value))} />
            <span>/ 300 pages</span>
          </div>
        </div>
      </div>
      <ReadingTracker percent={percent} />
      <NotesEditor onSave={(md) => console.log('save notes', md)} />
    </div>
  );
}
