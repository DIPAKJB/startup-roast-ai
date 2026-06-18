import React, { useEffect, useState } from 'react';

export default function OverallScoreHero({ overallScore, formData, competition }) {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let start = null;
    const duration = 1500;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayScore(Math.round(eased * overallScore.score));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [overallScore.score]);

  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const scoreColor =
    overallScore.score >= 80 ? '#22c55e' :
    overallScore.score >= 65 ? '#3b82f6' :
    overallScore.score >= 50 ? '#eab308' :
    overallScore.score >= 35 ? '#f97316' : '#ef4444';

  return (
    <div className="glass-card p-8 mb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-600/10 to-transparent rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-600/10 to-transparent rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
        {/* Circular Score */}
        <div className="flex-shrink-0 flex flex-col items-center gap-3">
          <div className="relative">
            <svg className="-rotate-90" width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r={radius} fill="none" stroke="#2d2b3d" strokeWidth="10" />
              <circle
                cx="80" cy="80" r={radius} fill="none"
                strokeWidth="10" strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ stroke: scoreColor, transition: 'stroke-dashoffset 0.1s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black" style={{ color: scoreColor }}>{displayScore}</span>
              <span className="text-slate-500 text-sm font-medium">/100</span>
            </div>
          </div>
          <span className="text-slate-400 text-sm font-medium">Overall Score</span>
        </div>

        {/* Details */}
        <div className="flex-1 text-center lg:text-left">
          <div className="text-slate-500 text-sm font-medium uppercase tracking-widest mb-2">
            🔥 Roast Complete
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
            {formData.startupName}
          </h2>
          <p className={`text-xl font-bold mb-4 ${overallScore.verdictColor}`}>
            {overallScore.verdict}
          </p>
          <p className="text-slate-400 leading-relaxed mb-6 max-w-xl">
            Based on brand strength, market potential, revenue model, and competitive landscape analysis. 
            Click any score card below to see detailed breakdown.
          </p>

          {/* Mini score bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Overall Startup Health</span>
              <span className="font-bold" style={{ color: scoreColor }}>{overallScore.grade} – {overallScore.label}</span>
            </div>
            <div className="w-full h-2 bg-[#2d2b3d] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1500"
                style={{ width: `${displayScore}%`, backgroundColor: scoreColor }}
              />
            </div>
          </div>
        </div>

        {/* Competition Badge */}
        <div className="flex-shrink-0 text-center">
          <div className="text-slate-500 text-xs uppercase tracking-widest mb-2">Competition Risk</div>
          <div className={`inline-flex flex-col items-center gap-1 px-6 py-4 rounded-2xl border ${competition.badge}`}>
            <span className="text-3xl">{competition.icon}</span>
            <span className="font-black text-lg">{competition.risk}</span>
            <span className="text-xs opacity-75">Risk Level</span>
          </div>
        </div>
      </div>
    </div>
  );
}
