import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const { user, logout, isAdmin } = useAuth()

  return (
    <header className="glass shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold gradient-text">
              🎵 Music
            </h1>
            <span className="ml-4 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-md">
              {user?.role?.toUpperCase()}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-900 font-medium">
              Welcome, {user?.username}
            </span>
            <button
              onClick={logout}
              className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
