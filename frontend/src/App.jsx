import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import Auth from './pages/Auth.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Radar from './pages/Radar.jsx'
import StockDetail from './pages/StockDetail.jsx'
import WhyPage from './pages/WhyPage.jsx'
import Coach from './pages/Coach.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Settings from './pages/Settings.jsx'


function App() {
  return (
    <BrowserRouter>
      {/* Global Animated Background layer */}
      <div className="particle-bg fixed inset-0 pointer-events-none z-[-2]">
        <div className="particle-stars absolute inset-0"></div>
      </div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/radar" element={<Radar />} />
        <Route path="/coach" element={<Coach />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/stock/:ticker" element={<StockDetail />} />
        <Route path="/why/:ticker" element={<WhyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
