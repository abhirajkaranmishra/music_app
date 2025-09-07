import React, { Suspense } from 'react'
import { useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import Header from './components/Header'
import './App.css'

// Import MusicLibrary directly from the music-library directory
const MusicLibrary = React.lazy(() => import('../music-library/src/MusicLibrary.jsx'))

const App = () => {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        {/* Floating music notes */}
        <div className="music-note">♪</div>
        <div className="music-note">♫</div>
        <div className="music-note">♪</div>
        <div className="music-note">♫</div>
        <div className="music-note">♪</div>
        <div className="music-note">♫</div>
        <Login />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Floating music notes */}
      <div className="music-note">♪</div>
      <div className="music-note">♫</div>
      <div className="music-note">♪</div>
      <div className="music-note">♫</div>
      <div className="music-note">♪</div>
      <div className="music-note">♫</div>
      
      <Header />
      <main>
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">
          <div className="glass p-8 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
              <p className="text-gray-900">Loading Music Library...</p>
            </div>
          </div>
        </div>}>
          <MusicLibrary userRole={user?.role} />
        </Suspense>
      </main>
    </div>
  )
}

export default App
