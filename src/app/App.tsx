import { Routes, Route, useParams } from 'react-router-dom'
import { Wrapper } from '../modules/wrapper/wrapper'
import { Chat } from '../modules/chat/chat'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMessages } from '../shared/hooks/useMessages'

const queryClient = new QueryClient()

// Chat component that handles a single chat
const ChatWithHistory = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { messages, isLoading, sendMessage } = useMessages(chatId || '');

  return (
    <Chat 
      onSendMessage={sendMessage} 
      messages={messages} 
      isLoading={isLoading}
    />
  );
};

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route path="chat/:chatId" element={<ChatWithHistory />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};
