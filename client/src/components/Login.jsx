import React, { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
  <div className="flex w-full max-w-4xl h-[500px] shadow-lg rounded-lg overflow-hidden">
    {/* Form Section */}
    <div className="w-1/2 bg-white p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{isLogin ? 'Sign In' : 'Sign Up'}</h2>

      <form className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-300 hover:border-pink-400"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-300 hover:border-pink-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-300 hover:border-pink-400"
        />

        {!isLogin && (
          <input
            type="text"
            placeholder="City"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-300 hover:border-pink-400"
          />
        )}

        <div className="flex items-center justify-between">
          {isLogin && (
            <label className="flex items-center text-sm text-pink-600">
              <input type="checkbox" className="mr-2" /> Remember Me
            </label>
          )}
          {isLogin && <a href="#" className="text-sm text-gray-500 hover:text-pink-400 transition">Forgot Password?</a>}
        </div>

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
      <h2 className="text-2xl font-bold mb-2">{isLogin ? 'Welcome to login' : 'Hello, Friend!'}</h2>
      <p className="mb-6 text-center">{isLogin ? "Don't have an account?" : 'Already have an account?'}</p>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-pink-500 transition duration-300"
      >
        {isLogin ? 'Sign Up' : 'Sign In'}
      </button>
    </div>
  </div>
</div>

  );
};

export default Login;
