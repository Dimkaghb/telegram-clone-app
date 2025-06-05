import { useState, useEffect } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import { Wrapper } from '../modules/wrapper/wrapper'
import { Chat } from '../modules/chat/chat'
import { type Message } from '../shared/types/message'
import { sendMessageToGroq } from '../shared/services/groq'

const getChatHistory = (chatId: string): Message[] => {
  const history = localStorage.getItem(`chat_${chatId}`);
  return history ? JSON.parse(history) : [];
};

const saveChatHistory = (chatId: string, messages: Message[]) => {
  localStorage.setItem(`chat_${chatId}`, JSON.stringify(messages));
};

// Chat component that handles a single chat
const ChatWithHistory = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (chatId) {
      const history = getChatHistory(chatId);
      setMessages(history);
    }
  }, [chatId]);

  const handleSendMessage = async (content: string) => {
    if (!chatId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      createdAt: new Date(),
      sender: 'user'
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveChatHistory(chatId, updatedMessages);
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToGroq(updatedMessages);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        createdAt: new Date(),
        sender: 'assistant'
      };
      
      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      saveChatHistory(chatId, finalMessages);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error 
          ? `Error: ${error.message}`
          : 'Sorry, I encountered an error. Please try again.',
        createdAt: new Date(),
        sender: 'assistant'
      };
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      saveChatHistory(chatId, finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Chat 
      onSendMessage={handleSendMessage} 
      messages={messages} 
      isLoading={isLoading}
      chatId={chatId || ''}
    />
  );
};

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Wrapper />}>
          <Route path='chat/:chatId' element={<ChatWithHistory />} />
        </Route>
      </Routes>
    </div>
  )
}
