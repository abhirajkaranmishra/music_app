import { importShared } from './__federation_fn_import-gVVR6EuA.js';
import { r as reactExports } from './index-Dm_EQZZA.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

const React = await importShared('react');
const {useState,useMemo,useEffect} = React;

const initialSongs = [
  { id: 1, title: "Dhoom Again", artist: "Vishal Dadlani", album: "Album 1", year: 2020, duration: "4:15" },
  { id: 2, title: "Bang Bang", artist: "Shekhar", album: "Album 1", year: 2020, duration: "3:45" },
  { id: 3, title: "Despacito", artist: "Luis Fonsi", album: "Album 2", year: 2017, duration: "3:48" },
  { id: 4, title: "Shape of you", artist: "Ed sheeran", album: "Album 2", year: 2017, duration: "3:53" },
  { id: 5, title: "Senorita", artist: "Hritik Roshan", album: "Album 2", year: 2019, duration: "3:10" },
  { id: 6, title: "Let Me Love You", artist: "Justin Bieber", album: "Album 2", year: 2016, duration: "3:25" },
  { id: 7, title: "Zara Sa", artist: "KK", album: "Album 2", year: 2018, duration: "4:20" },
  { id: 8, title: "Dil Sambhal Ja Zara", artist: "Aijit", album: "Album 2", year: 2019, duration: "3:55" },
  { id: 9, title: "Guzarish", artist: "Javed Ali", album: "Album 2", year: 2017, duration: "4:10" },
  { id: 10, title: "Brown Rang", artist: "Honey Singh", album: "Album 2", year: 2016, duration: "3:30" },
  { id: 11, title: "Slow Motion Angreza", artist: "Shukhwinder Singh", album: "Album 2", year: 2018, duration: "4:05" },
  { id: 12, title: "Dil ka jo haal hai", artist: "Abhijeet Bhattacharya", album: "Album 2", year: 2019, duration: "3:40" },
  { id: 13, title: "Suraj Hua Maddham", artist: "Sonu Nigam", album: "Album 2", year: 2017, duration: "4:25" },
  { id: 14, title: "Hawayein", artist: "Arijit Singh", album: "Album 2", year: 2018, duration: "3:50" },
  { id: 15, title: "Bijuriya", artist: "Sonu Nigam", album: "Album 2", year: 2019, duration: "3:35" },
  { id: 16, title: "Laal Pari", artist: "Honey Singh", album: "Album 2", year: 2016, duration: "3:20" }
];
const getStoredSongs = () => {
  try {
    const stored = localStorage.getItem("musicLibrarySongs");
    if (stored) {
      const parsedSongs = JSON.parse(stored);
      const hasOldSongs = parsedSongs.some((song) => song.title === "Bohemian Rhapsody");
      if (hasOldSongs) {
        localStorage.removeItem("musicLibrarySongs");
        return initialSongs;
      }
      return parsedSongs;
    }
    return initialSongs;
  } catch (error) {
    console.error("Error loading songs from localStorage:", error);
    return initialSongs;
  }
};
const saveSongsToStorage = (songs) => {
  try {
    localStorage.setItem("musicLibrarySongs", JSON.stringify(songs));
  } catch (error) {
    console.error("Error saving songs to localStorage:", error);
  }
};
const MusicLibrary = ({ userRole = "user" }) => {
  const [songs, setSongs] = useState(() => getStoredSongs());
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [groupBy, setGroupBy] = useState("none");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
    duration: ""
  });
  const isAdmin = userRole === "admin";
  useEffect(() => {
    saveSongsToStorage(songs);
  }, [songs]);
  const filteredSongs = useMemo(() => {
    if (!searchTerm) return songs;
    return songs.filter(
      (song) => song.title.toLowerCase().includes(searchTerm.toLowerCase()) || song.artist.toLowerCase().includes(searchTerm.toLowerCase()) || song.album.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [songs, searchTerm]);
  const sortedSongs = useMemo(() => {
    return [...filteredSongs].sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "artist":
          return a.artist.localeCompare(b.artist);
        case "album":
          return a.album.localeCompare(b.album);
        case "year":
          return b.year - a.year;
        default:
          return 0;
      }
    });
  }, [filteredSongs, sortBy]);
  const groupedSongs = useMemo(() => {
    if (groupBy === "none") {
      return { "All Songs": sortedSongs };
    }
    return sortedSongs.reduce((groups, song) => {
      const key = song[groupBy];
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(song);
      return groups;
    }, {});
  }, [sortedSongs, groupBy]);
  const handleAddSong = (e) => {
    e.preventDefault();
    if (newSong.title && newSong.artist && newSong.album) {
      const song = {
        id: Math.max(...songs.map((s) => s.id)) + 1,
        ...newSong,
        year: parseInt(newSong.year) || (/* @__PURE__ */ new Date()).getFullYear()
      };
      const updatedSongs = [...songs, song];
      setSongs(updatedSongs);
      setNewSong({ title: "", artist: "", album: "", year: "", duration: "" });
      setShowAddForm(false);
      alert(`Song "${song.title}" by ${song.artist} has been added successfully!`);
    }
  };
  const handleDeleteSong = (id) => {
    const songToDelete = songs.find((song) => song.id === id);
    if (songToDelete && window.confirm(`Are you sure you want to delete "${songToDelete.title}" by ${songToDelete.artist}?`)) {
      const updatedSongs = songs.filter((song) => song.id !== id);
      setSongs(updatedSongs);
      alert(`Song "${songToDelete.title}" has been deleted successfully!`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen text-gray-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-6", children: "Music Library" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-lg p-6 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Search" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            placeholder: "Search songs...",
            className: "w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Sort By" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: sortBy,
            onChange: (e) => setSortBy(e.target.value),
            className: "w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "title", className: "text-gray-900", children: "Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "artist", className: "text-gray-900", children: "Artist" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "album", className: "text-gray-900", children: "Album" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "year", className: "text-gray-900", children: "Year" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Group By" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: groupBy,
            onChange: (e) => setGroupBy(e.target.value),
            className: "w-full px-3 py-2 bg-white/80 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "none", className: "text-gray-900", children: "No Grouping" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "artist", className: "text-gray-900", children: "Artist" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "album", className: "text-gray-900", children: "Album" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "year", className: "text-gray-900", children: "Year" })
            ]
          }
        )
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setShowAddForm(!showAddForm),
          className: "w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-4 py-2 rounded-md font-medium transition-all duration-300 shadow-md",
          children: showAddForm ? "Cancel" : "Add Song"
        }
      ) })
    ] }) }),
    isAdmin && showAddForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-lg p-6 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-4", children: "Add New Song" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAddSong, className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Title",
            value: newSong.title,
            onChange: (e) => setNewSong({ ...newSong, title: e.target.value }),
            className: "px-3 py-2 bg-white/80 border border-gray-300 rounded-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm",
            required: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Artist",
            value: newSong.artist,
            onChange: (e) => setNewSong({ ...newSong, artist: e.target.value }),
            className: "px-3 py-2 bg-white/80 border border-gray-300 rounded-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm",
            required: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Album",
            value: newSong.album,
            onChange: (e) => setNewSong({ ...newSong, album: e.target.value }),
            className: "px-3 py-2 bg-white/80 border border-gray-300 rounded-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm",
            required: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            placeholder: "Year",
            value: newSong.year,
            onChange: (e) => setNewSong({ ...newSong, year: e.target.value }),
            className: "px-3 py-2 bg-white/80 border border-gray-300 rounded-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Duration (e.g., 3:45)",
            value: newSong.duration,
            onChange: (e) => setNewSong({ ...newSong, duration: e.target.value }),
            className: "px-3 py-2 bg-white/80 border border-gray-300 rounded-md text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-slate-500 focus:border-slate-500 backdrop-blur-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            className: "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-4 py-2 rounded-md font-medium transition-all duration-300 shadow-md",
            children: "Add Song"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: Object.entries(groupedSongs).map(([groupName, groupSongs]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-lg overflow-hidden", children: [
      groupBy !== "none" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-700 px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white", children: groupName }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-gray-300", children: groupSongs.map((song) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 hover:bg-white/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-medium text-gray-900", children: song.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700", children: song.artist })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-600 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: song.album }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              song.year,
              " • ",
              song.duration
            ] })
          ] })
        ] }) }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleDeleteSong(song.id),
            className: "ml-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-1 rounded text-sm transition-all duration-300 shadow-md",
            children: "Delete"
          }
        )
      ] }) }, song.id)) })
    ] }, groupName)) }),
    sortedSongs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-lg", children: "No songs found matching your criteria." }) })
  ] }) }) });
};

export { MusicLibrary as default, jsxRuntimeExports as j };
