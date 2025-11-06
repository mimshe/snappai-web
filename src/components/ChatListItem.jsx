import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatListItem = ({ chat }) => {
  const navigate = useNavigate();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'امروز';
    } else if (diffDays === 2) {
      return 'دیروز';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} روز پیش`;
    } else {
      return date.toLocaleDateString('fa-IR');
    }
  };

  return (
    <div
      onClick={() => navigate(`/chat/${chat.id}`)}
      className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-800">{chat.restaurantName}</h3>
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {formatDate(chat.timestamp)}
        </span>
      </div>
      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
    </div>
  );
};

export default ChatListItem;

