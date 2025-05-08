'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../lib/auth';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      login(data.user, data.token);
      router.push('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffe3b3] via-[#ffd6ec] to-[#b3ffec] font-mono px-4">
      <div className="bg-white/90 border-2 border-black shadow-[6px_6px_0_rgba(0,0,0,0.8)] rounded-xl p-8 w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center text-[#ff55a5] drop-shadow-[2px_2px_0_rgba(0,0,0,0.4)] mb-8">
          🔐 Welcome Back!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-700" />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 py-2 bg-[#fff9db] border-2 border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-300 text-gray-800 placeholder-gray-600"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-700" />
            <input
              type="password"
              placeholder="Secret Code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 py-2 bg-[#fff9db] border-2 border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-300 text-gray-800 placeholder-gray-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#2c2c2c] text-yellow-200 hover:bg-[#444] py-2 rounded-lg font-bold tracking-wide shadow-[3px_3px_0_rgba(0,0,0,0.8)] transition duration-200"
          >
            🚀 Access the System
          </button>
        </form>
        <p className="text-center text-sm text-gray-800 mt-6">
          New to this realm?{' '}
          <a
            href="/register"
            className="text-black font-semibold underline hover:text-pink-600 transition"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
