import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import AllCourses from "./pages/AllCourses";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Keep user logged in on page refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("skillsphere_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen" data-theme="light">
        <Toaster position="top-center" />
        <Navbar user={user} setUser={setUser} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<AllCourses />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/courses/:id" element={
              <ProtectedRoute user={user}>
                <CourseDetails />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute user={user}>
                <Profile user={user} />
              </ProtectedRoute>
            } />
            <Route path="/profile/update" element={
              <ProtectedRoute user={user}>
                <UpdateProfile user={user} setUser={setUser} />
              </ProtectedRoute>
            } />

            {/* Custom 404 Route */}
            <Route path="*" element={
              <div className="text-center py-20">
                <h1 className="text-6xl font-bold text-error">404</h1>
                <p className="text-xl mt-4">Oops! The page you are looking for doesn't exist.</p>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}