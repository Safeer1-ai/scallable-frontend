'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { registerUser } from '@/lib/auth'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await registerUser({ email, password, role })
      router.push('/login')
    } catch (err) {
      alert('Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-200 via-yellow-100 to-pink-300 font-mono p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/80 border-2 border-black shadow-[5px_5px_0_rgba(0,0,0,0.9)] backdrop-blur-sm rounded-xl p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 tracking-wide">
          🎉 Join the Club
        </h2>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
            Your Retro Email
          </label>
          <input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="example@domain.com" 
            required
            className="w-full p-3 bg-yellow-50 border-2 border-black rounded-md focus:outline-none focus:ring-4 focus:ring-pink-300 text-gray-800 placeholder-gray-500"
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-1">
            Secret Code
          </label>
          <input 
            id="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••" 
            required
            className="w-full p-3 bg-yellow-50 border-2 border-black rounded-md focus:outline-none focus:ring-4 focus:ring-pink-300 text-gray-800 placeholder-gray-500"
          />
        </div>

        {/* Role Select */}
        <div>
          <label htmlFor="role" className="block text-sm font-bold text-gray-700 mb-1">
            Choose Your Role
          </label>
          <select 
            id="role" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            className="w-full p-3 bg-yellow-50 border-2 border-black rounded-md focus:outline-none focus:ring-4 focus:ring-pink-300 text-gray-800"
          >
            <option value="user">🧍 User</option>
            <option value="admin">🕹️ Admin</option>
          </select>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-black text-yellow-200 hover:bg-gray-800 py-3 rounded-md font-bold text-lg tracking-wide shadow-[2px_2px_0_rgba(0,0,0,0.8)] transition-all duration-200"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-gray-700 mt-4">
          Already a member?{' '}
          <a href="/login" className="text-black underline hover:text-pink-600 transition">
            Access your account
          </a>
        </p>
      </form>
    </div>
  )
}
