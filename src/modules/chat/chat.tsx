import { type Message } from '../../shared/types/message';  
import React, { useState, useRef, useEffect } from 'react'
import { getUserAvatar, getRobotAvatar } from '../../shared/utils/avatar'

type ChatProps = {  
  onSendMessage: (message: string) => void;
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
      {message.sender === 'assistant' && (
        <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
          <img 
            src={getRobotAvatar('assistant')} 
            alt="Assistant" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className={`max-w-[85%] sm:max-w-[70%] ${
        message.sender === 'user' 
          ? 'bg-[#5865F2] text-white' 
          : 'bg-[#2F3136] text-[#DCDDDE]'
      } rounded-lg p-3`}>
        <div className="text-sm break-words">{message.content}</div>
        <div className={`text-xs mt-1 ${
          message.sender === 'user' 
            ? 'text-[#B9BBBE]' 
            : 'text-[#72767D]'
        }`}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      {message.sender === 'user' && (
        <div className="w-8 h-8 rounded-full overflow-hidden ml-2 flex-shrink-0">
          <img 
            src={getUserAvatar('user')} 
            alt="User" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  ));

  return (
    <div className="flex flex-col h-full bg-[#36393F]">
      <div className="flex-1 overflow-y-auto p-2 sm:p-4">
        {displayMessages}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
              <img 
                src={getRobotAvatar('assistant')} 
                alt="Assistant" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-[#2F3136] rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-[#72767D] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-[#72767D] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-[#72767D] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex-none p-2 sm:p-4 border-t border-[#202225]">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 p-2 bg-[#40444B] text-[#DCDDDE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5865F2] placeholder-[#72767D]"
            disabled={isLoading}
          />
          <button
            className={`px-4 py-2 bg-[#5865F2] text-white rounded-lg hover:bg-[#4752C4] transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
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
