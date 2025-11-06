import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ChatListPage from '../pages/ChatListPage';
import ChatPage from '../pages/ChatPage';
import { isAuthenticated } from '../utils/auth';

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated() ? <Navigate to="/chats" replace /> : <LoginPage />
        }
      />
      <Route
        path="/chats"
        element={
          <PrivateRoute>
            <ChatListPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/chat/:id"
        element={
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/chats" replace />} />
    </Routes>
  );
};

export default AppRoutes;

