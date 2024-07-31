// src/components/Toast.tsx
import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const toastStyles = {
    success: 'bg-green-700',
    error: 'bg-red-700',
    info: 'bg-gray-700',
  };

  return (
    <div
      className={`fixed top-5 right-5 p-4 z-50 text-white rounded-md shadow-lg transition-opacity duration-500 ${
        message ? 'opacity-100' : 'opacity-0'
      } ${toastStyles[type]}`}
    >
      {message}
    </div>
  );
};

export default Toast;
