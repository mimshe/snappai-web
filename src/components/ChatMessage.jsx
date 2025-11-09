import React from 'react';
import { isHtmlContent, sanitizeHtml, stripHtml } from '../utils/messageUtils';

const ChatMessage = ({ message, index = 0, isFirstLoad = false }) => {
  // Support both API format (is_llm) and old format (type)
  // is_llm: true = AI message (right side), false = User message (left side)
  const isAI = message.is_llm === true || message.type === 'ai';
  const rawMessage = message.message || message.content || '';
  const hasHtml = isHtmlContent(rawMessage);
  const sanitizedHtml = hasHtml ? sanitizeHtml(rawMessage) : '';
  const plainText = hasHtml ? stripHtml(sanitizedHtml) : rawMessage;
  const hasContent = (hasHtml ? sanitizedHtml : plainText).trim().length > 0;
  const fallbackText = 'پیام خالی';
  const timestamp = message.created_at || message.timestamp;

  return (
    <div
      className={`flex ${isAI ? 'justify-end' : 'justify-start'} mb-4 ${
        isFirstLoad ? 'animate-slide-up' : ''
      }`}
      style={{
        animationDelay: isFirstLoad ? `${index * 50}ms` : undefined,
      }}
    >
      <div
        className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
          isAI
            ? 'bg-gray-100 text-gray-800 rounded-tl-sm'
            : 'bg-primary text-white rounded-tr-sm'
        }`}
      >
        {hasHtml ? (
          <div
            className="text-sm leading-relaxed break-words"
            dangerouslySetInnerHTML={{
              __html: hasContent ? sanitizedHtml : fallbackText,
            }}
          />
        ) : (
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {hasContent ? plainText : fallbackText}
          </p>
        )}
        <p
          className={`text-xs mt-1  text-end ${
            isAI ? 'text-gray-500' : 'text-white/70'
          }`}
        >
          {timestamp
            ? new Date(timestamp).toLocaleTimeString('fa-IR', {
                hour: '2-digit',
                minute: '2-digit',
              })
            : new Date().toLocaleTimeString('fa-IR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;

