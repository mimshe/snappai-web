import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ChatListItem from './ChatListItem';
import LoadingSpinner from './LoadingSpinner';
import { clearCredentials } from '../store/slices/authSlice';
import ConfirmModal from './ConfirmModal';

const Sidebar = ({ isOpen, onClose, chats, isLoading, isLoadingMore, hasMore, observerTarget, onLoadMore, activeChatId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    dispatch(clearCredentials());
    navigate('/login');
    onClose();
    setShowLogoutModal(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  useEffect(() => {
    if (!isLoading && chats.length > 0 && isFirstLoad) {
      // After first load completes, reset isFirstLoad after animation
      const timer = setTimeout(() => {
        setIsFirstLoad(false);
      }, Math.min(chats.length * 50 + 400, 2000)); // Wait for all animations to complete (max 2s)
      return () => clearTimeout(timer);
    }
  }, [isLoading, chats.length, isFirstLoad]);

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
          <div className="p-4 border-b border-gray-200 flex items-center justify-center relative">
            <h1 className="text-xl font-bold text-primary text-center" style={{fontFamily:"tahoma"}}>Snapp! Food AI</h1>
            <button
              onClick={onClose}
              className="lg:hidden absolute left-4 text-gray-500 hover:text-gray-700"
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
            {isLoading ? (
              <div className="p-4 text-center">
                <LoadingSpinner size="sm" color="primary" />
                <p className="mt-2 text-sm text-gray-500">در حال دریافت...</p>
              </div>
            ) : chats.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <p>هنوز سفارشی ثبت نشده است</p>
              </div>
            ) : (
              <>
                {chats.map((chat, index) => (
                  <ChatListItem
                    key={chat.id}
                    chat={chat}
                    index={index}
                    isFirstLoad={isFirstLoad}
                    isActive={activeChatId && chat.id.toString() === activeChatId.toString()}
                  />
                ))}
                {/* Infinite scroll trigger */}
                {observerTarget && (
                  <div ref={observerTarget} className="h-10 flex items-center justify-center">
                    {isLoadingMore && (
                      <div className="flex items-center gap-2 text-gray-500">
                        <LoadingSpinner size="sm" color="gray" />
                        <span className="text-xs">در حال بارگذاری...</span>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* User Info & Settings */}
          <div className="p-4 border-t border-gray-200">
            {user && (
              <div className="mb-3 text-sm text-gray-600">
                <p className="font-medium text-gray-800">
                  {user.name || user.cellphone || 'کاربر'}
                </p>
              </div>
            )}
            <button
              onClick={() => {
                navigate('/settings');
                onClose();
              }}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm mb-2"
            >
              تنظیمات
            </button>
            <button
              onClick={handleLogoutClick}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
            >
              خروج از حساب
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        title="خروج از حساب"
        message="آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟"
        confirmText="بله، خارج شو"
        cancelText="لغو"
      />
    </>
  );
};

export default Sidebar;

