"use client";

import { supabase } from "@/lib/supabaseClient";

export default function AuthButton() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000",
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
        className="bg-blue-600 text-white px-4 py-2 rounded-xl"
      >
        Login with Google
      </button>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-xl"
      >
        Logout
      </button>
    </div>
  );
}
