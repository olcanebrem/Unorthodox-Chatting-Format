import React, { useState } from 'react';

// For simulating bot responses
type BotReplyMode = 'echo' | 'fixed';
import Hot from './Hot'; // Canlı görüntüleme alanı
import InputHot from './InputHot'; // Yazı yazma alanı
import MessageBubble from './MessageBubble'; // Import MessageBubble again
const ChatContainer = () => {
  // State for user and bot messages
  const [liveMessage, setLiveMessage] = useState('');
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const [botMessages, setBotMessages] = useState<string[]>([]);
  const botReplyMode: BotReplyMode = 'echo'; // Change to 'fixed' for fixed replies

  // Simulate bot reply after user sends a message
  const simulateBotReply = (userMsg: string) => {
    setTimeout(() => {
      let botMsg = '';
      if (botReplyMode === 'echo') {
        botMsg = `Bot: ${userMsg}`;
      } else {
        botMsg = 'Bot: This is a test reply!';
      }
      setBotMessages(prev => [...prev, botMsg]);
    }, 1200); // 1.2s delay for realism
  };


  // Update live typing view
  const handleMessageChange = (newMessage: string) => {
    setLiveMessage(newMessage); // Input'tan gelen yeni mesajı güncelle
  };

  // Handle sending a message
  const handleSendMessage = (messageToSend: string) => {
    setSentMessages(prevMessages => [...prevMessages, messageToSend]);
    simulateBotReply(messageToSend); // Simulate bot reply
    // Live message is cleared by InputHot calling onMessageChange('')
    console.log('Message sent to container:', messageToSend);
    // TODO: Integrate with actual backend/state management later
  };

  return (
    // Main container
    <div className="relative flex flex-col h-full bg-gray-100 rounded-lg shadow-md overflow-hidden">
      {/* Horizon (Receiver/Bot) Display Area - Top half, scrollable */}
      <div className="absolute top-0 left-0 right-0 h-1/2 overflow-y-auto p-4 pb-4 z-0">
        <div className="flex flex-col-reverse min-h-full gap-2 items-center">
          {/* Render bot messages */}
          {botMessages.map((msg, index) => (
            <MessageBubble
              key={index}
              message={msg}
              isOwn={false}
            />
          ))}
          {botMessages.length === 0 && (
            <p className="text-center text-gray-400 mt-auto">Bot messages will appear here</p>
          )}
        </div>
      </div>

      {/* Writer (User) Display Area - Bottom half, scrollable */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-y-auto p-4 pt-4 z-0 border-t border-gray-300 bg-white bg-opacity-80">
        <div className="flex flex-col-reverse min-h-full gap-2 items-center">
          {/* Render sent messages */}
          {sentMessages.map((msg, index) => (
            <MessageBubble
              key={index}
              message={msg}
              isOwn={true}
            />
          ))}
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
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatContainer;
