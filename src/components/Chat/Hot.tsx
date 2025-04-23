import React from 'react';

interface HotProps {
  message: string; // Yazılan mesaj
}

const Hot: React.FC<HotProps> = ({ message }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-4 w-full max-w-md">
      <div className="bg-red-500 px-6 py-2 rounded-full shadow-md text-center">
        <p className="text-white break-words min-h-[1.5em]">
          {message || <span className="text-red-100 opacity-75">Typing...</span>}
        </p>
      </div>
    </div>
  );
};

export default Hot;
