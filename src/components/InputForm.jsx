import React from 'react';
import { EXAMPLE_STARTUP } from '../utils/scoringEngine';

const fields = [
  {
    id: 'startupName',
    label: 'Startup Name',
    placeholder: 'e.g. NovaMind AI, FluxPay, QuickLaunch',
    type: 'input',
    icon: '🏷️',
    hint: 'Short, memorable names (4–10 chars) score higher.',
  },
  {
    id: 'businessIdea',
    label: 'Business Idea',
    placeholder: 'Describe what your startup does, the problem it solves, and how it works...',
    type: 'textarea',
    icon: '💡',
    rows: 4,
    hint: 'Be specific — mention the problem, solution, and technology used.',
  },
  {
    id: 'targetAudience',
    label: 'Target Audience',
    placeholder: 'e.g. Remote workers aged 25–40 at mid-size tech companies...',
    type: 'textarea',
    icon: '🎯',
    rows: 2,
    hint: 'Include demographics, job role, location, or company size for better scores.',
  },
  {
    id: 'revenueModel',
    label: 'Revenue Model',
    placeholder: 'e.g. SaaS subscription at $29/month, freemium with premium upgrade...',
    type: 'textarea',
    icon: '💰',
    rows: 2,
    hint: 'Include pricing, model type (subscription/marketplace/ads), and customer segment.',
  },
];

export default function InputForm({ formData, onChange, onSubmit, onReset, isLoading }) {
  const handleExample = () => {
    Object.entries(EXAMPLE_STARTUP).forEach(([key, value]) => {
      onChange({ target: { name: key, value } });
    });
  };

  const isFormEmpty = !formData.startupName && !formData.businessIdea;

  return (
    <section className="max-w-3xl mx-auto px-4 pb-8" id="evaluation-form">
      <div className="glass-card p-8 shadow-2xl glow-purple">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Your Startup Details</h2>
            <p className="text-slate-500 text-sm mt-1">Fill in all fields for the most accurate evaluation</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              id="example-btn"
              onClick={handleExample}
              className="btn-secondary text-sm flex items-center gap-2"
              title="Load example startup data"
            >
              <span>⚡</span>
              <span className="hidden sm:inline">Example</span>
            </button>
            <button
              type="button"
              id="reset-btn"
              onClick={onReset}
              className="btn-secondary text-sm flex items-center gap-2"
              title="Reset form"
            >
              <span>↺</span>
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={onSubmit} className="space-y-6">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label
                htmlFor={field.id}
                className="flex items-center gap-2 text-sm font-semibold text-slate-300"
              >
                <span>{field.icon}</span>
                {field.label}
                <span className="text-red-400 ml-0.5">*</span>
              </label>

              {field.type === 'input' ? (
                <input
                  type="text"
                  id={field.id}
                  name={field.id}
                  value={formData[field.id] || ''}
                  onChange={onChange}
                  placeholder={field.placeholder}
                  className="input-field"
                  required
                  autoComplete="off"
                />
              ) : (
                <textarea
                  id={field.id}
                  name={field.id}
                  value={formData[field.id] || ''}
                  onChange={onChange}
                  placeholder={field.placeholder}
                  rows={field.rows}
                  className="input-field resize-none"
                  required
                />
              )}

              <p className="text-xs text-slate-600 flex items-center gap-1.5">
                <svg className="w-3 h-3 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {field.hint}
              </p>
            </div>
          ))}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              id="roast-btn"
              disabled={isLoading || isFormEmpty}
              className="btn-primary w-full text-lg flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <svg className="loading-ring w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyzing Your Startup...
                </>
              ) : (
                <>
                  <span className="text-xl">🔥</span>
                  Roast My Startup
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
