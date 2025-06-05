import React, { useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Button from '../../shared/ui/button'

const chatList = [
  { id: 'ai-chat', name: "AI Chat" },
  { id: 'dima', name: "Dima" },
  { id: 'vlad', name: "Vlad" },
  { id: 'bakhredin', name: "Bakhredin" },
  { id: 'ruslan', name: "Ruslan" },
  { id: 'shoqan', name: "Shoqan" },
  { id: 'kairat', name: "Kairat" },
  { id: 'aibek', name: "Aibek" },
];

const ChatHeader = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const currentChat = chatList.find(chat => chat.id === chatId);

  if (!currentChat) return null;

  return (
    <div className="h-14 px-4 flex items-center justify-between border-b border-[#0e1621] bg-[#17212b]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#2b5278] flex items-center justify-center">
          <span className="text-lg">{currentChat.name[0]}</span>
        </div>
        <div>
          <h2 className="text-lg font-medium">{currentChat.name}</h2>
          <p className="text-sm text-gray-400">online</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-[#242f3d] rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
        <button className="p-2 hover:bg-[#242f3d] rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button className="p-2 hover:bg-[#242f3d] rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const Wrapper = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredChats = chatList.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className='flex h-screen bg-[#17212b] text-white'>
      {/* Sidebar */}
      <div className='w-80 border-r border-[#0e1621] flex flex-col'>
        {/* Header */}
        <div className='h-14 px-4 flex items-center justify-between border-b border-[#0e1621]'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-[#2b5278] flex items-center justify-center'>
              <span className='text-lg'>T</span>
            </div>
            <h2 className='text-lg font-medium'>Telegram</h2>
          </div>
          <button className="p-2 hover:bg-[#242f3d] rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className='p-3'>
          <div className='relative'>
            <input 
              type="text" 
              placeholder='Search' 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full bg-[#242f3d] text-white px-4 py-2 rounded-lg pl-10 focus:outline-none'
            />
            <svg className='w-5 h-5 absolute left-3 top-2.5 text-gray-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Chat List */}
        <div className='flex-1 overflow-y-auto'>
          <div className='px-3 space-y-1'>
            {filteredChats.map(chat => (
              <button
                key={chat.id}
                onClick={() => handleChatClick(chat.id)}
                className={`
                  w-full
                  flex items-center gap-3
                  px-4 py-3
                  rounded-lg
                  text-left
                  hover:bg-[#242f3d]
                  transition-colors
                `}
              >
                <div className='w-12 h-12 rounded-full bg-[#2b5278] flex items-center justify-center'>
                  <span className='text-lg'>{chat.name[0]}</span>
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='font-medium truncate'>{chat.name}</div>
                  <div className='text-sm text-gray-400 truncate'>Last message...</div>
                </div>
              </button>
            ))}
            {filteredChats.length === 0 && (
              <div className="text-gray-400 text-center py-4">
                No chats found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className='flex-1 flex flex-col'>
        <ChatHeader />
        <Outlet />
      </main>
    </div>
  )
}
