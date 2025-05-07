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

  if (!mounted || !user) return null;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-amber-200 via-pink-100 to-teal-100 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md border border-black rounded-2xl shadow-xl p-10 grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left side: welcome text */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            👾 Welcome to <span className="text-indigo-600">RetroShare</span>
          </h1>
          <p className="text-lg text-gray-600">
            Hello, <span className="font-semibold text-pink-600">{user.email}</span> 👋 <br />
            Ready to explore the retro world of photo sharing?
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
          >
            🚪 Sign Out
          </button>
        </div>

        {/* Right side: navigation buttons */}
        <div className="flex flex-col gap-4 text-center">
          {user.role === 'admin' && (
            <Link
              href="/creator"
              className="bg-blue-200 hover:bg-blue-300 text-black font-bold py-3 rounded-xl border border-black transition"
            >
              🎮 Enter Creator Zone
            </Link>
          )}
          <Link
            href="/consumer"
            className="bg-green-200 hover:bg-green-300 text-black font-bold py-3 rounded-xl border border-black transition"
          >
            🕶️ Explore as Viewer
          </Link>
        </div>
      </div>
    </main>
  );
}
