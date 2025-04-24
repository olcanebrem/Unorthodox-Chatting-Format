// bot.ts
// Provides a function to start a random-message bot for the chat UI

const BOT_MESSAGES = [
  "Hey, how's it going?",
  "Did you see the latest news?",
  "I'm just a bot, but I like chatting!",
  "What's your favorite programming language?",
  "React is pretty cool, right?",
  "Sometimes I send random messages!",
  "Do you want to play a game?",
  "I'm always here to talk.",
  "How can I help you today?",
  "This UI looks awesome!",
  "Have you tried using Astro?",
  "Let's keep the conversation going!",
  "What are you working on?",
  "I can reply all day!",
  "Need any coding tips?",
  "Bots are fun to build!"
];

export type BotStopper = () => void;

export function startBotMessaging(onMessage: (msg: string) => void): BotStopper {
  let stopped = false;
  let timeoutId: NodeJS.Timeout;

  function sendRandomMessage() {
    if (stopped) return;
    const msg = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];
    onMessage(msg);
    // Next message in 1-2 seconds
    const nextDelay = 1000 + Math.random() * 2000;
    timeoutId = setTimeout(sendRandomMessage, nextDelay);
  }

  // Start the loop
  sendRandomMessage();

  // Return a function to stop the bot
  return () => {
    stopped = true;
    if (timeoutId) clearTimeout(timeoutId);
  };
}
