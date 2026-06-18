import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InputForm from './components/InputForm';
import RoastReport from './components/RoastReport';
import LoadingOverlay from './components/LoadingOverlay';
import Footer from './components/Footer';
import { evaluateStartup } from './utils/scoringEngine';

const EMPTY_FORM = {
  startupName: '',
  businessIdea: '',
  targetAudience: '',
  revenueModel: '',
};

export default function App() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const reportRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(EMPTY_FORM);
    setResults(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    if (!formData.startupName.trim() || !formData.businessIdea.trim() ||
        !formData.targetAudience.trim() || !formData.revenueModel.trim()) {
      return;
    }

    setIsLoading(true);
    setResults(null);

    // Simulate brief analysis delay for UX
    setTimeout(() => {
      try {
        const evaluation = evaluateStartup(formData);
        setResults(evaluation);
      } catch (err) {
        console.error('Evaluation error:', err);
      } finally {
        setIsLoading(false);
        // Scroll to report after render
        setTimeout(() => {
          reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#0f0e17] noise-bg">
      <Navbar />

      <main className="pt-16">
        {/* Hero */}
        <HeroSection />

        {/* Input Form */}
        <InputForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onReset={handleReset}
          isLoading={isLoading}
        />

        {/* Loading State */}
        {isLoading && <LoadingOverlay />}

        {/* Results */}
        {results && !isLoading && (
          <div ref={reportRef}>
            <RoastReport results={results} formData={formData} />
          </div>
        )}

        {/* Empty state hint */}
        {!results && !isLoading && (
          <div className="max-w-3xl mx-auto px-4 pb-20 text-center">
            <div className="flex flex-wrap justify-center gap-3">
              {[
                '🎯 Score your brand name',
                '📊 Evaluate market size',
                '💰 Analyze revenue model',
                '⚔️ Assess competition',
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-slate-600 bg-[#1a1827] border border-[#2d2b3d] px-4 py-2 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
