import React from 'react';

function InsightList({ title, icon, items, type }) {
  const styles = {
    strength: {
      container: 'border-green-500/20 bg-green-500/5',
      header: 'text-green-400',
      headerBg: 'bg-green-500/10 border-green-500/20',
      icon: '💪',
      dot: 'bg-green-500',
    },
    weakness: {
      container: 'border-red-500/20 bg-red-500/5',
      header: 'text-red-400',
      headerBg: 'bg-red-500/10 border-red-500/20',
      icon: '⚠️',
      dot: 'bg-red-500',
    },
    suggestion: {
      container: 'border-blue-500/20 bg-blue-500/5',
      header: 'text-blue-400',
      headerBg: 'bg-blue-500/10 border-blue-500/20',
      icon: '🚀',
      dot: 'bg-blue-500',
    },
  };

  const s = styles[type];

  return (
    <div className={`glass-card border ${s.container} overflow-hidden`}>
      <div className={`px-6 py-4 border-b border-[#2d2b3d] flex items-center gap-3`}>
        <div className={`w-8 h-8 rounded-lg ${s.headerBg} border flex items-center justify-center text-base`}>
          {s.icon}
        </div>
        <h3 className={`font-bold text-base ${s.header}`}>{title}</h3>
      </div>
      <div className="p-6 space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`w-2 h-2 rounded-full ${s.dot} flex-shrink-0 mt-2 group-hover:scale-125 transition-transform`} />
            <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InsightPanel({ strengths, weaknesses, suggestions }) {
  return (
    <div className="space-y-6">
      <InsightList
        title="Key Strengths"
        type="strength"
        items={strengths}
      />
      <InsightList
        title="Critical Weaknesses"
        type="weakness"
        items={weaknesses}
      />
      <InsightList
        title="Actionable Improvement Suggestions"
        type="suggestion"
        items={suggestions}
      />
    </div>
  );
}
