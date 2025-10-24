export default function ReadingTracker({ percent }: { percent: number }) {
  return (
    <div className="card">
      <div className="flex justify-between mb-2">
        <span className="font-serif">Reading Progress</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full h-3 bg-gray-200/70 dark:bg-gray-700/60 rounded-full overflow-hidden">
        <div className="h-3 bg-amber" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
