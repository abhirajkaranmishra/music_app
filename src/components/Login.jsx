import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    const result = login(username, password)
    if (!result.success) {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 glass rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold gradient-text">
            🎵 Sign in to Music 🎵
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white/90 text-gray-900 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white/90 text-gray-900 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm"
                placeholder="Enter password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center font-medium">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 shadow-md"
            >
              Sign in
            </button>
          </div>

          <div className="text-center text-sm text-gray-900">
            <p className="font-medium">Demo Credentials:</p>
            <p>Admin: admin / admin123</p>
            <p>User: user / user123</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
