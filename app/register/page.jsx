'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/auth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, password, role });
      router.push('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffe3b3] via-[#ffd6ec] to-[#b3ffec] font-mono px-6">
      <div className="w-full max-w-md bg-white/90 border-2 border-black shadow-[6px_6px_0_rgba(0,0,0,0.8)] rounded-xl p-8 backdrop-blur-md">
        <h2 className="text-4xl font-extrabold text-center text-[#ff55a5] drop-shadow-[2px_2px_0_rgba(0,0,0,0.4)] mb-8">
          🎉 Join the Club
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              required
              className="w-full p-3 bg-[#fff9db] border-2 border-black rounded-md focus:outline-none focus:ring-4 focus:ring-pink-300 text-gray-800 placeholder-gray-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-800 mb-1">
              Secret Code
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full p-3 bg-[#fff9db] border-2 border-black rounded-md focus:outline-none focus:ring-4 focus:ring-pink-300 text-gray-800 placeholder-gray-500"
            />
          </div>

          {/* Role Selector */}
          <div>
            <label htmlFor="role" className="block text-sm font-bold text-gray-800 mb-1">
              Choose Your Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 bg-[#fff9db] border-2 border-black rounded-md focus:outline-none focus:ring-4 focus:ring-pink-300 text-gray-800"
            >
              <option value="user">🧍 User</option>
              <option value="admin">🕹️ Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#2c2c2c] text-yellow-200 hover:bg-[#444] py-3 rounded-md font-bold tracking-wide text-lg shadow-[3px_3px_0_rgba(0,0,0,0.8)] transition duration-200"
          >
            🚀 Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-800 mt-6">
          Already a member?{' '}
          <a
            href="/login"
            className="text-black font-semibold underline hover:text-pink-600 transition"
          >
            Access your account
          </a>
        </p>
      </div>
    </div>
  );
}
