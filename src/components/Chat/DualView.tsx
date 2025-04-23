import React from 'react';
import { ReplyChain } from '../../types/chat';

interface DualViewProps {
  replyChain: ReplyChain;
}

const DualView: React.FC<DualViewProps> = ({ replyChain }) => {
  // TODO: Implement Dual View Logic (displaying original message and replies)
  return <div>Dual View</div>;
};

export default DualView; 