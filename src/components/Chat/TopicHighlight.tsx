import React from 'react';
import { TopicHighlight as TopicHighlightType } from '../../types/chat';

interface TopicHighlightProps {
  text: string;
  topics: TopicHighlightType[];
}

const TopicHighlight: React.FC<TopicHighlightProps> = ({ text, topics }) => {
  // TODO: Implement Topic Highlighting Logic
  // This might be a helper component or integrated into MessageBubble
  return <span>{text}</span>;
};

export default TopicHighlight; 