import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './../src/index.css'
import Home from "./views/Home.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./views/Dashboard.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  </BrowserRouter>
);
