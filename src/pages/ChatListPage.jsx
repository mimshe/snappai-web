import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import TypewriterEffect from '../components/TypewriterEffect';
import { getChats } from '../api/chats';
import { clearCredentials } from '../store/slices/authSlice';

const ChatListPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const exampleSentences = [
    'یه جوجه کباب از چلوپز برای شرکت بفرست',
    'یه پیتزا پپرونی به آدرس خونه ارسال کن',
    '۴ تا نون سنگک برای ساعت ۸ صبح فردا برای خونه سفارش بده',
  ];

  const fetchChats = useCallback(async (page = 1, append = false) => {
    try {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }

      const result = await getChats(page, 15);

      if (result.success) {
        if (append) {
          setChats((prev) => [...prev, ...result.data]);
        } else {
          setChats(result.data);
        }

        setCurrentPage(result.pagination.currentPage);
        setLastPage(result.pagination.lastPage);
        setHasMore(result.pagination.currentPage < result.pagination.lastPage);
      } else {
        // Handle 401 Unauthorized
        if (result.error === 'unauthorized') {
          dispatch(clearCredentials());
          navigate('/login');
          toast.error('لطفا دوباره وارد شوید');
          return;
        }

        if (!append) {
          toast.error(result.message || 'مشکلی رخ داده است');
        }
      }
    } catch (error) {
      if (!append) {
        toast.error('مشکلی رخ داده است');
      }
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    fetchChats(1, false);
  }, [fetchChats]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isLoading) {
          const nextPage = currentPage + 1;
          fetchChats(nextPage, true);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoadingMore, isLoading, currentPage, fetchChats]);

  const userName = user?.name || user?.cellphone || 'کاربر';

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-center relative sticky top-0 z-30">
        <h1 className="text-xl font-bold text-primary text-center" style={{fontFamily:"tahoma"}}>Snapp! Food AI</h1>
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute left-4 bg-primary text-white p-2 rounded-lg hover:opacity-90 transition-opacity"
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
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        chats={chats}
        activeChatId={null}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        observerTarget={observerTarget}
        onLoadMore={() => {
          if (hasMore && !isLoadingMore && !isLoading) {
            fetchChats(currentPage + 1, true);
          }
        }}
      />

      {/* Main content - Welcome message */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-y-auto">
        {isLoading ? (
          <div className="text-center relative z-10">
            <LoadingSpinner size="lg" color="primary" />
            <p className="mt-4 text-gray-600">در حال دریافت...</p>
          </div>
        ) : (
          <div className="text-center max-w-2xl w-full relative z-10">
            <div className="">
              <h1 className="text-3xl font-bold text-gray-800 mb-4 shadow-3xl">
                سلام {userName} عزیز!
              </h1>
              <p className="text-xl text-gray-600 mb-8 text-shadow-md">
                چی می‌خوای از اسنپ فود برات سفارش بدم؟
              </p>

              {/* Typewriter Effect */}
              <div className="mb-8 min-h-[60px] flex items-center justify-center">
                <TypewriterEffect sentences={exampleSentences} />
              </div>

              {/* New Order Button */}
              <button
                onClick={() => navigate('/chat/new')}
                className="px-8 py-4 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-lg shadow-lg"
              >
                سفارش جدید
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatListPage;
