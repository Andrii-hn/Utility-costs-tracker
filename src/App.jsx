import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'

import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from './pages/DashboardPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem("isAuth")
    return savedAuth === "true"
  })

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem("isAuth", "true")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("isAuth", "true")
  }

  return (
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            (isAuthenticated) 
            ? <Navigate to="/dashboard" />
            : <LoginPage onLogin={handleLogin} />
          } />
        <Route path='/dashboard' element={
          (isAuthenticated)
          ? <DashboardPage onLogout={handleLogout}/>
          : <Navigate to="/login" />
        }/>
      </Routes>
  )
}



export default App
