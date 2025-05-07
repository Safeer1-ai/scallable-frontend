'use client';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!mounted || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#ffe3b3] via-[#ffd6ec] to-[#b3ffec] text-gray-900 font-mono p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white/90 p-10 rounded-3xl shadow-2xl border-4 border-black">
        
        {/* Left - Welcome Text */}
        <div className="text-left space-y-6">
          <h1 className="text-5xl font-extrabold text-[#292929] drop-shadow-[3px_3px_0_rgba(0,0,0,0.6)]">
            👾 Welcome to RetroShare
          </h1>
          <p className="text-xl text-gray-700">
            Hello, <span className="font-bold text-pink-600">{user.email}</span> 👋 <br />
            Jump into your role and start exploring our retro photo-sharing world!
          </p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white border-2 border-black px-6 py-3 rounded-xl font-bold shadow-[2px_2px_0_rgba(0,0,0,0.7)] transition-all duration-300"
          >
            🚪 Sign Out
          </button>
        </div>

        {/* Right - Buttons */}
        <div className="flex flex-col space-y-6 text-center">
          {user.role === 'admin' && (
            <Link
              href="/creator"
              className="bg-[#00f0ff] text-black border-2 border-black px-8 py-4 rounded-2xl text-xl font-extrabold shadow-[3px_3px_0_rgba(0,0,0,0.6)] hover:bg-[#38fbff] transition duration-300"
            >
              🎮 Enter Creator Zone
            </Link>
          )}
          <Link
            href="/consumer"
            className="bg-[#baff63] text-black border-2 border-black px-8 py-4 rounded-2xl text-xl font-extrabold shadow-[3px_3px_0_rgba(0,0,0,0.6)] hover:bg-[#d3ff7f] transition duration-300"
          >
            🕶️ Explore as Viewer
          </Link>
        </div>
      </div>
    </main>
  );
}
