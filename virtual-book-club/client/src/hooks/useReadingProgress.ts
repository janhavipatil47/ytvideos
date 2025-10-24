import { useCallback, useMemo, useState } from 'react';

export function useReadingProgress(totalPages: number) {
  const [currentPage, setCurrentPage] = useState(0);

  const percent = useMemo(() => {
    if (!totalPages) return 0;
    return Math.min(100, Math.round((currentPage / totalPages) * 100));
  }, [currentPage, totalPages]);

  const updatePage = useCallback((page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages)));
  }, [totalPages]);

  return { currentPage, percent, updatePage };
}
