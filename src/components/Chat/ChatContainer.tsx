

// For simulating bot responses
type BotReplyMode = 'echo' | 'fixed';
import InputHot from './InputHot'; // Yazı yazma alanı
import MessageBubble from './MessageBubble'; // Import MessageBubble again
import { startBotMessaging } from './bot';
import { useEffect, useRef, useState } from 'react';

const ChatContainer = () => {
  // State for user and bot messages
  const [liveMessage, setLiveMessage] = useState('');
  const [botTyping, setBotTyping] = useState(''); // Bot's typing (simulate or extend later)
  type ChatMsg = { id: number; text: string };
  const [sentMessages, setSentMessages] = useState<ChatMsg[]>([]);
  const [botMessages, setBotMessages] = useState<ChatMsg[]>([]);

  // Start the random bot on mount
  useEffect(() => {
    const stopBot = startBotMessaging((msg) => {
      setBotTyping('Bot is typing...');
      setTimeout(() => {
        setBotTyping('');
        setBotMessages(prev => [{ id: Date.now() + Math.random(), text: msg }, ...prev]);
      }, 700); // Bot 'types' for 700ms before sending
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
        <div className="flex-1 flex flex-col-reverse justify-start items-center overflow-y-auto pb-2 scrollbar-none hide-scrollbar" style={{ maxHeight: '50%' }}>
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
        {/* Horizon + Hot previews (fixed, always in center, never moves) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 w-full" style={{ transform: 'translate(-50%, -50%)', height: 0 }}>
          {/* Bot Hot absolutely above horizon */}
          {botTyping && (
            <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2">
              
            </div>
          )}
          {/* Horizon divider strictly centered */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center" style={{ pointerEvents: 'none' }}>
            <div className="h-0.5 w-2/3 bg-gradient-to-r from-blue-300 via-gray-400 to-indigo-300 rounded-full opacity-60"></div>
          </div>
          {/* User Hot absolutely below horizon */}
          {liveMessage && (
            <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2">
              
            </div>
          )}
        </div>
        {/* Bottom: User messages, scroll down from horizon */}
        <div className="flex-1 flex flex-col justify-start items-center overflow-y-auto pt-2 scrollbar-none hide-scrollbar" style={{ maxHeight: '50%' }}>
          {/* User Hot as blue bubble */}
          {liveMessage && (
            <MessageBubble
              key="hot-preview"
              message={liveMessage}
              isOwn={true}
              isNewest={true}
              isHotPreview={true}
            />
          )}
          {sentMessages.map((msg, index) => (
            <MessageBubble
              key={msg.id}
              message={msg.text}
              isOwn={true}
              isNewest={!liveMessage && index === 0}
            />
          ))}
          {sentMessages.length === 0 && !liveMessage && (
            <p className="text-center text-gray-500 mt-auto">Sent messages will appear here</p>
          )}
        </div>
      </div>

      {/* Live Typing Display Area (Hot component) */}
      {/* Only show Hot if there is live text */}
      

      {/* Input Area (Fixed bottom-center) */}
      <InputHot
        onMessageChange={handleMessageChange}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatContainer;
