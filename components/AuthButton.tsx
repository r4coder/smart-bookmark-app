"use client";

import { supabase } from "@/lib/supabaseClient";

export default function AuthButton() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Automatically uses current domain
        // localhost during dev
        // vercel URL in production
        redirectTo: window.location.origin,
      },
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={login}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
      >
        Login with Google
      </button>

      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
      >
        Logout
      </button>
    </div>
  );
}
