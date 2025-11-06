import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  const handleDeleteAll = () => {
    // TODO: API call to delete all chats
    // For now, just close modal
    setShowDeleteAllModal(false);
    // Show success message
    alert('همه سفارش‌ها با موفقیت حذف شدند');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/chats')}
            className="text-gray-600 hover:text-gray-800 transition-colors mb-4 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            بازگشت
          </button>
          <h1 className="text-3xl font-bold text-gray-800">تنظیمات</h1>
        </div>

        {/* Settings Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          {/* Delete All Chats Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              حذف همه سفارش‌ها
            </h2>
            <p className="text-gray-600 mb-4">
              با حذف همه سفارش‌ها، تمام سفارش‌های شما از حافظه SnappFood AI پاک
              می‌شوند. توجه داشته باشید که این سفارش‌ها در پروفایل اسنپ فود شما
              باقی خواهند ماند و فقط از اینجا حذف می‌شوند.
            </p>
            <button
              onClick={() => setShowDeleteAllModal(true)}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              حذف همه سفارش‌ها
            </button>
          </div>
        </div>
      </div>

      {/* Delete All Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteAllModal}
        onClose={() => setShowDeleteAllModal(false)}
        onConfirm={handleDeleteAll}
        title="حذف همه سفارش‌ها"
        message="آیا مطمئن هستید که می‌خواهید همه سفارش‌ها را حذف کنید؟ این سفارش‌ها در پروفایل اسنپ فود شما باقی خواهند ماند و فقط از حافظه SnappFood AI پاک می‌شوند."
        confirmText="بله، حذف کن"
        cancelText="لغو"
      />
    </div>
  );
};

export default SettingsPage;

