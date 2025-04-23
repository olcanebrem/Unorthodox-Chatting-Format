import React, { useState } from 'react';
import Hot from './Hot'; // Canlı görüntüleme alanı
import InputHot from './InputHot'; // Yazı yazma alanı
import MessageBubble from './MessageBubble'; // Import MessageBubble again
const ChatContainer = () => {
  const [liveMessage, setLiveMessage] = useState(''); // Renamed state for clarity
  const [sentMessages, setSentMessages] = useState<string[]>([]); // State for sent messages

  // Update live typing view
  const handleMessageChange = (newMessage: string) => {
    setLiveMessage(newMessage); // Input'tan gelen yeni mesajı güncelle
  };

  // Handle sending a message
  const handleSendMessage = (messageToSend: string) => {
    setSentMessages(prevMessages => [...prevMessages, messageToSend]);
    // Live message is cleared by InputHot calling onMessageChange('')
    console.log('Message sent to container:', messageToSend);
    // TODO: Integrate with actual backend/state management later
  };

  return (
    // Main container
    <div className="relative flex flex-col h-full bg-gray-100 rounded-lg shadow-md overflow-hidden">
      {/* Sent Messages Display Area - Top half, scrollable */}
      {/* Added pb-4 for spacing */}
      <div className="absolute top-0 left-0 right-0 h-1/2 overflow-y-auto p-4 pb-4 z-0">
        <div className="flex flex-col-reverse min-h-full gap-2 items-center"> {/* Added items-center */}
          {/* Render sent messages */}
          {sentMessages.map((msg, index) => (
            <MessageBubble
              key={index} // Use a better key in production
              message={msg}
              isOwn={true} // Assuming all messages are from the user for now
            />
          ))}
          {/* Placeholder if no messages */}
          {sentMessages.length === 0 && (
            <p className="text-center text-gray-500 mt-auto">Sent messages will appear here</p>
          )}
        </div>
      </div>

      {/* Live Typing Display Area (Hot component) */}
      {/* Renders only if there is live text */}
      {liveMessage && <Hot message={liveMessage} />}

      {/* Input Area (Fixed bottom-center) */}
      <InputHot
        onMessageChange={handleMessageChange}
        onSendMessage={handleSendMessage} // Pass the send handler
      />
    </div>
  );
};

export default ChatContainer;
