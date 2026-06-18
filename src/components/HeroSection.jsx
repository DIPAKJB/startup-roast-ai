import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 text-center overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-purple-600/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
          <span className="text-purple-400 text-sm font-medium">🔥 Free Startup Evaluation Tool</span>
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-xs">Live</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight animate-slide-up">
          Get{' '}
          <span className="gradient-text text-glow">Honest Feedback</span>
          <br />
          on Your Startup Idea
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up-delay-1">
          Evaluate your startup concept, identify risks, and discover opportunities{' '}
          <span className="text-slate-300">before you launch.</span>
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 animate-slide-up-delay-2">
          {[
            { value: '5', label: 'Key Metrics Evaluated', icon: '📊' },
            { value: '100%', label: 'Browser-Based', icon: '🔒' },
            { value: '0', label: 'External APIs Used', icon: '⚡' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 text-slate-600 animate-bounce">
          <span className="text-xs uppercase tracking-widest">Fill in your details below</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
