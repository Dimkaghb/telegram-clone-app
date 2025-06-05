import { type Message } from '../../shared/types/message';  
import React, { useState, useRef, useEffect } from 'react'

type ChatProps = {  
  onSendMessage: (message: string) => Promise<void>;
  messages: Message[];
  isLoading: boolean;
}

export const Chat = ({ onSendMessage, messages, isLoading }: ChatProps) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      await onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const displayMessages = messages.map((message) => (
    <div 
      key={message.id} 
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4 px-2`}
    >
      <div className={`max-w-[85%] sm:max-w-[70%] ${message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-200'} rounded-lg p-3`}>
        <div className="text-sm break-words">{message.content}</div>
        <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto p-2 sm:p-4">
        {displayMessages}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-200 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex-none p-2 sm:p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
            disabled={isLoading}
          />
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSendMessage}
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
