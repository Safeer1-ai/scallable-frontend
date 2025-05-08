'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import CommentBox from '../../components/CommentBox';
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
      <header className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
        <Link href="/" className="text-4xl font-extrabold text-[#292929] drop-shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
          🖼️ Safeer Media Sharing Application
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

      {/* Title */}
      <section className="text-center mb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#ff55a5] drop-shadow-[2px_2px_0_rgba(0,0,0,0.4)] mb-2">
          📸 Media Details
        </h1>
        <p className="text-lg text-[#292929]">See the full image and community feedback.</p>
      </section>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full border-4 border-black border-t-transparent h-12 w-12"></div>
        </div>
      ) : (
        <div className="bg-white/90 border-2 border-black p-6 rounded-xl shadow-[2px_2px_0_rgba(0,0,0,0.4)] max-w-4xl mx-auto">
          {photo && (
            <div className="text-center mb-8">
              <img
                src={photo.url}
                alt={photo.caption || 'Uploaded photo'}
                className="max-w-full max-h-[500px] mx-auto rounded-lg shadow-[3px_3px_0_rgba(0,0,0,0.4)] border-2 border-black"
              />
              {photo.caption && (
                <p className="mt-4 text-lg text-[#444] italic">{photo.caption}</p>
              )}
            </div>
          )}

          {/* Comment Box */}
          <div className="mb-8">
            <CommentBox photoId={photoId} onCommentAdded={fetchComments} />
          </div>

          {/* Comments Section */}
          <section>
            <h2 className="text-2xl font-bold text-[#00c9a7] mb-4">💬 Comments</h2>
            {comments.length === 0 ? (
              <p className="text-gray-600">No comments yet. Be the first to leave one!</p>
            ) : (
              <ul className="space-y-4">
                {comments.map((comment, index) => (
                  <li
                    key={index}
                    className="bg-[#fff4] p-4 rounded-lg border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,0.4)]"
                  >
                    <p className="text-yellow-600 font-semibold">{comment.rating} ★</p>
                    <p className="text-black mt-1">{comment.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </main>
  );
}