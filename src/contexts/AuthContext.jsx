import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

// Mock JWT implementation
const createMockJWT = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({
    sub: user.id,
    role: user.role,
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  }))
  const signature = btoa('mock-signature')
  return `${header}.${payload}.${signature}`
}

const parseMockJWT = (token) => {
  try {
    const parts = token.split('.')
    const payload = JSON.parse(atob(parts[1]))
    return payload
  } catch (error) {
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('music_app_token')
    if (savedToken) {
      const payload = parseMockJWT(savedToken)
      if (payload && payload.exp > Date.now()) {
        setToken(savedToken)
        setUser({
          id: payload.sub,
          role: payload.role
        })
      } else {
        localStorage.removeItem('music_app_token')
      }
    }
  }, [])

  const login = (username, password) => {
    // Mock authentication
    const users = {
      admin: { id: '1', role: 'admin', username: 'admin' },
      user: { id: '2', role: 'user', username: 'user' }
    }

    if (username === 'admin' && password === 'admin123') {
      const userData = users.admin
      const newToken = createMockJWT(userData)
      setUser(userData)
      setToken(newToken)
      localStorage.setItem('music_app_token', newToken)
      return { success: true }
    } else if (username === 'user' && password === 'user123') {
      const userData = users.user
      const newToken = createMockJWT(userData)
      setUser(userData)
      setToken(newToken)
      localStorage.setItem('music_app_token', newToken)
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('music_app_token')
  }

  const isAdmin = () => user?.role === 'admin'
  const isUser = () => user?.role === 'user'

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isAdmin,
      isUser,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
