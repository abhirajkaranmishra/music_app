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
const {useState,useMemo} = React;

const initialSongs = [
  { id: 1, title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", year: 1975, duration: "5:55" },
  { id: 2, title: "Hotel California", artist: "Eagles", album: "Hotel California", year: 1976, duration: "6:30" },
  { id: 3, title: "Stairway to Heaven", artist: "Led Zeppelin", album: "Led Zeppelin IV", year: 1971, duration: "8:02" },
  { id: 4, title: "Imagine", artist: "John Lennon", album: "Imagine", year: 1971, duration: "3:07" },
  { id: 5, title: "Billie Jean", artist: "Michael Jackson", album: "Thriller", year: 1982, duration: "4:54" },
  { id: 6, title: "Sweet Child O Mine", artist: "Guns N Roses", album: "Appetite for Destruction", year: 1987, duration: "5:56" },
  { id: 7, title: "Smells Like Teen Spirit", artist: "Nirvana", album: "Nevermind", year: 1991, duration: "5:01" },
  { id: 8, title: "Wonderwall", artist: "Oasis", album: "Morning Glory", year: 1995, duration: "4:18" },
  { id: 9, title: "Creep", artist: "Radiohead", album: "Pablo Honey", year: 1992, duration: "3:58" },
  { id: 10, title: "Black", artist: "Pearl Jam", album: "Ten", year: 1991, duration: "5:43" }
];
const MusicLibrary = ({ userRole = "user" }) => {
  const [songs, setSongs] = useState(initialSongs);
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
      setSongs([...songs, song]);
      setNewSong({ title: "", artist: "", album: "", year: "", duration: "" });
      setShowAddForm(false);
    }
  };
  const handleDeleteSong = (id) => {
    setSongs(songs.filter((song) => song.id !== id));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gray-900 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-white mb-6", children: "Music Library" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-800 rounded-lg p-6 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Search" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            placeholder: "Search songs...",
            className: "w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Sort By" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: sortBy,
            onChange: (e) => setSortBy(e.target.value),
            className: "w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "title", children: "Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "artist", children: "Artist" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "album", children: "Album" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "year", children: "Year" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Group By" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: groupBy,
            onChange: (e) => setGroupBy(e.target.value),
            className: "w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "none", children: "No Grouping" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "artist", children: "Artist" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "album", children: "Album" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "year", children: "Year" })
            ]
          }
        )
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setShowAddForm(!showAddForm),
          className: "w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors",
          children: showAddForm ? "Cancel" : "Add Song"
        }
      ) })
    ] }) }),
    isAdmin && showAddForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-6 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-4", children: "Add New Song" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAddSong, className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Title",
            value: newSong.title,
            onChange: (e) => setNewSong({ ...newSong, title: e.target.value }),
            className: "px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500",
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
            className: "px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500",
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
            className: "px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500",
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
            className: "px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Duration (e.g., 3:45)",
            value: newSong.duration,
            onChange: (e) => setNewSong({ ...newSong, duration: e.target.value }),
            className: "px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            className: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors",
            children: "Add Song"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: Object.entries(groupedSongs).map(([groupName, groupSongs]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg overflow-hidden", children: [
      groupBy !== "none" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-600 px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: groupName }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-gray-700", children: groupSongs.map((song) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 hover:bg-gray-700 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-medium text-white", children: song.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-300", children: song.artist })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-400 text-sm", children: [
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
            className: "ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors",
            children: "Delete"
          }
        )
      ] }) }, song.id)) })
    ] }, groupName)) }),
    sortedSongs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-lg", children: "No songs found matching your criteria." }) })
  ] }) }) });
};

export { MusicLibrary as default, jsxRuntimeExports as j };
