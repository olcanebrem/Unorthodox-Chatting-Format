

// For simulating bot responses
type BotReplyMode = 'echo' | 'fixed';
import Hot from './Hot'; // Canlı görüntüleme alanı
import InputHot from './InputHot'; // Yazı yazma alanı
import MessageBubble from './MessageBubble'; // Import MessageBubble again
import { startBotMessaging } from './bot';
import { useEffect, useRef, useState } from 'react';

const ChatContainer = () => {
  // State for user and bot messages
  const [liveMessage, setLiveMessage] = useState('');
  type ChatMsg = { id: number; text: string };
  const [sentMessages, setSentMessages] = useState<ChatMsg[]>([]);
  const [botMessages, setBotMessages] = useState<ChatMsg[]>([]);

  // Start the random bot on mount
  useEffect(() => {
    const stopBot = startBotMessaging((msg) => {
      setBotMessages(prev => [{ id: Date.now() + Math.random(), text: msg }, ...prev]);
    });
    return () => stopBot();
  }, []);


  // Update live typing view
  const handleMessageChange = (newMessage: string) => {
    setLiveMessage(newMessage); // Input'tan gelen yeni mesajı güncelle
  };

  // Handle sending a message
  const handleSendMessage = (messageToSend: string) => {
    setSentMessages(prevMessages => [{ id: Date.now() + Math.random(), text: messageToSend }, ...prevMessages]);
    // Live message is cleared by InputHot calling onMessageChange('')
    console.log('Message sent to container:', messageToSend);
    // TODO: Integrate with actual backend/state management later
  };


  return (
    // Main container
    <div className="relative flex flex-col h-full bg-gray-100 rounded-lg shadow-md overflow-hidden">
      {/* Dual independent scroll containers with horizon in the center */}
      <div className="flex flex-col h-full w-full">
        {/* Top: Bot messages, scroll up from horizon */}
        <div className="flex-1 flex flex-col-reverse overflow-y-auto pb-2" style={{ maxHeight: '50%' }}>
          {botMessages.map((msg, index) => (
            <MessageBubble
              key={msg.id}
              message={msg.text}
              isOwn={false}
              isNewest={index === 0}
            />
          ))}
          {botMessages.length === 0 && (
            <p className="text-center text-gray-400 mt-auto">Bot messages will appear here</p>
          )}
        </div>
        {/* Horizon divider (fixed, always in center) */}
        <div className="w-full flex items-center justify-center sticky top-0 z-10 bg-transparent" style={{ height: '0', minHeight: '0' }}>
          <div className="h-0.5 w-2/3 bg-gradient-to-r from-blue-300 via-gray-400 to-indigo-300 rounded-full opacity-60"></div>
        </div>
        {/* Bottom: User messages, scroll down from horizon */}
        <div className="flex-1 flex flex-col overflow-y-auto pt-2" style={{ maxHeight: '50%' }}>
          {sentMessages.map((msg, index) => (
            <MessageBubble
              key={msg.id}
              message={msg.text}
              isOwn={true}
              isNewest={index === 0}
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
