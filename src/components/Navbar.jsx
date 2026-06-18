import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#2d2b3d] bg-[#0f0e17]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-lg shadow-purple-500/30">
            🔥
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-white text-base tracking-tight">Startup Roast AI</span>
            <span className="text-[10px] text-slate-500 tracking-widest uppercase">Idea Evaluator</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            id="digital-heroes-nav-btn"
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 
                       text-purple-300 text-sm font-medium px-4 py-2 rounded-lg
                       hover:from-purple-600/30 hover:to-blue-600/30 hover:border-purple-400/50 
                       transition-all duration-200"
          >
            <span>🦸</span>
            Built for Digital Heroes
          </a>
          <button
            onClick={() => document.getElementById('evaluation-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-sm px-5 py-2.5"
            id="start-now-btn"
          >
            Start Now →
          </button>
        </div>
      </div>
    </nav>
  );
}
