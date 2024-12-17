import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import ChatView from './components/Chat';

const App: React.FunctionComponent = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/chat" element={<ChatView />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;