'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function CreatorPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '', caption: '', location: '', people: ''
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  if (!user) return null;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please choose an image.');

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('image', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/photos`, {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        router.push('/consumer');
      } else {
        alert('Failed to upload image.');
      }
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8e8d0] text-[#2c1d18] font-mono flex flex-col items-center p-6">
      <header className="w-full flex justify-between items-center mb-10">
        <Link href="/" className="text-5xl font-extrabold text-[#5b3e31] hover:text-[#8c4e3a] drop-shadow-md retro-shadow">
          PhotoShare
        </Link>
        {user && (
          <div className="flex space-x-6">
            {user.role === 'admin' && (
              <Link
                href="/creator"
                className="bg-[#ffcc00] text-[#2c1d18] px-5 py-2 rounded-md border border-[#2c1d18] text-lg font-bold hover:bg-[#ffdb4d] transition duration-200 shadow-md"
              >
                Creator View
              </Link>
            )}
            <Link
              href="/consumer"
              className="bg-[#7ec850] text-[#2c1d18] px-5 py-2 rounded-md border border-[#2c1d18] text-lg font-bold hover:bg-[#92db63] transition duration-200 shadow-md"
            >
              Consumer View
            </Link>
          </div>
        )}
      </header>

      <div className="w-full max-w-2xl bg-[#fff5e1] p-8 rounded-lg shadow-xl border-4 border-dashed border-[#2c1d18]">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-[#5b3e31]">📸 Upload a Retro Photo</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col items-start">
            <label htmlFor="image" className="text-md font-semibold mb-2 text-[#5b3e31]">Choose an Image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-[#5b3e31] file:py-2 file:px-4 file:border file:border-[#5b3e31] file:bg-[#ffefc2] file:text-[#2c1d18] file:rounded-md hover:file:bg-[#ffe18c]"
              required
            />
          </div>

          {['title', 'caption', 'location', 'people'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-md font-semibold mb-1 text-[#5b3e31]">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full p-3 border border-[#5b3e31] rounded-md bg-[#fff5e1] text-[#2c1d18] focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 bg-[#ffcc00] text-[#2c1d18] rounded-md border border-[#2c1d18] font-bold text-lg hover:bg-[#ffe580] transition duration-200"
          >
            🚀 Upload Photo
          </button>
        </form>
      </div>
    </div>
  );
}
