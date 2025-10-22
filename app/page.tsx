import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-yellow-400">
      <h1 className="text-5xl font-extrabold mb-10 text-yellow-400 neon-glow">
        ⚡ Welcome to Task Manager ⚡
      </h1>

      <Link
        href="/tasks"
        className="px-8 py-3 text-xl font-semibold border-2 border-yellow-400 rounded-lg 
                   text-yellow-400 hover:bg-yellow-400 hover:text-black 
                   transition duration-300 ease-in-out 
                   shadow-[0_0_15px_rgba(255,255,0,0.8)] hover:shadow-[0_0_25px_rgba(255,255,0,1)]"
      >
        See All Tasks
      </Link>
    </div>
  );
};

export default Page;
