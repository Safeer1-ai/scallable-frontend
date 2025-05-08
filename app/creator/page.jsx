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
    <main className="min-h-screen bg-gradient-to-br from-[#ffe3b3] via-[#ffd6ec] to-[#b3ffec] text-gray-900 font-mono p-6 flex flex-col items-center">
      
      {/* Header */}
      <header className="w-full max-w-6xl mb-10 flex justify-between items-center">
        <Link href="/" className="text-4xl font-extrabold text-[#292929] drop-shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
          🎨 Safeer Media Sharing Application
        </Link>
        <div className="flex gap-4">
          <Link
            href="/creator"
            className="bg-[#00f0ff] text-black border-2 border-black px-5 py-2 rounded-xl font-bold shadow-[2px_2px_0_rgba(0,0,0,0.6)] hover:bg-[#38fbff] transition"
          >
            👨‍🎨 Creator View
          </Link>
          <Link
            href="/consumer"
            className="bg-[#baff63] text-black border-2 border-black px-5 py-2 rounded-xl font-bold shadow-[2px_2px_0_rgba(0,0,0,0.6)] hover:bg-[#d3ff7f] transition"
          >
            🖼️ Viewer Mode
          </Link>
        </div>
      </header>

      {/* Upload Form Card */}
      <section className="w-full max-w-3xl bg-white/90 p-10 rounded-3xl shadow-2xl border-4 border-black">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-[#292929] drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
          📸 Upload Your Masterpiece
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="image" className="block mb-2 font-bold text-[#292929]">
              Select Image File
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full bg-[#fff] p-2 rounded-md border-2 border-black file:bg-[#ffe680] file:border file:border-black file:rounded-md file:px-4 file:py-2 hover:file:bg-[#fff0a6]"
            />
          </div>

          {['title', 'caption', 'location', 'people'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block mb-1 font-bold text-[#292929]">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                type="text"
                value={formData[field]}
                onChange={handleChange}
                required
                placeholder={`Enter ${field}`}
                className="w-full p-3 border-2 border-black rounded-md bg-[#fff5e1] text-[#292929] focus:outline-none focus:ring-2 focus:ring-[#00f0ff]"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-[#ffcc00] hover:bg-[#ffe580] text-black border-2 border-black px-6 py-3 rounded-xl font-bold shadow-[2px_2px_0_rgba(0,0,0,0.6)] transition duration-300"
          >
            🚀 Upload Photo
          </button>
        </form>
      </section>
    </main>
  );
}
