import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-pink-100 text-gray-800 border-b-2 border-pink-300 py-4 shadow-lg font-mono">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4">
        {/* Left Side: App Title */}
        <h1 className="text-2xl font-bold tracking-wide retro-shadow text-pink-700">
          🎮 Safeer Media App
        </h1>

        {/* Right Side: Navigation */}
        <div className="space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 bg-yellow-200 hover:bg-yellow-300 border border-yellow-500 rounded-lg text-sm font-semibold shadow transition duration-200"
          >
            🔐 Login
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 bg-green-200 hover:bg-green-300 border border-green-500 rounded-lg text-sm font-semibold shadow transition duration-200"
          >
            📝 Register
          </Link>
        </div>
      </div>
    </header>
  );
}

