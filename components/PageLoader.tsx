import React from "react";
import Logo from '../pages/assests/logo.png';

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">

        {/* Logo with rotating ring */}
        <div className="relative flex items-center justify-center w-28 h-28">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-gray-100" />
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-600 border-r-blue-600 animate-spin" />

          {/* Logo */}
          <img
            src={Logo}
            alt="Surya Motors"
            className="w-16 h-auto relative z-10 animate-[fadeScale_1.8s_ease-in-out_infinite]"
          />
        </div>

        {/* Brand name */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-bold tracking-[0.15em] text-gray-800 uppercase">
            Surya Motors
          </p>
          <p className="text-xs text-gray-400 tracking-wide">
            Loading your experience
          </p>
        </div>

        {/* Loading indicator */}
        <div className="w-40 h-1 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-loading-bar" />
        </div>

      </div>
    </div>
  );
};

export default PageLoader;