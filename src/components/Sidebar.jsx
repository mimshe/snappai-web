import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatListItem from './ChatListItem';
import { getAllChats } from '../utils/mockData';

const Sidebar = ({ isOpen, onClose, chats }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 right-0 w-80 bg-white border-l border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h1 className="text-xl font-bold text-primary">SnappFood AI</h1>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* New Order Button */}
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={() => {
                navigate('/chat/new');
                onClose();
              }}
              className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              سفارش جدید
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chats.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <p>هنوز سفارشی ثبت نشده است</p>
              </div>
            ) : (
              chats.map((chat) => (
                <ChatListItem key={chat.id} chat={chat} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

