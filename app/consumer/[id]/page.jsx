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
    <main className="min-h-screen bg-gradient-to-br from-[#1e1f26] via-[#2e2f3a] to-[#1f1f1f] text-white px-6 sm:px-10 md:px-20 py-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <Link href="/" className="text-3xl font-black tracking-wide text-[#00eaff] hover:text-[#00ffd0] transition">
          🪩 PhotoVerse
        </Link>
        <div className="flex gap-4">
          {user.role === 'admin' && (
            <Link
              href="/creator"
              className="bg-[#ff9de2] text-black px-4 py-2 rounded-md font-semibold border border-pink-300 hover:bg-[#ffc6ec] transition"
            >
              Creator View
            </Link>
          )}
          <Link
            href="/consumer"
            className="bg-[#98f5e1] text-black px-4 py-2 rounded-md font-semibold border border-teal-200 hover:bg-[#c4fff4] transition"
          >
            Consumer View
          </Link>
        </div>
      </header>

      {/* Title */}
      <section className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#faff72] mb-2">
          Photo Details
        </h1>
        <p className="text-[#cdd6f4]">See full image and community feedback</p>
      </section>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full border-t-4 border-yellow-400 h-12 w-12"></div>
        </div>
      ) : (
        <div className="bg-white/10 border border-gray-700 p-6 rounded-xl shadow-md backdrop-blur-md">
          {photo && (
            <div className="text-center mb-8">
              <img
                src={photo.url}
                alt={photo.caption || 'Uploaded photo'}
                className="max-w-full max-h-[500px] mx-auto rounded-lg shadow-lg"
              />
              {photo.caption && (
                <p className="mt-4 text-lg text-[#f0f0f0] italic">{photo.caption}</p>
              )}
            </div>
          )}

          {/* Comment Box */}
          <div className="mb-8">
            <CommentBox photoId={photoId} onCommentAdded={fetchComments} />
          </div>

          {/* Comments Section */}
          <section>
            <h2 className="text-2xl font-bold text-[#00ffd0] mb-4">Comments</h2>
            {comments.length === 0 ? (
              <p className="text-gray-300">No comments yet. Be the first to leave one!</p>
            ) : (
              <ul className="space-y-4">
                {comments.map((comment, index) => (
                  <li
                    key={index}
                    className="bg-white/5 p-4 rounded-lg border border-gray-600 shadow-inner"
                  >
                    <p className="text-yellow-300 font-semibold">{comment.rating} Stars</p>
                    <p className="text-gray-200 mt-1">{comment.comment}</p>
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
