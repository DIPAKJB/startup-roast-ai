import React from 'react';
import ScoreCard from './ScoreCard';
import OverallScoreHero from './OverallScoreHero';
import InsightPanel from './InsightPanel';
import StartupOverview from './StartupOverview';

export default function RoastReport({ results, formData }) {
  const {
    brandScore,
    marketScore,
    revenueScore,
    competition,
    overallScore,
    strengths,
    weaknesses,
    suggestions,
  } = results;

  const scoreCards = [
    {
      title: 'Brand Score',
      icon: '🎨',
      score: brandScore.score,
      grade: brandScore.grade,
      label: brandScore.label,
      summary: brandScore.summary,
      details: brandScore.details,
      delay: 0,
    },
    {
      title: 'Market Potential',
      icon: '📈',
      score: marketScore.score,
      grade: marketScore.grade,
      label: marketScore.label,
      summary: marketScore.summary,
      details: marketScore.details,
      delay: 100,
    },
    {
      title: 'Revenue Potential',
      icon: '💰',
      score: revenueScore.score,
      grade: revenueScore.grade,
      label: revenueScore.label,
      summary: revenueScore.summary,
      details: revenueScore.details,
      delay: 200,
    },
  ];

  return (
    <section id="roast-report" className="max-w-6xl mx-auto px-4 pb-20 animate-fade-in">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-4">
          <span className="text-purple-400 text-sm font-medium">🔥 Detailed Roast Report</span>
        </div>
        <h2 className="text-4xl font-black text-white">
          Your Startup's Full Evaluation
        </h2>
        <p className="text-slate-500 mt-2">Scroll down to explore every section of your analysis</p>
      </div>

      {/* Overall Score Hero */}
      <OverallScoreHero
        overallScore={overallScore}
        formData={formData}
        competition={competition}
      />

      {/* Score Dashboard */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          <span className="w-7 h-7 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">📊</span>
          Score Dashboard
          <span className="text-slate-600 text-sm font-normal">(click any card for details)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {scoreCards.map((card) => (
            <ScoreCard key={card.title} {...card} />
          ))}
        </div>
      </div>

      {/* Two-column layout: Overview + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Startup Overview */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center text-sm">📋</span>
            Startup Summary
          </h3>
          <StartupOverview formData={formData} competition={competition} />
        </div>

        {/* Right: Insights */}
        <div className="lg:col-span-3">
          <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <span className="w-7 h-7 bg-green-500/20 rounded-lg flex items-center justify-center text-sm">💡</span>
            Strengths, Weaknesses & Suggestions
          </h3>
          <InsightPanel
            strengths={strengths}
            weaknesses={weaknesses}
            suggestions={suggestions}
          />
        </div>
      </div>

      {/* Revenue Model Detail */}
      {revenueScore.modelType && (
        <div className="mt-6 glass-card p-6 border border-purple-500/20">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Revenue Model Analysis: {revenueScore.modelType}
          </h3>
          <p className="text-slate-400 leading-relaxed">{revenueScore.explanation}</p>
        </div>
      )}

      {/* Footer CTA */}
      <div className="mt-10 text-center p-8 glass-card border border-purple-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-purple-600/5" />
        <div className="relative z-10">
          <p className="text-slate-400 text-sm mb-3">Not happy with your score?</p>
          <p className="text-white font-bold text-xl mb-4">
            Update your details above and{' '}
            <span className="gradient-text">keep improving!</span>
          </p>
          <button
            onClick={() => document.getElementById('evaluation-form').scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary"
          >
            ↑ Re-evaluate My Startup
          </button>
        </div>
      </div>
    </section>
  );
}
