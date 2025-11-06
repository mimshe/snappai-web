import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl w-full">
        {/* 404 Animation */}
        <div className="mb-8 relative">
          <h1 className="text-9xl font-bold text-primary opacity-20 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🍕</div>
          </div>
        </div>

        {/* Main Message */}
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          اوه! این غذا پیدا نشد!
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          به نظر می‌رسه این صفحه از منوی ما حذف شده یا هرگز وجود نداشته است.
        </p>

        {/* Fun Message */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20 shadow-lg">
          <p className="text-lg text-gray-700 mb-4">
            اما نگران نباشید! ما هنوز کلی غذاهای خوشمزه داریم که می‌تونید سفارش بدید! 🍔🍟🍰
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/chats')}
            className="px-8 py-4 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-lg shadow-lg w-full sm:w-auto"
          >
            بازگشت به صفحه اصلی
          </button>
          <button
            onClick={() => navigate('/chat/new')}
            className="px-8 py-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-lg w-full sm:w-auto"
          >
            سفارش جدید
          </button>
        </div>

        {/* Decorative Food Icons */}
        <div className="mt-12 flex justify-center gap-4 text-4xl opacity-30">
          <span className="animate-pulse">🍕</span>
          <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>🍔</span>
          <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>🍟</span>
          <span className="animate-pulse" style={{ animationDelay: '0.6s' }}>🌮</span>
          <span className="animate-pulse" style={{ animationDelay: '0.8s' }}>🍰</span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

