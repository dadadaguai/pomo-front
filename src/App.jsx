// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@/app/globals.css'
import LoginPage from './page/login.jsx'
import HomePage from "./page/homepage.jsx";

function App() {

  return (
      <Router>
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
          </Routes>
      </Router>
      // <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      //     <LoginPage/>
      // </div>
  )
}

export default App
