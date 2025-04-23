import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <div>
      <Navbar />
      <div className="bg-pink-100 h-screen overflow-hidden px-4 flex flex-col justify-center items-center">
        <div className="flex-grow flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-4xl flex flex-col md:flex-row">
            
            {/* Left Side - Contact Info */}
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-4xl font-semibold mb-4 text-pink-600">Contact Us</h2>
              <p className="text-gray-700 mb-6">
                Feel free to use the form or drop us an email. Old-fashioned phone calls work too.
              </p>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center space-x-2">
                  <span className="text-pink-500">📞</span>
                  <span>999272727</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-pink-500">✉️</span>
                  <span>psoriasisdetection@gmail.com</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-pink-500">📍</span>
                  <span>
                    YCCE<br />
                    Wanadongri,Hingna
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <form className="md:w-1/2 space-y-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="First"
                  className="w-1/2 border border-pink-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                  type="text"
                  placeholder="Last"
                  className="w-1/2 border border-pink-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full border border-pink-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                className="w-full border border-pink-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <textarea
                placeholder="Type your message..."
                className="w-full border border-pink-300 rounded-lg px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-pink-400"
              ></textarea>
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6 py-2 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        {/* Spacer: 100px from bottom */}
        <div className="h-[100px]"></div>
      </div>
      <Footer/>
    </div>
  );
}
