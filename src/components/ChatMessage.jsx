import React from 'react';

const ChatMessage = ({ message }) => {
  const isUser = message.type === 'user';

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-primary text-white rounded-tr-sm'
            : 'bg-gray-100 text-gray-800 rounded-tl-sm'
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </p>
        {message.timestamp && (
          <p
            className={`text-xs mt-1 ${
              isUser ? 'text-white/70' : 'text-gray-500'
            }`}
          >
            {new Date(message.timestamp).toLocaleTimeString('fa-IR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;

