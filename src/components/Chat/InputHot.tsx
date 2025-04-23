import React, { useState } from 'react';

interface InputHotProps {
  onMessageChange: (message: string) => void;
  onSendMessage: (message: string) => void;
}

const InputHot: React.FC<InputHotProps> = ({ onMessageChange, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    onMessageChange(e.target.value); // Input'tan gelen yeni mesajı güncelle
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && message.trim()) {
      handleSend(); // Enter'a basıldığında mesajı gönder
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message); // Mesajı gönder
      setMessage(''); // Inputu temizle
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white p-2 rounded-t-lg shadow-md z-50">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        className="w-full p-2 rounded-lg border border-gray-300"
      />
      <button
        onClick={handleSend}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Send
      </button>
    </div>
  );
};

export default InputHot;
