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
      <AuthProvider>
          <Toaster />
          <Router>
              <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/home" element={<HomePage />} />
              </Routes>
          </Router>
      </AuthProvider>

  )
}

export default App
