import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import CourseView from './pages/CourseView';
import GroupView from './pages/GroupView';
import UploadCourse from './pages/UploadCourse';
import Courses from './pages/Courses';
import Groups from './pages/Groups';
import Offline from './pages/Offline';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen">جاري التحميل...</div>;
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const TeacherRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen">جاري التحميل...</div>;
  return profile?.role === 'teacher' ? <>{children}</> : <Navigate to="/" />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/courses" element={<Courses />} />
            <Route path="/groups" element={<Groups />} />
            
            <Route path="/wallet" element={<PrivateRoute><Wallet /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/offline" element={<PrivateRoute><Offline /></PrivateRoute>} />
            <Route path="/course/:id" element={<PrivateRoute><CourseView /></PrivateRoute>} />
            <Route path="/group/:id" element={<PrivateRoute><GroupView /></PrivateRoute>} />
            
            <Route path="/dashboard" element={<TeacherRoute><Dashboard /></TeacherRoute>} />
            <Route path="/upload" element={<TeacherRoute><UploadCourse /></TeacherRoute>} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
