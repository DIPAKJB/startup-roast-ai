import React, { useEffect, useRef, useState } from 'react';

const scoreColors = {
  high: {
    bar: 'from-green-500 to-emerald-400',
    glow: 'shadow-green-500/30',
    text: 'text-green-400',
    ring: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  medium: {
    bar: 'from-blue-500 to-cyan-400',
    glow: 'shadow-blue-500/30',
    text: 'text-blue-400',
    ring: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  low: {
    bar: 'from-yellow-500 to-orange-400',
    glow: 'shadow-yellow-500/30',
    text: 'text-yellow-400',
    ring: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
  },
  poor: {
    bar: 'from-red-500 to-rose-400',
    glow: 'shadow-red-500/30',
    text: 'text-red-400',
    ring: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
};

function getColorTier(score) {
  if (score >= 70) return 'high';
  if (score >= 55) return 'medium';
  if (score >= 40) return 'low';
  return 'poor';
}

function CircularProgress({ score, size = 88 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const tier = getColorTier(animatedScore);
  const colors = scoreColors[tier];

  useEffect(() => {
    let start = null;
    const duration = 1200;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [score]);

  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute inset-0 -rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2d2b3d"
          strokeWidth="7"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-100"
          style={{
            stroke: animatedScore >= 70 ? '#22c55e' : animatedScore >= 55 ? '#3b82f6' : animatedScore >= 40 ? '#eab308' : '#ef4444',
          }}
        />
      </svg>
      <span className={`text-xl font-black ${colors.text}`}>{animatedScore}</span>
    </div>
  );
}

export default function ScoreCard({ title, icon, score, grade, label, summary, details, delay = 0 }) {
  const tier = getColorTier(score);
  const colors = scoreColors[tier];
  const [barWidth, setBarWidth] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBarWidth(score);
    }, delay + 200);
    return () => clearTimeout(timer);
  }, [score, delay]);

  return (
    <div
      ref={cardRef}
      className={`glass-card p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:${colors.glow} cursor-pointer`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center text-lg`}>
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-white text-base">{title}</h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
              {label}
            </span>
          </div>
        </div>
        <CircularProgress score={score} />
      </div>

      {/* Score Bar */}
      <div className="score-bar-track mb-3">
        <div
          className={`h-full bg-gradient-to-r ${colors.bar} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${barWidth}%` }}
        />
      </div>

      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-slate-500">0</span>
        <span className={`text-xs font-bold ${colors.text}`}>Grade: {grade}</span>
        <span className="text-xs text-slate-500">100</span>
      </div>

      {/* Summary */}
      <p className="text-slate-400 text-sm leading-relaxed">{summary}</p>

      {/* Expandable Details */}
      {details && details.length > 0 && (
        <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-96 mt-4' : 'max-h-0'}`}>
          <div className={`border-t border-[#2d2b3d] pt-4 space-y-2`}>
            {details.map((detail, i) => (
              <div key={i} className="flex items-start gap-2">
                <svg className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${colors.text}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-slate-500 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <button className={`mt-3 text-xs ${colors.text} flex items-center gap-1 hover:opacity-80`}>
        {expanded ? '▲ Less detail' : '▼ More detail'}
      </button>
    </div>
  );
}
