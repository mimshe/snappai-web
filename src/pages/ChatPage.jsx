import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import Sidebar from '../components/Sidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmModal from '../components/ConfirmModal';
import { getChatMessages, sendChatMessage } from '../api/messages';
import { getChats } from '../api/chats';
import { clearCredentials } from '../store/slices/authSlice';

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [chatTitle, setChatTitle] = useState('');
  const [chats, setChats] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const messagesEndRef = useRef(null);
  const messagesTopRef = useRef(null);
  const scrollPositionRef = useRef(0);

  const isNewChat = id === 'new';

  // Fetch chats list for sidebar
  useEffect(() => {
    const fetchChats = async () => {
      const result = await getChats(1, 15);
      if (result.success) {
        setChats(result.data || []);
        // Find current chat title
        if (!isNewChat && result.data) {
          const currentChat = result.data.find((chat) => chat.id.toString() === id);
          if (currentChat) {
            setChatTitle(currentChat.title || `چت ${id}`);
          }
        }
      }
    };
    fetchChats();
  }, [id, isNewChat]);

  // Fetch messages
  const fetchMessages = useCallback(
    async (page = 1, append = false) => {
      if (isNewChat) {
        setIsLoading(false);
        return;
      }

      try {
        if (append) {
          setIsLoadingMore(true);
        } else {
          setIsLoading(true);
        }

        const result = await getChatMessages(id, page, 15);

        if (result.success) {
          // Reverse messages because API returns newest first, but we want oldest first
          const reversedMessages = [...result.data].reverse();

          if (append) {
            // Prepend older messages
            setMessages((prev) => [...reversedMessages, ...prev]);
          } else {
            setMessages(reversedMessages);
            setIsFirstLoad(true);
            // Scroll to bottom on initial load
            setTimeout(() => {
              messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
            }, 100);
            // Reset isFirstLoad after animation
            setTimeout(() => {
              setIsFirstLoad(false);
            }, Math.min(reversedMessages.length * 50 + 400, 2000));
          }

          setCurrentPage(result.pagination.currentPage);
          setLastPage(result.pagination.lastPage);
          setHasMore(result.pagination.hasMore);
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
            navigate('/chats');
          }
        }
      } catch (error) {
        if (!append) {
          toast.error('مشکلی رخ داده است');
          navigate('/chats');
        }
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [id, isNewChat, dispatch, navigate]
  );

  // Initial load
  useEffect(() => {
    if (!isNewChat) {
      fetchMessages(1, false);
    } else {
      setIsLoading(false);
    }
  }, [id, isNewChat, fetchMessages]);

  // Scroll to bottom when new messages arrive (not when loading older messages)
  useEffect(() => {
    if (!isLoadingMore && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length, isLoadingMore]);

  // Infinite scroll observer for loading older messages
  useEffect(() => {
    if (isNewChat || !hasMore || isLoadingMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isLoading) {
          // Save scroll position
          const container = messagesTopRef.current?.parentElement;
          if (container) {
            scrollPositionRef.current = container.scrollHeight - container.scrollTop;
          }

          const nextPage = currentPage + 1;
          fetchMessages(nextPage, true).then(() => {
            // Restore scroll position after loading
            if (container) {
              setTimeout(() => {
                container.scrollTop = container.scrollHeight - scrollPositionRef.current;
              }, 50);
            }
          });
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = messagesTopRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoadingMore, isLoading, currentPage, isNewChat, fetchMessages]);

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
        is_llm: true,
        message: randomResponse,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = async (content) => {
    if (isNewChat) {
      // For new chats, just simulate (no API call yet)
      const userMessage = {
        id: Date.now().toString(),
        is_llm: false,
        message: content,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      simulateAIResponse(content);
      return;
    }

    // For existing chats, send via API
    setIsSending(true);

    try {
      const result = await sendChatMessage(id, content);

      if (result.success && result.data) {
        // Add the sent message to the list
        const sentMessage = {
          id: result.data.id || Date.now().toString(),
          is_llm: false,
          message: result.data.message || content,
          created_at: result.data.created_at || new Date().toISOString(),
        };

        setMessages((prev) => [...prev, sentMessage]);
        // Simulate AI response
        simulateAIResponse(content);
      } else {
        // Handle 401 Unauthorized
        if (result.error === 'unauthorized') {
          dispatch(clearCredentials());
          navigate('/login');
          toast.error('لطفا دوباره وارد شوید');
          return;
        }

        toast.error(result.message || 'خطا در ارسال پیام');
      }
    } catch (error) {
      toast.error('مشکلی رخ داده است');
    } finally {
      setIsSending(false);
    }
  };

  const handleDeleteChat = () => {
    // TODO: API call to delete chat
    // For now, just navigate back
    toast.success('چت با موفقیت حذف شد');
    navigate('/chats');
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-center relative sticky top-0 z-30">
        <h1 className="text-xl font-bold text-primary text-center">SnappFood AI</h1>
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
        activeChatId={isNewChat ? null : id}
      />

      {/* Chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
          <button
            onClick={() => navigate('/chats')}
            className="text-gray-600 hover:text-gray-800 transition-colors p-1"
            aria-label="بازگشت"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-800 flex-1">
            {isNewChat ? 'سفارش جدید' : chatTitle || `چت ${id}`}
          </h2>
          {!isNewChat && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-red-500 hover:text-red-700 transition-colors p-1"
              aria-label="حذف چت"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 relative">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <LoadingSpinner size="lg" color="primary" />
                <p className="mt-4 text-gray-600">در حال دریافت...</p>
              </div>
            </div>
          ) : messages.length === 0 && !isTyping ? (
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
              {/* Infinite scroll trigger at top */}
              {hasMore && (
                <div ref={messagesTopRef} className="h-10 flex items-center justify-center">
                  {isLoadingMore && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <LoadingSpinner size="sm" color="gray" />
                      <span className="text-sm">در حال بارگذاری...</span>
                    </div>
                  )}
                </div>
              )}

              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  index={index}
                  isFirstLoad={isFirstLoad}
                />
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
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping || isSending} />
      </div>

      {/* Delete Chat Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteChat}
        title="حذف سفارش"
        message="آیا مطمئن هستید که می‌خواهید این سفارش را حذف کنید؟ با حذف کردن این سفارش، سفارش در پروفایل اسنپ فود شما باقی خواهد ماند بلکه از حافظه SnappFood AI پاک می‌شود."
        confirmText="بله، حذف کن"
        cancelText="لغو"
      />
    </div>
  );
};

export default ChatPage;
