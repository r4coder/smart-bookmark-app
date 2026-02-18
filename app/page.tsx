"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AuthButton from "@/components/AuthButton";
import AddBookmark from "@/components/AddBookmark";
import BookmarkList from "@/components/BookmarkList";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Smart Bookmark App</h1>

      {!user ? (
        <div className="flex justify-center">
          <AuthButton />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Logged in as {user.email}
            </p>
            <AuthButton />
          </div>

          <AddBookmark userId={user.id} />
          <BookmarkList userId={user.id} />
        </>
      )}
    </main>
  );
}
