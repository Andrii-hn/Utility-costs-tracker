import { useState, useEffect } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'

import LandingPage from "./pages/LandingPage/LandingPage"
import LoginPage from "./pages/Auth/LoginPage"
import RegistrationPage from "./pages/Auth/RegistrationPage"
import DashboardPage from './pages/DashboardPage/DashboardPage'
import ServiceSettingsPage from './pages/ServiceSettingsPage/ServiceSettingsPage'
import PropertyPage from './pages/PropertyPage/PropertyPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ProfileSettingsPage from './pages/ProfileSettingsPage/ProfileSettingsPage'

import PublicLayout from './components/layout/PublicLayout/PublicLayout'
import DashboardLayout from './components/layout/DashboardLayout/DashboardLayout'

function App() {
  const [properties, setProperties] = useState(() => {
    const stored = localStorage.getItem("properties");
    if (!stored) return []
    
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  });

  useEffect(() => {
      localStorage.setItem("properties", JSON.stringify(properties));
  }, [properties]);

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

  const handleRegister = (fname, lname, email, password) => {
    const newUser = {fname, lname, email, password };
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

  function onUpdateUser(formData) {
    setUser(prev => ({
      ...prev,
      ...formData
  }))}

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  function onChangePassword(formData) {
    if (formData.currentPassword !== user.password) {
      return {
        success: false,
        error: "Старий пароль введено неправильно"
      };
    }

    setUser(prev => ({
      ...prev, 
      password : formData.newPassword 
    }))

    return {
      success: true
    };
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
              <DashboardLayout 
                onLogout={handleLogout} 
                user={user}
                onUpdateUser={onUpdateUser}
                onChangePassword={onChangePassword}
                properties={properties}
                setProperties={setProperties}
              />
            ) : (   
              <Navigate to="/login" />
            )
          } 
        >
          <Route index element={<DashboardPage />} />
          <Route path='service-settings' element={<ServiceSettingsPage />} />
          <Route path="property/:id" element={<PropertyPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<ProfileSettingsPage />} />
        </Route>
      </Routes>
  )
}



export default App
