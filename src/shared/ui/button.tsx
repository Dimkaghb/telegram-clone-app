import React from "react";
import { useNavigate } from "react-router-dom";

type NavigateButtonProps = {
  path: string;
  onClick?: () => void;
  label: string;
  className?: string;
};

const NavigateButton: React.FC<NavigateButtonProps> = ({
  path,
  onClick,
  label,
  className = "",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    navigate(path);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        w-full
        flex items-center gap-3
        px-4 py-3
        rounded-lg
        text-left
        hover:bg-[#242f3d]
        transition-colors
        ${className}
      `}
    >
      <div className='w-12 h-12 rounded-full bg-[#2b5278] flex items-center justify-center'>
        <span className='text-lg'>{label[0]}</span>
      </div>
      <div className='flex-1 min-w-0'>
        <div className='font-medium truncate'>{label}</div>
        <div className='text-sm text-gray-400 truncate'>Last message...</div>
      </div>
    </button>
  );
};

export default NavigateButton;
