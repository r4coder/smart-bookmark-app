"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Bookmark } from "@/types/bookmark";

export default function BookmarkList({ userId }: { userId: string }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  useEffect(() => {
    fetchBookmarks();

    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => fetchBookmarks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-700">Your Bookmarks</h2>

      {bookmarks.length === 0 && (
        <div className="bg-white border rounded-2xl shadow p-4 text-center text-gray-500">
          No bookmarks yet ✨
        </div>
      )}

      {bookmarks.map((b) => (
        <div
          key={b.id}
          className="bg-white border rounded-2xl shadow p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold text-gray-800">{b.title}</p>
            <a
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm hover:underline break-all"
            >
              {b.url}
            </a>
          </div>

          <button
            onClick={() => deleteBookmark(b.id)}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
