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
    <main className="min-h-screen bg-gradient-to-br from-[#ffe3b3] via-[#ffd6ec] to-[#b3ffec] text-[#2c1d18] font-mono px-6 py-10">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
        <Link href="/" className="text-4xl font-extrabold text-[#292929] drop-shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
          🖼️ Safeer Media Sharing
        </Link>
        <div className="flex gap-4">
          {user.role === 'admin' && (
            <Link
              href="/creator"
              className="bg-[#00f0ff] text-black border-2 border-black px-5 py-2 rounded-xl font-bold shadow-[2px_2px_0_rgba(0,0,0,0.6)] hover:bg-[#38fbff] transition"
            >
              👨‍🎨 Creator View
            </Link>
          )}
          <Link
            href="/consumer"
            className="bg-[#baff63] text-black border-2 border-black px-5 py-2 rounded-xl font-bold shadow-[2px_2px_0_rgba(0,0,0,0.6)] hover:bg-[#d3ff7f] transition"
          >
            🖼️ Consumer View
          </Link>
        </div>
      </header>

      {/* Introduction */}
      <section className="text-center mb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#ff55a5] drop-shadow-[2px_2px_0_rgba(0,0,0,0.4)] mb-2">
          ✨ Explore a Dynamic Visual Platform
        </h1>
        <p className="text-lg text-[#292929]">
          Discover creative content from artists and photographers all around the world.
        </p>
      </section>

      {/* Photo Gallery or Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full border-4 border-black border-t-transparent h-12 w-12"></div>
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="rounded-xl overflow-hidden bg-white/90 border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,0.5)] p-4 hover:scale-[1.02] transition duration-300"
            >
              <PhotoCard photo={photo} />
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
