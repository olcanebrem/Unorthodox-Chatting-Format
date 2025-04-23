import React from 'react';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  message: string;
  isOwn: boolean;
  timestamp?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn, timestamp }) => {
  const bubbleClasses = isOwn
    ? 'bg-blue-500 text-white'
    : 'bg-gray-300 text-black';

  const containerClasses = isOwn ? 'justify-end' : 'justify-start';

  const animationProps = {
    initial: { 
        opacity: 0, 
        x: isOwn ? 50 : -50
    },
    animate: { 
        opacity: 1, 
        x: 0 
    },
    transition: { 
        duration: 0.3, 
        ease: "easeOut" 
    }
  };

  return (
    <motion.div
      className={`flex mb-2 ${containerClasses}`}
      {...animationProps}
    >
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg shadow ${bubbleClasses} self-start`}
      >
        <p className="break-words">{message}</p>
        {timestamp && (
          <span className={`text-xs mt-1 ${isOwn ? 'text-blue-100 opacity-75' : 'text-gray-600 opacity-75'}`}>
            {timestamp}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble; 