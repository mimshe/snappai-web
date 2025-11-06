import React from 'react';

const LoadingSpinner = ({ size = 'sm', color = 'white' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const colorClasses = {
    white: 'border-white',
    primary: 'border-primary',
    gray: 'border-gray-600',
  };

  return (
    <div
      className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}
      role="status"
      aria-label="در حال بارگذاری"
    >
      <span className="sr-only">در حال بارگذاری...</span>
    </div>
  );
};

export default LoadingSpinner;

