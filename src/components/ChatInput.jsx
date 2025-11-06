import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="پیام خود را بنویسید..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]"
        >
          {disabled && <LoadingSpinner size="sm" color="white" />}
          <span>{disabled ? 'در حال ارسال...' : 'ارسال'}</span>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;

