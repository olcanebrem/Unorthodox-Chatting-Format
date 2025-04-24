import React from 'react';
import { motion } from 'framer-motion';

import { useSwipe } from '../../hooks/useSwipe';

interface MessageBubbleProps {
  id?: string;
  message: string;
  isOwn: boolean;
  timestamp?: string;
  isNewest?: boolean;
  isHotPreview?: boolean;
  replyTo?: string;
  onReply?: (id?: string) => void;
  onForward?: (id?: string) => void;
  onDrag?: (id?: string) => void;
  onClick?: (id?: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ id, message, isOwn, timestamp, isNewest, isHotPreview, replyTo, onReply, onForward, onDrag, onClick }) => {
  // Swipe gesture
  const { handleTouchStart, handleTouchEnd, handleMouseDown } = useSwipe(
    () => onReply && onReply(id),
    () => onForward && onForward(id)
  );
  const bubbleClasses = isHotPreview
    ? 'bg-blue-200 text-blue-900 border-2 border-dashed border-blue-400 animate-pulse'
    : isOwn
      ? 'bg-blue-500 text-white'
      : 'bg-gray-300 text-black';

  const containerClasses = isOwn ? 'justify-end' : 'justify-start';

  const animationProps = isNewest
    ? {
        initial: { opacity: 0, scale: 0.85, x: isOwn ? 80 : -80 },
        animate: { opacity: 1, scale: 1, x: 0 },
        transition: { duration: 0.35, ease: "easeOut" }
      }
    : {
        initial: { opacity: 0, x: isOwn ? 50 : -50 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.3, ease: "easeOut" }
      };

  return (
    <motion.div
      className={`flex mb-2 ${containerClasses} select-none`}
      {...animationProps}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onClick={() => onClick && onClick(id)}
      draggable={!!onDrag}
      onDragStart={() => onDrag && onDrag(id)}
      style={{ cursor: onDrag ? 'grab' : undefined }}
    >
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg shadow ${bubbleClasses} self-start`}
      >
        {/* Eğer replyTo varsa, referans mesajı göster */}
        {replyTo && (
          <div className="text-xs italic text-blue-300 mb-1">↩️ Replying to #{replyTo}</div>
        )}
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