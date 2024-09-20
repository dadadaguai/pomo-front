// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@/app/globals.css'
import LoginPage from './page/login.jsx'
import HomePage from "./page/homepage.jsx";
import {AuthProvider} from "@/src/contexts/AuthContext.jsx";
import {Toaster} from "react-hot-toast";

function App() {

  return (
      <Router>
          <AuthProvider>
              <Toaster />

                  <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/login" element={<LoginPage />} />
                  </Routes>
          </AuthProvider>
      </Router>

  )
}

export default App
