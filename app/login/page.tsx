"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

import AuthButton from "@/components/AuthButton";
import AddBookmark from "@/components/AddBookmark";
import BookmarkList from "@/components/BookmarkList";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">Smart Bookmark App</h1>

        {!user ? (
          <div className="flex justify-center">
            <AuthButton />
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 text-center">
              Logged in as {user.email}
            </p>

            <div className="flex justify-center">
              <AuthButton />
            </div>

            <AddBookmark userId={user.id} />
            <BookmarkList userId={user.id} />
          </>
        )}
      </div>
    </main>
  );
}
