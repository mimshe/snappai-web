import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getAllChats } from '../utils/mockData';

const ChatListPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chats = getAllChats();

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

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center text-gray-500">
          <svg
            className="w-24 h-24 mx-auto mb-4 text-gray-300"
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
          <h2 className="text-2xl font-semibold mb-2">خوش آمدید!</h2>
          <p className="text-gray-600">
            برای شروع، یک سفارش جدید ایجاد کنید یا از لیست سفارشات قبلی انتخاب کنید
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatListPage;

