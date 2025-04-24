import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // changed from 'react-router'
import "./index.css"; // you had ./../src/index.css, simplified to ./index.css
import Login from "./components/Login.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Contact from "./views/Contact.jsx";
import About from "./views/About.jsx";
import Home from "./views/Homepage.jsx";


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
