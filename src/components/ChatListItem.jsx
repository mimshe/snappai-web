import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { isHtmlContent, sanitizeHtml, stripHtml } from '../utils/messageUtils';

const ChatListItem = ({ chat, index = 0, isFirstLoad = false, isActive = false }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    // If date is in Persian format (1403/09/15 14:30), return as is
    if (dateString.includes('/')) {
      return dateString;
    }
    // Otherwise, try to format it
    try {
      const date = new Date(dateString);
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
    } catch {
      return dateString;
    }
  };

  const rawLastMessage = chat.last_message?.message || '';
  const lastMessage = useMemo(() => {
    if (!rawLastMessage) return 'پیامی وجود ندارد';
    if (isHtmlContent(rawLastMessage)) {
      const sanitized = sanitizeHtml(rawLastMessage);
      const text = stripHtml(sanitized);
      return text.trim().length ? text : 'پیامی وجود ندارد';
    }
    return rawLastMessage.trim().length ? rawLastMessage : 'پیامی وجود ندارد';
  }, [rawLastMessage]);
  const title = chat.title || `چت ${chat.id}`;
  const date = chat.last_message?.created_at || chat.updated_at || chat.created_at;

  return (
    <div
      onClick={() => navigate(`/chat/${chat.id}`)}
      className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
        isFirstLoad ? 'animate-slide-up' : ''
      } ${
        isActive
          ? 'bg-primary/10 hover:bg-primary/15'
          : 'hover:bg-gray-50'
      }`}
      style={{
        animationDelay: isFirstLoad ? `${index * 50}ms` : undefined,
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-800 flex-1">{title}</h3>
        <span className="text-xs text-gray-500 whitespace-nowrap mr-2">
          {formatDate(date)}
        </span>
      </div>
      <p className="text-sm text-gray-600 truncate">{lastMessage}</p>
    </div>
  );
};

export default ChatListItem;
