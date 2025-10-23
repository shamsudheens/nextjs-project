"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-yellow-400">
      <h1 className="text-6xl font-bold mb-4 animate-pulse text-yellow-300">
        404
      </h1>
      <p className="text-xl mb-6 text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-transform transform hover:scale-105"
      >
        Go Home
      </Link>
    </div>
  );
}
