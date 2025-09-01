"use client";

import { useEffect, useState } from "react";

type Emoji = {
  name: string;
  category: string;
  htmlCode: string[];
};

export default function EmojisPage() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [favorites, setFavorites] = useState<Emoji[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [toast, setToast] = useState<string | null>(null);

  // search
  const [search, setSearch] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const perPage = 30;

  useEffect(() => {
    fetch("/api/emojis")
      .then((res) => res.json())
      .then((data) => setEmojis(data));

    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  function copyEmoji(emoji: Emoji) {
    navigator.clipboard.writeText(emoji.htmlCode[0]).then(() => {
      setToast(`${emoji.htmlCode[0]} copied!`);
      setTimeout(() => setToast(null), 2000);
    });
  }

  function toggleFavorite(emoji: Emoji) {
    let updated: Emoji[];
    if (favorites.find((f) => f.name === emoji.name)) {
      updated = favorites.filter((f) => f.name !== emoji.name);
    } else {
      updated = [...favorites, emoji];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  const categories = Array.from(new Set(emojis.map((e) => e.category)));

  // filter by tab
  let displayedEmojis =
    activeTab === "All"
      ? emojis
      : activeTab === "Favorites"
      ? favorites
      : emojis.filter((e) => e.category === activeTab);

  // filter by search
  if (search.trim()) {
    displayedEmojis = displayedEmojis.filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // reset to page 1 when changing tab or search
  useEffect(() => {
    setPage(1);
  }, [activeTab, search]);

  // slice for current page
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginated = displayedEmojis.slice(start, end);
  const totalPages = Math.ceil(displayedEmojis.length / perPage);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Эмодзи</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search emojis..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded"
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setActiveTab("All")}
          className={`px-3 py-1 rounded cursor-pointer ${
            activeTab === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab("Favorites")}
          className={`px-3 py-1 rounded cursor-pointer ${
            activeTab === "Favorites" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Favorites ⭐
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-3 py-1 rounded cursor-pointer ${
              activeTab === cat ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Emoji grid */}
      <div className="grid grid-cols-6 gap-2">
        {paginated.map((emoji) => (
          <div
            key={emoji.name}
            className="p-2 flex flex-col items-center border rounded cursor-pointer relative"
          >
            <span
              dangerouslySetInnerHTML={{ __html: emoji.htmlCode[0] }}
              className="text-2xl"
              onClick={() => copyEmoji(emoji)}
            />
            <span className="text-xs text-gray-600">{emoji.name}</span>
            <button
              onClick={() => toggleFavorite(emoji)}
              className="absolute top-1 right-1 text-yellow-500 text-2xl cursor-pointer"
            >
              {favorites.find((f) => f.name === emoji.name) ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 cursor-pointer"
          >
            Prev
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
