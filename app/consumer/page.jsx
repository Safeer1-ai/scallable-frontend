'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import PhotoCard from '../components/PhotoCard';
import Link from 'next/link';

export default function ConsumerPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/photos`)
        .then((res) => res.json())
        .then((data) => {
          setPhotos(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching photos:', err);
          setLoading(false);
        });
    }
  }, [user]);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#ffe3b3] via-[#ffd6ec] to-[#b3ffec] text-[#2c1d18] font-mono p-4">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-8 px-6">
        <Link href="/" className="text-3xl font-extrabold text-[#292929] drop-shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
          🖼️ Safeer Media Application
        </Link>
        <div className="flex gap-4">
          {user.role === 'admin' && (
            <Link
              href="/creator"
              className="bg-[#00f0ff] text-black border-2 border-black px-4 py-2 rounded-xl font-bold shadow-[2px_2px_0_rgba(0,0,0,0.6)] hover:bg-[#38fbff] transition"
            >
              👨‍🎨 Creator
            </Link>
          )}
          <Link
            href="/consumer"
            className="bg-[#baff63] text-black border-2 border-black px-4 py-2 rounded-xl font-bold shadow-[2px_2px_0_rgba(0,0,0,0.6)] hover:bg-[#d3ff7f] transition"
          >
            🖼️ Consumer
          </Link>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr] gap-6 max-w-7xl mx-auto">
        
        {/* Left Sidebar: Fake Links */}
        <aside className="hidden md:block md:col-span-1 space-y-4 text-[#444]">
          <nav className="sticky top-24">
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-pink-500 underline">📢 Trending</a></li>
              <li><a href="#" className="hover:text-pink-500 underline">🖌️ Art</a></li>
              <li><a href="#" className="hover:text-pink-500 underline">🌄 Nature</a></li>
              <li><a href="#" className="hover:text-pink-500 underline">📸 Photography</a></li>
              <li><a href="#" className="hover:text-pink-500 underline">🎨 Digital</a></li>
            </ul>
          </nav>
        </aside>

        {/* Center Column: Feed */}
        <section className="md:col-span-1 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#ff55a5] mb-8">
            📷 Your Feed
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full border-4 border-black border-t-transparent h-12 w-12"></div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="rounded-xl overflow-hidden bg-white/90 border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,0.5)] p-4 hover:scale-[1.02] transition duration-300"
                >
                  <PhotoCard photo={photo} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Right Sidebar: Follow Panel */}
        <aside className="hidden md:block md:col-span-1">
          <div className="sticky top-24 bg-white/80 border-2 border-black rounded-xl p-4 shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
            <h3 className="text-xl font-bold text-[#00c9a7] mb-4">👥 Suggested Follows</h3>
            {['@pixy_queen', '@nature_snap', '@urban_soul'].map((handle, i) => (
              <div key={i} className="flex justify-between items-center mb-3">
                <span className="text-sm text-[#333]">{handle}</span>
                <button className="bg-[#ff55a5] text-white text-xs px-3 py-1 rounded-full border border-black hover:bg-[#ff89c0] transition">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
