import { useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { getChatAvatar, getTelegramLogo } from '../../shared/utils/avatar'

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
  const navigate = useNavigate();

  if (!currentChat) return null;

  return (
    <div className="h-14 px-4 flex items-center justify-between border-b border-[#202225] bg-[#36393F]">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/')}
          className="lg:hidden p-2 hover:bg-[#2F3136] rounded-full transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img 
            src={getChatAvatar(currentChat.id)} 
            alt={currentChat.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-medium text-[#DCDDDE]">{currentChat.name}</h2>
          <p className="text-sm text-[#B9BBBE]">online</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-[#2F3136] rounded-full transition-colors text-[#B9BBBE]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
        <button className="p-2 hover:bg-[#2F3136] rounded-full transition-colors text-[#B9BBBE]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button className="p-2 hover:bg-[#2F3136] rounded-full transition-colors text-[#B9BBBE]">
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const filteredChats = chatList.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
    setIsSidebarOpen(false);
  };

  return (
    <div className='flex h-screen bg-[#36393F] text-[#DCDDDE]'>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static
        w-80 h-full
        border-r border-[#202225]
        flex flex-col
        bg-[#2F3136]
        z-30
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className='h-14 px-4 flex items-center justify-between border-b border-[#202225]'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full overflow-hidden bg-white p-1'>
              <img 
                src={getTelegramLogo()} 
                alt="Telegram" 
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className='text-lg font-medium text-[#DCDDDE]'>Telegram</h2>
          </div>
          <button 
            className="p-2 hover:bg-[#36393F] rounded-full transition-colors text-[#B9BBBE]"
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className='p-4'>
          <div className='relative'>
            <input 
              type="text" 
              placeholder='Search' 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full bg-[#202225] text-[#DCDDDE] px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-[#5865F2] placeholder-[#72767D]'
            />
            <svg className='w-5 h-5 absolute left-3 top-2.5 text-[#72767D]' fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  hover:bg-[#36393F]
                  transition-colors
                `}
              >
                <div className='w-12 h-12 rounded-full overflow-hidden flex-shrink-0'>
                  <img 
                    src={getChatAvatar(chat.id)} 
                    alt={chat.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='font-medium truncate text-[#DCDDDE]'>{chat.name}</div>
                  <div className='text-sm text-[#72767D] truncate'>Last message...</div>
                </div>
              </button>
            ))}
            {filteredChats.length === 0 && (
              <div className="text-[#72767D] text-center py-4">
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

      {/* Mobile Menu Button */}
      <button
        className="fixed bottom-4 right-4 lg:hidden w-14 h-14 bg-[#5865F2] rounded-full flex items-center justify-center shadow-lg z-40 hover:bg-[#4752C4] transition-colors"
        onClick={() => setIsSidebarOpen(true)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  )
}
