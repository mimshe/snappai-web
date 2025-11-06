// Mock data for chats
export const mockChats = [
  {
    id: '1',
    restaurantName: 'رستوران حاجی',
    lastMessage: 'سفارش شما آماده است و در حال ارسال می‌باشد',
    timestamp: '2024-01-15T10:30:00',
    messages: [
      {
        id: '1',
        type: 'user',
        content: 'سلام، می‌خوام یک پیتزا مارگاریتا سفارش بدم',
        timestamp: '2024-01-15T10:00:00',
      },
      {
        id: '2',
        type: 'ai',
        content: 'سلام! خوش آمدید. برای سفارش پیتزا مارگاریتا، چند سوال دارم:\n\n1. سایز پیتزا رو چه می‌خواید؟ (کوچک، متوسط، بزرگ)\n2. آیا اضافه کردن پنیر اضافی می‌خواید؟',
        timestamp: '2024-01-15T10:01:00',
      },
      {
        id: '3',
        type: 'user',
        content: 'متوسط و بله، پنیر اضافی هم می‌خوام',
        timestamp: '2024-01-15T10:02:00',
      },
      {
        id: '4',
        type: 'ai',
        content: 'عالی! سفارش شما ثبت شد:\n- پیتزا مارگاریتا متوسط\n- پنیر اضافی\n\nآیا نوشیدنی هم می‌خواید؟',
        timestamp: '2024-01-15T10:03:00',
      },
      {
        id: '5',
        type: 'user',
        content: 'نه ممنون، فقط همون پیتزا',
        timestamp: '2024-01-15T10:04:00',
      },
      {
        id: '6',
        type: 'ai',
        content: 'سفارش شما ثبت شد و در حال آماده سازی است. زمان تحویل: ۳۰ دقیقه',
        timestamp: '2024-01-15T10:05:00',
      },
    ],
  },
  {
    id: '2',
    restaurantName: 'کافه فرانسه',
    lastMessage: 'سفارش شما آماده است و در حال ارسال می‌باشد',
    timestamp: '2024-01-14T15:20:00',
    messages: [
      {
        id: '1',
        type: 'user',
        content: 'می‌خوام یک کاپوچینو و یک کروسان سفارش بدم',
        timestamp: '2024-01-14T15:00:00',
      },
      {
        id: '2',
        type: 'ai',
        content: 'سلام! برای کاپوچینو می‌خواید شکر یا شیرین‌کننده اضافه کنیم؟',
        timestamp: '2024-01-14T15:01:00',
      },
      {
        id: '3',
        type: 'user',
        content: 'بله، شکر',
        timestamp: '2024-01-14T15:02:00',
      },
      {
        id: '4',
        type: 'ai',
        content: 'سفارش شما ثبت شد. زمان تحویل: ۲۰ دقیقه',
        timestamp: '2024-01-14T15:03:00',
      },
    ],
  },
  {
    id: '3',
    restaurantName: 'رستوران ایرانی',
    lastMessage: 'سفارش شما آماده است و در حال ارسال می‌باشد',
    timestamp: '2024-01-13T19:45:00',
    messages: [
      {
        id: '1',
        type: 'user',
        content: 'سلام، می‌خوام یک کباب کوبیده و یک سالاد سفارش بدم',
        timestamp: '2024-01-13T19:30:00',
      },
      {
        id: '2',
        type: 'ai',
        content: 'سلام! برای کباب کوبیده، برنج یا نون می‌خواید؟',
        timestamp: '2024-01-13T19:31:00',
      },
      {
        id: '3',
        type: 'user',
        content: 'برنج',
        timestamp: '2024-01-13T19:32:00',
      },
      {
        id: '4',
        type: 'ai',
        content: 'عالی! سفارش شما ثبت شد. زمان تحویل: ۴۵ دقیقه',
        timestamp: '2024-01-13T19:33:00',
      },
    ],
  },
];

export const getChatById = (id) => {
  return mockChats.find((chat) => chat.id === id);
};

export const getAllChats = () => {
  return mockChats;
};

