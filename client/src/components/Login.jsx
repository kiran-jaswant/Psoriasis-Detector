import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
      ...(isLogin ? {} : { name, city }), // Only add name and city on signup
    };

    try {
      const endpoint = isLogin ? '/login' : '/signup';
      const apiUrl = `${import.meta.env.VITE_API_URL}${endpoint}`;

      console.log("Requesting:", apiUrl);
      console.log("Payload:", payload);

      const response = await axios.post(apiUrl, payload);

      if (response.data.success) {
        if (isLogin) {
          toast.success('Login successful!');
          navigate('/dashboard'); // Redirect to dashboard after successful login
        } else {
          toast.success('Signup successful! Please log in.');
          setIsLogin(true); // Switch to login form after signup
        }
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error("Error:", error?.response?.data?.message || error?.message || "Something went wrong");
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-pink-50 px-3">
        <div className="flex w-full max-w-4xl h-[470px] shadow-lg rounded-lg overflow-hidden">
          {/* Form Section */}
          <div className="w-1/2 bg-white p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-300 hover:border-pink-400"
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-300 hover:border-pink-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-300 hover:border-pink-400"
              />
              {!isLogin && (
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-300 hover:border-pink-400"
                />
              )}
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 hover:scale-105 transition-transform duration-300"
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
          </div>

          {/* Welcome Panel */}
          <div className="w-1/2 bg-gradient-to-br from-pink-400 to-pink-500 text-white flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-bold mb-2">
              {isLogin ? 'Welcome to login' : 'Hello, Friend!'}
            </h2>
            <p className="mb-6 text-center">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-pink-500 transition duration-300"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
