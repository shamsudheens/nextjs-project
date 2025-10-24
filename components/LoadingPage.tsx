"use client";

import React from "react";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-yellow-400 text-lg font-semibold tracking-wider animate-pulse">
          Loading Tasks...
        </p>                                                                                                                                                                                                        
      </div>
    </div>
  );
};

export default LoadingPage;
