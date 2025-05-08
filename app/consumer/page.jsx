'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@AuthContext/context/AuthContext';
import CommentBox from '../components/CommentBox';
import Link from 'next/link';

export default function PhotoDetailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const photoId = params?.id;

  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  const fetchPhotoAndComments = async () => {
    setLoading(true);
    try {
      const [photoRes, commentsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/photos/${photoId}`),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/photos/${photoId}/comments`)
      ]);
      setPhoto(await photoRes.json());
      setComments(await commentsRes.json());
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/photos/${photoId}/comments`);
      setComments(await res.json());
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    if (user && photoId) fetchPhotoAndComments();
  }, [photoId, user]);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#ffe3b3] via-[#ffd6ec] to-[#b3ffec] text-[#2c1d18] font-mono px-6 py-10">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-10 max-w-7xl mx-auto">
        <Link href="/" className="text-4xl font-extrabold text-[#292929] drop-shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
          🖼️ Safeer Media App
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

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        
        {/* Left: Fake Navigation */}
        <aside className="hidden md:block space-y-4 bg-white/80 p-6 border-2 border-black rounded-xl shadow-[3px_3px_0_rgba(0,0,0,0.6)]">
          <h3 className="text-xl font-bold text-[#ff55a5] mb-4">🔗 Explore</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-pink-600">🏠 Home</a></li>
            <li><a href="#" className="hover:text-pink-600">🔥 Trending</a></li>
            <li><a href="#" className="hover:text-pink-600">📷 My Posts</a></li>
            <li><a href="#" className="hover:text-pink-600">❤️ Likes</a></li>
            <li><a href="#" className="hover:text-pink-600">⚙️ Settings</a></li>
          </ul>
        </aside>

        {/* Center: Main Content */}
        <section className="col-span-1 md:col-span-1">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full border-4 border-black border-t-transparent h-12 w-12"></div>
            </div>
          ) : (
            <div className="bg-white/90 border-2 border-black p-6 rounded-xl shadow-[3px_3px_0_rgba(0,0,0,0.4)]">
              {photo && (
                <div className="text-center mb-8">
                  <img
                    src={photo.url}
                    alt={photo.caption || 'Uploaded photo'}
                    className="max-w-full max-h-[500px] mx-auto rounded-lg border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,0.4)]"
                  />
                  {photo.caption && (
                    <p className="mt-4 text-lg text-[#444] italic">{photo.caption}</p>
                  )}
                </div>
              )}

              {/* CommentBox */}
              <div className="mb-6">
                <CommentBox photoId={photoId} onCommentAdded={fetchComments} />
              </div>

              {/* Comments */}
              <h2 className="text-2xl font-bold text-[#00c9a7] mb-4">💬 Comments</h2>
              {comments.length === 0 ? (
                <p className="text-gray-600">No comments yet. Be the first!</p>
              ) : (
                <ul className="space-y-4">
                  {comments.map((comment, i) => (
                    <li
                      key={i}
                      className="bg-[#fff4] p-4 rounded-lg border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,0.4)]"
                    >
                      <p className="text-yellow-600 font-semibold">{comment.rating} ★</p>
                      <p className="text-black mt-1">{comment.comment}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>

        {/* Right: Follow Section */}
        <aside className="hidden md:block bg-white/80 p-6 border-2 border-black rounded-xl shadow-[3px_3px_0_rgba(0,0,0,0.6)] space-y-6">
          <div>
            <h3 className="text-xl font-bold text-[#ff55a5] mb-2">👤 Photographer</h3>
            <p className="text-gray-800">safeer_uploader_01</p>
            <button className="mt-4 bg-[#ff55a5] hover:bg-[#ff85c1] text-white font-bold py-2 px-4 rounded-full border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,0.5)] transition-all">
              ➕ Follow
            </button>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#00c9a7] mb-2">📊 Stats</h3>
            <p className="text-gray-700">124 photos</p>
            <p className="text-gray-700">980 followers</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
