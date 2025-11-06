import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import Sidebar from '../components/Sidebar';
import { getChatById, getAllChats } from '../utils/mockData';

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chats = getAllChats();

  const isNewChat = id === 'new';
  const chat = isNewChat ? null : getChatById(id);

  useEffect(() => {
    if (isNewChat) {
      setMessages([]);
    } else if (chat) {
      setMessages(chat.messages || []);
    } else {
      // Chat not found, redirect to chats
      navigate('/chats');
    }
  }, [id, chat, isNewChat, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const simulateAIResponse = (userMessage) => {
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const responses = [
        'متشکرم! آیا چیز دیگری می‌خواهید به سفارش اضافه کنید؟',
        'عالی! سفارش شما در حال ثبت است. آیا آدرس تحویل را تایید می‌کنید؟',
        'بله، حتما. آیا سس یا نوشیدنی اضافی می‌خواهید؟',
        'سفارش شما ثبت شد. زمان تقریبی تحویل: ۳۰ دقیقه',
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: randomResponse,
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = (content) => {
    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    simulateAIResponse(content);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 right-4 z-30 bg-primary text-white p-3 rounded-lg shadow-lg hover:opacity-90 transition-opacity"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        chats={chats}
      />

      {/* Chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {isNewChat ? 'سفارش جدید' : chat?.restaurantName || 'چت'}
          </h2>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.length === 0 && !isTyping ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <p>شروع یک مکالمه جدید</p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="max-w-[80%] md:max-w-[70%] rounded-2xl rounded-tl-sm bg-gray-100 text-gray-800 px-4 py-3">
                    <p className="text-sm text-gray-500">در حال فکر کردن...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Chat input */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default ChatPage;

