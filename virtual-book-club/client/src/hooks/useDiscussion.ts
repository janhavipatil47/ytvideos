import { useEffect } from 'react';
import { useDiscussion } from '../contexts/DiscussionContext';

export default function useDiscussionHook(clubId: string) {
  const { connectToClub, messages, sendMessage } = useDiscussion();

  useEffect(() => {
    if (clubId) connectToClub(clubId);
  }, [clubId, connectToClub]);

  return { messages, sendMessage };
}
