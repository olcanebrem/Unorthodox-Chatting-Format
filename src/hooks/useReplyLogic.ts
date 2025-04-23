import { useState } from 'react';
import { Message } from '../types/chat';

export const useReplyLogic = () => {
  const [replyTarget, setReplyTarget] = useState<Message | null>(null);
  // TODO: Implement logic for setting reply target (on swipe left), clearing it
  return { replyTarget, setReplyTarget };
}; 