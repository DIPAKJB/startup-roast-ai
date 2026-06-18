import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2d2b3d] bg-[#0d0c18] mt-8">
      {/* Top section */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-purple-500/30">
                🔥
              </div>
              <div>
                <div className="font-black text-white text-lg">Startup Roast AI</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">Idea Evaluation Tool</div>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              A free, browser-based tool that helps founders evaluate their startup ideas 
              with honest, data-driven feedback — no sign-up required.
            </p>
            <div className="flex gap-3">
              {['🔒 Privacy-First', '⚡ No Backend', '🆓 Always Free'].map(tag => (
                <span key={tag} className="text-xs bg-[#1a1827] border border-[#2d2b3d] text-slate-500 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* What We Evaluate */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">What We Evaluate</h4>
            <ul className="space-y-2.5">
              {[
                { icon: '🎨', label: 'Brand Identity Score' },
                { icon: '📈', label: 'Market Potential Score' },
                { icon: '💰', label: 'Revenue Model Score' },
                { icon: '⚔️', label: 'Competition Risk Level' },
                { icon: '🏆', label: 'Overall Startup Score' },
              ].map(item => (
                <li key={item.label} className="flex items-center gap-2.5 text-slate-400 text-sm">
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Creator + CTA */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Created By</h4>
            <div className="glass-card p-4 mb-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  DB
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Dipak Baviskar</p>
                  <p className="text-slate-500 text-xs">Founder & Digital Strategist</p>
                </div>
              </div>
              <a
                href="mailto:YOUR_EMAIL"
                id="contact-email-link"
                className="flex items-center gap-2 text-purple-400 text-sm hover:text-purple-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                YOUR_EMAIL
              </a>
            </div>

            {/* Digital Heroes CTA — Mandatory Button */}
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              id="digital-heroes-footer-btn"
              className="group relative w-full flex items-center justify-center gap-3 overflow-hidden
                         bg-gradient-to-r from-purple-600 to-blue-600 
                         text-white font-bold text-sm px-6 py-3.5 rounded-xl
                         hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02]
                         active:scale-95 transition-all duration-300"
            >
              {/* Shimmer */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="text-lg">🦸</span>
              <span className="relative z-10">Built for Digital Heroes</span>
              <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2d2b3d]">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            © {currentYear} Startup Roast AI · Built by{' '}
            <span className="text-purple-500">Dipak Baviskar</span>
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span>🔒 No data stored</span>
            <span>·</span>
            <span>⚡ 100% client-side</span>
            <span>·</span>
            <span>🆓 Free forever</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
