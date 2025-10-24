import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

export async function fetchAIQuestions(params: { bookTitle?: string; author?: string; progress?: number }) {
  const res = await axios.post(`${API_BASE}/api/ai/questions`, params);
  return res.data.questions as string[];
}
