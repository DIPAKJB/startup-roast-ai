import React from 'react';

export default function LoadingOverlay() {
  const steps = [
    { text: 'Analyzing brand identity...', icon: '🎨', delay: 0 },
    { text: 'Evaluating market potential...', icon: '📈', delay: 400 },
    { text: 'Scoring revenue model...', icon: '💰', delay: 800 },
    { text: 'Assessing competition risk...', icon: '⚔️', delay: 1200 },
    { text: 'Generating roast report...', icon: '🔥', delay: 1600 },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 pb-12">
      <div className="glass-card p-10 text-center relative overflow-hidden">
        {/* Background pulse */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-purple-600/5 animate-pulse" />

        {/* Spinning icon */}
        <div className="relative z-10 mb-8">
          <div className="w-20 h-20 mx-auto relative">
            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full loading-ring" />
            <div className="absolute inset-2 border-4 border-transparent border-t-blue-500 rounded-full loading-ring" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
            <div className="absolute inset-0 flex items-center justify-center text-2xl">🔥</div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2 relative z-10">
          Roasting Your Startup...
        </h3>
        <p className="text-slate-500 mb-8 relative z-10">
          Running deterministic analysis on your startup concept
        </p>

        {/* Step indicators */}
        <div className="relative z-10 space-y-3 text-left max-w-sm mx-auto">
          {steps.map((step, i) => (
            <StepItem key={step.text} step={step} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepItem({ step, index }) {
  const [active, setActive] = React.useState(false);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const t1 = setTimeout(() => setActive(true), step.delay);
    const t2 = setTimeout(() => setDone(true), step.delay + 350);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [step.delay]);

  return (
    <div className={`flex items-center gap-3 transition-all duration-300 ${active ? 'opacity-100' : 'opacity-25'}`}>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
        done ? 'bg-green-500/20 border border-green-500/40' :
        active ? 'bg-purple-500/20 border border-purple-500/40' :
        'bg-[#2d2b3d] border border-[#3d3b52]'
      }`}>
        {done ? (
          <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <span className="text-xs">{active ? '●' : '○'}</span>
        )}
      </div>
      <span className={`text-sm transition-colors ${done ? 'text-green-400' : active ? 'text-white' : 'text-slate-600'}`}>
        <span className="mr-1">{step.icon}</span>
        {step.text}
      </span>
    </div>
  );
}
