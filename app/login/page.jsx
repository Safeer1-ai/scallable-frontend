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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-yellow-200 to-teal-200 font-mono">
      <div className="bg-white/80 backdrop-blur-sm border-2 border-black shadow-[5px_5px_0_rgba(0,0,0,0.9)] rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6 tracking-wider">
          🚀 Retro Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-600" />
            <input
              type="email"
              placeholder="Your Retro Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 py-2 bg-yellow-50 border-2 border-black rounded-md focus:outline-none focus:ring-4 focus:ring-pink-300 text-gray-800 placeholder-gray-500"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-600" />
            <input
              type="password"
              placeholder="Secret Code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 py-2 bg-yellow-50 border-2 border-black rounded-md focus:outline-none focus:ring-4 focus:ring-pink-300 text-gray-800 placeholder-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-yellow-200 hover:bg-gray-800 py-2 rounded-md font-bold tracking-wide shadow-[2px_2px_0_rgba(0,0,0,0.8)] transition-all duration-200"
          >
            Access the System
          </button>
        </form>
        <p className="text-center text-sm text-gray-700 mt-4">
          New to this realm?{' '}
          <a href="/register" className="text-black underline hover:text-pink-600 transition">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}