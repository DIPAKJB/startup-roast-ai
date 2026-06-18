import React from 'react';

export default function StartupOverview({ formData, competition }) {
  const overviewItems = [
    { label: 'Startup Name', value: formData.startupName, icon: '🏷️' },
    { label: 'Business Idea', value: formData.businessIdea, icon: '💡' },
    { label: 'Target Audience', value: formData.targetAudience, icon: '🎯' },
    { label: 'Revenue Model', value: formData.revenueModel, icon: '💰' },
  ];

  return (
    <div className="glass-card p-6 mb-6">
      <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
        <span className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center text-sm">📋</span>
        Startup Overview
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {overviewItems.map((item) => (
          <div key={item.label} className="bg-[#13121f] rounded-xl p-4 border border-[#2d2b3d]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{item.icon}</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{item.label}</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Competition detail */}
      <div className={`mt-4 p-4 rounded-xl border ${competition.badge}`}>
        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0">{competition.icon}</span>
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: competition.risk === 'High' ? '#f87171' : competition.risk === 'Medium' ? '#fbbf24' : '#4ade80' }}>
              Competition Risk: {competition.risk}
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">{competition.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
