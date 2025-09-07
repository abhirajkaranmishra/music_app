import React, { useState, useMemo, useEffect } from 'react'

// Custom music data
const initialSongs = [
  { id: 1, title: 'Dhoom Again', artist: 'Vishal Dadlani', album: 'Album 1', year: 2020, duration: '4:15' },
  { id: 2, title: 'Bang Bang', artist: 'Shekhar', album: 'Album 1', year: 2020, duration: '3:45' },
  { id: 3, title: 'Despacito', artist: 'Luis Fonsi', album: 'Album 2', year: 2017, duration: '3:48' },
  { id: 4, title: 'Shape of you', artist: 'Ed sheeran', album: 'Album 2', year: 2017, duration: '3:53' },
  { id: 5, title: 'Senorita', artist: 'Hritik Roshan', album: 'Album 2', year: 2019, duration: '3:10' },
  { id: 6, title: 'Let Me Love You', artist: 'Justin Bieber', album: 'Album 2', year: 2016, duration: '3:25' },
  { id: 7, title: 'Zara Sa', artist: 'KK', album: 'Album 2', year: 2018, duration: '4:20' },
  { id: 8, title: 'Dil Sambhal Ja Zara', artist: 'Aijit', album: 'Album 2', year: 2019, duration: '3:55' },
  { id: 9, title: 'Guzarish', artist: 'Javed Ali', album: 'Album 2', year: 2017, duration: '4:10' },
  { id: 10, title: 'Brown Rang', artist: 'Honey Singh', album: 'Album 2', year: 2016, duration: '3:30' },
  { id: 11, title: 'Slow Motion Angreza', artist: 'Shukhwinder Singh', album: 'Album 2', year: 2018, duration: '4:05' },
  { id: 12, title: 'Dil ka jo haal hai', artist: 'Abhijeet Bhattacharya', album: 'Album 2', year: 2019, duration: '3:40' },
  { id: 13, title: 'Suraj Hua Maddham', artist: 'Sonu Nigam', album: 'Album 2', year: 2017, duration: '4:25' },
  { id: 14, title: 'Hawayein', artist: 'Arijit Singh', album: 'Album 2', year: 2018, duration: '3:50' },
  { id: 15, title: 'Bijuriya', artist: 'Sonu Nigam', album: 'Album 2', year: 2019, duration: '3:35' },
  { id: 16, title: 'Laal Pari', artist: 'Honey Singh', album: 'Album 2', year: 2016, duration: '3:20' }
]

// Helper functions for localStorage
const getStoredSongs = () => {
  try {
    const stored = localStorage.getItem('musicLibrarySongs')
    if (stored) {
      const parsedSongs = JSON.parse(stored)
      // Check if we need to update to new song list
      const hasOldSongs = parsedSongs.some(song => song.title === 'Bohemian Rhapsody')
      if (hasOldSongs) {
        // Clear old songs and use new ones
        localStorage.removeItem('musicLibrarySongs')
        return initialSongs
      }
      return parsedSongs
    }
    return initialSongs
  } catch (error) {
    console.error('Error loading songs from localStorage:', error)
    return initialSongs
  }
}

const saveSongsToStorage = (songs) => {
  try {
    localStorage.setItem('musicLibrarySongs', JSON.stringify(songs))
  } catch (error) {
    console.error('Error saving songs to localStorage:', error)
  }
}

