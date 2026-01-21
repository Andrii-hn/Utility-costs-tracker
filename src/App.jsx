import { useState } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'

import LandingPage from "./pages/LandingPage/LandingPage"
import LoginPage from "./pages/Auth/LoginPage"
import RegistrationPage from "./pages/Auth/RegistrationPage"
import DashboardPage from './pages/DashboardPage/DashboardPage'

import PublicLayout from './components/layout/PublicLayout/PublicLayout'
import DashboardLayout from './components/layout/DashboardLayout/DashboardLayout'

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  })

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem("isAuth")
    return savedAuth === "true"
  })

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  }

  const handleLogin = (email, password) => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      alert("Користувач не знайдений. Зареєструйтесь.");
      return;
    }

    const parsedUser = JSON.parse(savedUser);

    if (
      parsedUser.email !== email ||
      parsedUser.password !== password
    ) {
      alert("Невірний email або пароль");
      return;
    }

    localStorage.setItem("isAuth", "true");
    setUser(parsedUser);
    setIsAuthenticated(true);
  }

  const handleRegister = (email, password) => {
    const newUser = { email, password };
    localStorage.setItem("user", JSON.stringify(newUser))
    localStorage.setItem("isAuth", "true")
    setUser(newUser);
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuth")
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
      <Routes>
        {/* Public */}
        <Route 
          path="/"  
          element={
            <PublicLayout onLoginClick={handleLoginClick}>
              <LandingPage />
            </PublicLayout> 
          } 
        />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? ( 
              <Navigate to="/dashboard" /> 
            ) : (
              <PublicLayout>
                <LoginPage onLogin={handleLogin} />
              </PublicLayout>
            )
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? ( 
              <Navigate to="/dashboard" /> 
            ) : (
              <PublicLayout>
                <RegistrationPage onRegister={handleRegister} />
              </PublicLayout>
            )
          } 
        />

        {/* Protected Dashboard */}
        <Route 
          path='/dashboard' 
          element={
            isAuthenticated ? ( 
              <DashboardLayout onLogout={handleLogout} user={user} />
            ) : (   
              <Navigate to="/login" />
            )
          } 
        >
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
  )
}



export default App
