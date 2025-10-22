import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-5xl font-extrabold text-neon-blue mb-8 drop-shadow-neon">
        Welcome to Task Manager
      </h1>
      <Link
        href=""
        className="px-6 py-3 text-xl font-semibold border-2 border-neon-pink rounded-lg text-neon-pink hover:bg-neon-pink hover:text-black transition duration-300 drop-shadow-neon"
      >
        See All Tasks
      </Link>
    </div>
  );
};

export default Page;