const MusicLibrary = ({ userRole = 'user' }) => {
  const [songs, setSongs] = useState(() => getStoredSongs())
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('title')
  const [groupBy, setGroupBy] = useState('none')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
    duration: ''
  })

  const isAdmin = userRole === 'admin'

  // Save songs to localStorage whenever they change
  useEffect(() => {
    saveSongsToStorage(songs)
  }, [songs])

  // Filter songs based on search term
  const filteredSongs = useMemo(() => {
    if (!searchTerm) return songs
    
    return songs.filter(song => 
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [songs, searchTerm])

  // Sort songs
  const sortedSongs = useMemo(() => {
    return [...filteredSongs].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'artist':
          return a.artist.localeCompare(b.artist)
        case 'album':
          return a.album.localeCompare(b.album)
        case 'year':
          return b.year - a.year
        default:
          return 0
      }
    })
  }, [filteredSongs, sortBy])

  // Group songs
  const groupedSongs = useMemo(() => {
    if (groupBy === 'none') {
      return { 'All Songs': sortedSongs }
    }

    return sortedSongs.reduce((groups, song) => {
      const key = song[groupBy]
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(song)
      return groups
    }, {})
  }, [sortedSongs, groupBy])

  // Add new song
  const handleAddSong = (e) => {
    e.preventDefault()
    if (newSong.title && newSong.artist && newSong.album) {
      const song = {
        id: Math.max(...songs.map(s => s.id)) + 1,
        ...newSong,
        year: parseInt(newSong.year) || new Date().getFullYear()
      }
      const updatedSongs = [...songs, song]
      setSongs(updatedSongs)
      setNewSong({ title: '', artist: '', album: '', year: '', duration: '' })
      setShowAddForm(false)
      
      // Show success message
      alert(`Song "${song.title}" by ${song.artist} has been added successfully!`)
    }
  }

  // Delete song
  const handleDeleteSong = (id) => {
    const songToDelete = songs.find(song => song.id === id)
    if (songToDelete && window.confirm(`Are you sure you want to delete "${songToDelete.title}" by ${songToDelete.artist}?`)) {
      const updatedSongs = songs.filter(song => song.id !== id)
      setSongs(updatedSongs)
      alert(`Song "${songToDelete.title}" has been deleted successfully!`)
    }
  }

  return (
    <div className="min-h-screen text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Music Library</h2>
          
          {/* Controls */}
          <div className="glass rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search songs..."
                  className="w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm"
                />
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm"
                >
                  <option value="title" className="text-gray-900">Title</option>
                  <option value="artist" className="text-gray-900">Artist</option>
                  <option value="album" className="text-gray-900">Album</option>
                  <option value="year" className="text-gray-900">Year</option>
                </select>
              </div>

              {/* Group By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group By
                </label>
                <select
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value)}
                  className="w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm"
                >
                  <option value="none" className="text-gray-900">No Grouping</option>
                  <option value="artist" className="text-gray-900">Artist</option>
                  <option value="album" className="text-gray-900">Album</option>
                  <option value="year" className="text-gray-900">Year</option>
                </select>
              </div>

              {/* Add Song Button (Admin only) */}
              {isAdmin && (
                <div className="flex items-end">
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-4 py-2 rounded-md font-medium transition-all duration-300 shadow-md"
                  >
                    {showAddForm ? 'Cancel' : 'Add Song'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Add Song Form (Admin only) */}
          {isAdmin && showAddForm && (
            <div className="glass rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Add New Song</h3>
              <form onSubmit={handleAddSong} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newSong.title}
                  onChange={(e) => setNewSong({...newSong, title: e.target.value})}
                  className="px-3 py-2 bg-white/80 border border-gray-300 rounded-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Artist"
                  value={newSong.artist}
                  onChange={(e) => setNewSong({...newSong, artist: e.target.value})}
                  className="px-3 py-2 bg-white/80 border border-gray-300 rounded-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Album"
                  value={newSong.album}
                  onChange={(e) => setNewSong({...newSong, album: e.target.value})}
                  className="px-3 py-2 bg-white/80 border border-gray-300 rounded-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm"
                  required
                />
                <input
                  type="number"
                  placeholder="Year"
                  value={newSong.year}
                  onChange={(e) => setNewSong({...newSong, year: e.target.value})}
                  className="px-3 py-2 bg-white/80 border border-gray-300 rounded-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm"
                />
                <input
                  type="text"
                  placeholder="Duration (e.g., 3:45)"
                  value={newSong.duration}
                  onChange={(e) => setNewSong({...newSong, duration: e.target.value})}
                  className="px-3 py-2 bg-white/80 border border-gray-300 rounded-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-4 py-2 rounded-md font-medium transition-all duration-300 shadow-md"
                >
                  Add Song
                </button>
              </form>
            </div>
          )}

          {/* Songs List */}
          <div className="space-y-6">
            {Object.entries(groupedSongs).map(([groupName, groupSongs]) => (
              <div key={groupName} className="glass rounded-lg overflow-hidden">
                {groupBy !== 'none' && (
                  <div className="bg-slate-700 px-6 py-3">
                    <h3 className="text-lg font-semibold text-white">{groupName}</h3>
                  </div>
                )}
                <div className="divide-y divide-gray-300">
                  {groupSongs.map((song) => (
                    <div key={song.id} className="px-6 py-4 hover:bg-white/20 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              <h4 className="text-lg font-medium text-gray-900">{song.title}</h4>
                              <p className="text-gray-700">{song.artist}</p>
                            </div>
                            <div className="text-gray-600 text-sm">
                              <p>{song.album}</p>
                              <p>{song.year} • {song.duration}</p>
                            </div>
                          </div>
                        </div>
                        {isAdmin && (
                          <button
                            onClick={() => handleDeleteSong(song.id)}
                            className="ml-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-1 rounded text-sm transition-all duration-300 shadow-md"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {sortedSongs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No songs found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MusicLibrary
