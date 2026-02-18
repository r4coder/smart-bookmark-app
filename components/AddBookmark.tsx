"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddBookmark({ userId }: { userId: string }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async () => {
    if (!title.trim() || !url.trim()) return;

    await supabase.from("bookmarks").insert([
      { title, url, user_id: userId },
    ]);

    setTitle("");
    setUrl("");
  };

  return (
    <div className="bg-white border rounded-2xl shadow p-4 space-y-3">
      <h2 className="text-lg font-semibold text-gray-700">Add Bookmark</h2>

      <input
        className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Bookmark title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={addBookmark}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition"
      >
        ➕ Add Bookmark
      </button>
    </div>
  );
}
