// Using DiceBear's avatars collection for person-like avatars
export const getRandomAvatar = (seed: string) => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
};

// Using DiceBear's bottts collection for robot-like avatars
export const getRobotAvatar = (seed: string) => {
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
};

// Generate a consistent avatar for a chat based on its ID
export const getChatAvatar = (chatId: string) => {
  // Use robot avatar for AI chat
  if (chatId === 'ai-chat') {
    return getRobotAvatar(chatId);
  }
  return getRandomAvatar(chatId);
};

// Generate a consistent avatar for a user based on their name
export const getUserAvatar = (name: string) => {
  return getRandomAvatar(name);
};

// Get Telegram logo
export const getTelegramLogo = () => {
  return 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg';
}; 