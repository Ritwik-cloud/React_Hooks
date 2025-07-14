import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-9xl font-extrabold text-gray-900 dark:text-white">404</h1>
      <p className="mt-4 text-2xl font-light text-gray-600 dark:text-gray-300 text-center max-w-md">
        Oops! The page you're looking for doesn't exist.
      </p>
      <p className="mt-2 text-gray-500 dark:text-gray-400 text-center max-w-sm">
        You can stay here and soak in the emptiness, or head back to safety.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/"
          className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition">
          <Home className="w-5 h-5" />
          <span>Go Home</span>
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition">
          <ArrowLeft className="w-5 h-5" />
          <span>Go Back</span>
        </button>
      </div>
     
    </div>
)
}
