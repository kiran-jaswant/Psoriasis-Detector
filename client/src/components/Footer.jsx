import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 py-10 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h3 className="text-3xl font-semibold mb-4">Psoriasis Detection</h3>
            <p className="text-lg">
              Empowering you with detection and information about psoriasis to live a healthier life.
            </p>
          </div>

          <div className="w-full md:w-1/3 text-center">
            <h4 className="text-xl font-semibold mb-3">Quick Links</h4>
            <ul className="text-lg">
              <li><a href="/" className="hover:text-pink-300">Home</a></li>
              <li><a href="/about" className="hover:text-pink-300">About Us</a></li>
              <li><a href="/services" className="hover:text-pink-300">Services</a></li>
              <li><a href="/contact" className="hover:text-pink-300">Contact</a></li>
            </ul>
          </div>

          <div className="w-full md:w-1/3 text-center">
            <h4 className="text-xl font-semibold mb-3">Contact Us</h4>
            <p className="text-lg">Email: psoriasisdetection@gmail.com</p>
            <p className="text-lg">Phone: 999272727</p>
          </div>
        </div>

        <div className="mt-6 border-t-2 border-white pt-4 text-center">
          <p className="text-lg">&copy; {new Date().getFullYear()} Psoriasis Detection. All rights reserved.</p>
          <div className="flex justify-center mt-3 space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f text-2xl hover:text-pink-300"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter text-2xl hover:text-pink-300"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram text-2xl hover:text-pink-300"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
