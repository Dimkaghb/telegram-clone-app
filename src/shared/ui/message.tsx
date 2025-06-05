import React from 'react'

type MessageProps = {
  message: string;
  sender: string;
  timestamp: string;
}

export const Message = ({ message, sender, timestamp }: MessageProps) => {
  return (
    <div>
        <div className='flex items-end justify-end'>
                <div className='bg-[#242f3d] rounded-lg p-2'>
                {message}
            </div>
            <div className='flex gap-2'>
                <div className='text-sm text-gray-500'>{sender}</div>
                <div className='text-sm text-gray-500'>{timestamp}</div>
            </div>
        </div>
    </div>
  )
}
