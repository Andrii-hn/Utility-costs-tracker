import { useState } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'

import LandingPage from "./pages/LandingPage/LandingPage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from './pages/DashboardPage'
import PublicLayout from './components/layout/PublicLayout/PublicLayout'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem("isAuth")
    return savedAuth === "true"
  })

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  }

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
        <Route path="/" element={
          <PublicLayout onLoginClick={handleLoginClick}>
            <LandingPage />
          </PublicLayout> 
        } />
        <Route path="/login" element={
          (isAuthenticated) 
          ? <Navigate to="/dashboard" />
          : <LoginPage onLogin={handleLogin} />
        } />
        <Route path='/dashboard' element={
          (isAuthenticated)
          ? <DashboardPage onLogout={handleLogout}/>
          : <Navigate to="/login" />
        } />
      </Routes>
  )
}



export default App
