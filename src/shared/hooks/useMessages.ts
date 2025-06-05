import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type Message } from '../types/message';
import { sendMessageToGroq } from '../services/groq';

const getChatHistory = (chatId: string): Message[] => {
  const history = localStorage.getItem(`chat_${chatId}`);
  return history ? JSON.parse(history) : [];
};

const saveChatHistory = (chatId: string, messages: Message[]) => {
  localStorage.setItem(`chat_${chatId}`, JSON.stringify(messages));
};

export const useMessages = (chatId: string) => {
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages', chatId],
    queryFn: () => getChatHistory(chatId),
    enabled: !!chatId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        createdAt: new Date(),
        sender: 'user'
      };

      const updatedMessages = [...messages, userMessage];
      saveChatHistory(chatId, updatedMessages);

      try {
        const aiResponse = await sendMessageToGroq(updatedMessages);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          createdAt: new Date(),
          sender: 'assistant'
        };

        const finalMessages = [...updatedMessages, aiMessage];
        saveChatHistory(chatId, finalMessages);
        return finalMessages;
      } catch (error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: error instanceof Error 
            ? `Error: ${error.message}`
            : 'Sorry, I encountered an error. Please try again.',
          createdAt: new Date(),
          sender: 'assistant'
        };
        const finalMessages = [...updatedMessages, errorMessage];
        saveChatHistory(chatId, finalMessages);
        throw error;
      }
    },
    onMutate: async (content) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['messages', chatId] });

      // Snapshot the previous value
      const previousMessages = queryClient.getQueryData(['messages', chatId]);

      // Optimistically update to the new value
      const optimisticMessage: Message = {
        id: Date.now().toString(),
        content,
        createdAt: new Date(),
        sender: 'user'
      };

      queryClient.setQueryData(['messages', chatId], (old: Message[] = []) => [...old, optimisticMessage]);

      return { previousMessages };
    },
    onError: (_err, _newMessage, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousMessages) {
        queryClient.setQueryData(['messages', chatId], context.previousMessages);
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the correct data
      queryClient.invalidateQueries({ queryKey: ['messages', chatId] });
    },
  });

  return {
    messages,
    isLoading: isLoading || sendMessageMutation.isPending,
    sendMessage: sendMessageMutation.mutate,
  };
}; 