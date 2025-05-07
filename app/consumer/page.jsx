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
    <main className="min-h-screen bg-gradient-to-br from-[#1e1f26] via-[#2e2f3a] to-[#1f1f1f] text-white px-6 sm:px-10 md:px-20 py-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <Link href="/" className="text-3xl font-black tracking-wide text-[#00eaff] hover:text-[#00ffd0] transition duration-300">
          🪩 PhotoVerse
        </Link>
        <div className="flex gap-4">
          {user.role === 'admin' && (
            <Link
              href="/creator"
              className="bg-[#ff9de2] text-black px-4 py-2 rounded-md border border-pink-300 font-bold hover:bg-[#ffc6ec] shadow-md transition"
            >
              Creator View
            </Link>
          )}
          <Link
            href="/consumer"
            className="bg-[#98f5e1] text-black px-4 py-2 rounded-md border border-teal-200 font-bold hover:bg-[#c4fff4] shadow-md transition"
          >
            Consumer View
          </Link>
        </div>
      </header>

      {/* Introduction */}
      <section className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#faff72] drop-shadow-lg mb-2">
          Explore the Visual Universe
        </h1>
        <p className="text-md sm:text-lg text-[#cdd6f4]">
          Discover curated moments shared by creators around the world.
        </p>
      </section>

      {/* Loader or Photo Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full border-t-4 border-yellow-400 border-opacity-50 h-12 w-12"></div>
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-gray-700 shadow-lg p-4 hover:scale-[1.02] transition duration-300"
            >
              <PhotoCard photo={photo} />
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
