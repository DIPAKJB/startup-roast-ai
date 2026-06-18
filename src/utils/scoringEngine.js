/**
 * Startup Roast AI – Deterministic Scoring Engine
 * All logic runs locally in the browser. No external APIs.
 */

// ─── Keyword Libraries ───────────────────────────────────────────────────────

const STRONG_BRAND_WORDS = [
  'ai', 'tech', 'hub', 'lab', 'cloud', 'flux', 'nova', 'nexus', 'zen',
  'spark', 'leap', 'wave', 'bolt', 'pulse', 'snap', 'flow', 'core',
  'edge', 'shift', 'forge', 'craft', 'smart', 'fast', 'swift', 'pro',
  'io', 'ly', 'ify', 'app', 'sync', 'link', 'mind', 'bright', 'clear',
  'easy', 'quick', 'prime', 'peak', 'apex', 'ace', 'elite', 'base',
  'matrix', 'loop', 'grid', 'layer', 'stack', 'kit', 'dash', 'vault',
];

const WEAK_BRAND_WORDS = [
  'the', 'best', 'my', 'our', 'good', 'great', 'super', 'mega', 'ultra',
  'solution', 'services', 'enterprise', 'global', 'world', 'universal',
  'general', 'nation', 'unlimited', 'infinity', 'beyond', 'ultimate',
  'new', 'advanced', 'modern', 'digital',
];

const LARGE_MARKET_KEYWORDS = [
  'global', 'worldwide', 'billion', 'million', 'everyone', 'all people',
  'mainstream', 'mass market', 'universal', 'any business', 'all businesses',
  'all industries', 'e-commerce', 'fintech', 'healthcare', 'education',
  'saas', 'b2b', 'enterprise', 'platform', 'marketplace', 'remote work',
  'gig economy', 'creators', 'freelancers', 'small businesses', 'smb',
  'consumers', 'shoppers', 'students', 'professionals', 'developers',
];

const NICHE_MARKET_KEYWORDS = [
  'left-handed', 'vegan', 'gluten-free', 'specific region', 'single city',
  'niche', 'hobbyist', 'collector', 'enthusiast', 'specific sport',
  'only for', 'exclusive', 'premium only', 'luxury only',
];

const SPECIFIC_AUDIENCE_KEYWORDS = [
  'millennials', 'gen z', 'gen x', 'baby boomers', 'parents', 'teachers',
  'doctors', 'nurses', 'lawyers', 'engineers', 'designers', 'marketers',
  'entrepreneurs', 'ceos', 'ctos', 'managers', 'remote workers',
  'freelancers', 'students', 'graduates', 'retirees', 'athletes',
  'gamers', 'content creators', 'youtubers', 'influencers', 'podcasters',
  'e-commerce sellers', 'shopify', 'amazon', 'small business owners',
  'restaurant owners', 'real estate', 'agents', 'coaches', 'consultants',
  'hr teams', 'finance teams', 'marketing teams', 'sales teams',
  'age 18', 'age 25', 'age 30', 'age 35', 'age 40', 'age 50',
  'women', 'men', 'non-binary', 'lgbtq', 'urban', 'rural', 'suburban',
  'us market', 'india', 'europe', 'asia', 'africa', 'latin america',
];

const REVENUE_MODELS = {
  subscription: {
    keywords: ['subscription', 'monthly', 'yearly', 'annual', 'recurring', 'saas', 'membership', 'plan', 'tiered', 'freemium'],
    score: 88,
    label: 'Subscription / SaaS',
    explanation: 'Recurring revenue models are highly valued by investors and provide predictable cash flow. Subscription models scale well and reduce churn risks when paired with good retention strategies.',
  },
  marketplace: {
    keywords: ['marketplace', 'commission', 'take rate', 'platform fee', 'listing fee', 'transaction fee', 'two-sided'],
    score: 82,
    label: 'Marketplace / Commission',
    explanation: 'Marketplace models benefit from network effects and can achieve great scale. Commission-based revenue aligns incentives with user success, though liquidity bootstrapping is a challenge.',
  },
  advertising: {
    keywords: ['advertising', 'ads', 'ad revenue', 'sponsored', 'sponsorship', 'display ads', 'programmatic'],
    score: 60,
    label: 'Advertising',
    explanation: 'Ad-based revenue requires large user volumes to be meaningful. Margins can be thin and user experience can suffer. Works best at scale with strong audience engagement.',
  },
  ecommerce: {
    keywords: ['ecommerce', 'e-commerce', 'sell products', 'sell goods', 'physical products', 'dropshipping', 'retail', 'merchandise', 'shop', 'store'],
    score: 70,
    label: 'E-Commerce / Product Sales',
    explanation: 'Product sales offer straightforward revenue, but margins and logistics can be challenging. Success depends heavily on customer acquisition cost vs lifetime value.',
  },
  freemium: {
    keywords: ['freemium', 'free tier', 'free plan', 'premium upgrade', 'paid features', 'free with premium'],
    score: 79,
    label: 'Freemium',
    explanation: 'Freemium lowers acquisition barriers and builds large user bases. Conversion rate from free to paid is the critical metric — typically 2–5% is considered healthy.',
  },
  consulting: {
    keywords: ['consulting', 'services', 'agency', 'hourly', 'project-based', 'retainer', 'managed services', 'professional services'],
    score: 55,
    label: 'Services / Consulting',
    explanation: 'Service-based revenue is difficult to scale as it is tied to human effort. Investors prefer productized services or platforms over pure consulting businesses.',
  },
  licensing: {
    keywords: ['license', 'licensing', 'royalty', 'royalties', 'white-label', 'white label', 'api access', 'sdk'],
    score: 84,
    label: 'Licensing / Royalties',
    explanation: 'Licensing is highly scalable with near-zero marginal cost. It works particularly well for IP-rich or technology-heavy businesses with strong defensible assets.',
  },
  data: {
    keywords: ['data', 'data monetization', 'sell data', 'data insights', 'analytics', 'reports', 'intelligence'],
    score: 72,
    label: 'Data Monetization',
    explanation: 'Data products can be lucrative but face increasing regulatory scrutiny (GDPR, CCPA). User trust and privacy concerns must be carefully managed.',
  },
};

const HIGH_COMPETITION_KEYWORDS = [
  'social media', 'social network', 'food delivery', 'ride sharing', 'ride hailing',
  'uber', 'airbnb', 'netflix', 'like netflix', 'streaming', 'messaging app',
  'email', 'project management', 'crm', 'erp', 'accounting', 'invoicing',
  'ecommerce platform', 'like amazon', 'like shopify', 'search engine',
  'news aggregator', 'job board', 'dating app', 'fitness app', 'todo app',
  'note-taking', 'calendar', 'video calling', 'collaboration tool',
  'chatbot', 'ai chatbot', 'like chatgpt', 'like slack', 'like notion',
  'like trello', 'like asana', 'like hubspot', 'payment gateway', 'wallet',
];

const LOW_COMPETITION_KEYWORDS = [
  'niche', 'underserved', 'unserved', 'no solution', 'no current tool',
  'specific vertical', 'specific industry', 'novel approach', 'unique way',
  'patented', 'proprietary', 'first of its kind', 'never been done',
  'blue ocean', 'emerging market', 'new category', 'regulatory',
  'compliance', 'government', 'healthcare specific', 'legal specific',
  'rare condition', 'specialized', 'hyper-local', 'deep expertise',
];

// ─── Helper Utilities ─────────────────────────────────────────────────────────

const normalize = (text) => text.toLowerCase().trim();

const containsKeywords = (text, keywords) => {
  const lower = normalize(text);
  return keywords.filter(k => lower.includes(normalize(k)));
};

const clamp = (value, min = 0, max = 100) => Math.min(max, Math.max(min, value));

const scoreToGrade = (score) => {
  if (score >= 85) return { grade: 'A', label: 'Excellent' };
  if (score >= 70) return { grade: 'B', label: 'Good' };
  if (score >= 55) return { grade: 'C', label: 'Average' };
  if (score >= 40) return { grade: 'D', label: 'Weak' };
  return { grade: 'F', label: 'Poor' };
};

// ─── Brand Score ─────────────────────────────────────────────────────────────

function evaluateBrand(startupName) {
  let score = 50;
  const details = [];
  const name = normalize(startupName);
  const wordCount = startupName.trim().split(/\s+/).length;
  const charCount = startupName.trim().replace(/\s/g, '').length;

  // Length scoring
  if (charCount >= 4 && charCount <= 10) {
    score += 20;
    details.push('Optimal name length (4–10 chars) — easy to remember and type.');
  } else if (charCount >= 11 && charCount <= 15) {
    score += 10;
    details.push('Name length is acceptable but slightly long for memorability.');
  } else if (charCount > 15) {
    score -= 15;
    details.push('Name is too long — users struggle to recall names over 15 characters.');
  } else if (charCount < 4) {
    score -= 5;
    details.push('Very short name — can be memorable but risks trademark conflicts.');
  }

  // Word count
  if (wordCount === 1) {
    score += 10;
    details.push('Single-word name — premium, clean, and highly brandable.');
  } else if (wordCount === 2) {
    score += 3;
    details.push('Two-word name — still workable but less punchy than single-word brands.');
  } else if (wordCount >= 3) {
    score -= 12;
    details.push('Three+ word names are harder to brand and recall (e.g., avoid "The Best Digital Solutions").');
  }

  // Strong tech-brand keywords
  const strongMatches = containsKeywords(name, STRONG_BRAND_WORDS);
  if (strongMatches.length > 0) {
    score += Math.min(15, strongMatches.length * 8);
    details.push(`Contains strong brand elements: "${strongMatches.slice(0, 2).join('", "')}".`);
  }

  // Weak brand words
  const weakMatches = containsKeywords(name, WEAK_BRAND_WORDS);
  if (weakMatches.length > 0) {
    score -= Math.min(20, weakMatches.length * 8);
    details.push(`Avoid generic words like "${weakMatches.slice(0, 2).join('", "')}" — they reduce uniqueness.`);
  }

  // Special characters or numbers (modern brand trend)
  if (/\d/.test(startupName)) {
    score += 3;
    details.push('Numbers in the name add a modern, tech-forward feel.');
  }

  // All caps check (like IBM, CNN) – short ones are ok
  if (startupName === startupName.toUpperCase() && charCount <= 5) {
    score += 5;
    details.push('Acronym-style name — works well for short, memorable abbreviations.');
  }

  score = clamp(score);
  const { grade, label } = scoreToGrade(score);
  const summary = score >= 70
    ? `"${startupName}" is a solid brand name with strong memorability and market presence.`
    : score >= 50
    ? `"${startupName}" is decent but could benefit from refinement to stand out in a crowded market.`
    : `"${startupName}" needs significant work — consider a shorter, more distinctive name.`;

  return { score, grade, label, summary, details };
}

// ─── Market Potential Score ───────────────────────────────────────────────────

function evaluateMarket(businessIdea, targetAudience) {
  let score = 45;
  const details = [];
  const combined = `${businessIdea} ${targetAudience}`;

  // Idea length / clarity
  const wordCount = businessIdea.trim().split(/\s+/).length;
  if (wordCount < 10) {
    score -= 10;
    details.push('Business idea is too vague. A clearer description signals a more thought-out concept.');
  } else if (wordCount >= 10 && wordCount <= 30) {
    score += 10;
    details.push('Business idea has good clarity — concise yet descriptive.');
  } else if (wordCount > 30 && wordCount <= 60) {
    score += 15;
    details.push('Detailed business description shows strong concept development.');
  } else {
    score += 8;
    details.push('Very detailed description — just ensure the core value prop is crystal clear.');
  }

  // Large market indicators
  const largeMatches = containsKeywords(combined, LARGE_MARKET_KEYWORDS);
  if (largeMatches.length >= 3) {
    score += 20;
    details.push(`Strong market signals detected: "${largeMatches.slice(0, 3).join('", "')}" — indicates large addressable market.`);
  } else if (largeMatches.length >= 1) {
    score += 10;
    details.push(`Some market scale indicators found: "${largeMatches.slice(0, 2).join('", "')}".`);
  } else {
    details.push('No clear large-market signals — consider articulating the market size opportunity.');
  }

  // Niche market indicators
  const nicheMatches = containsKeywords(combined, NICHE_MARKET_KEYWORDS);
  if (nicheMatches.length > 0) {
    score -= 10;
    details.push(`Niche-specific language detected — smaller addressable market, but can be highly profitable if focused.`);
  }

  // Audience specificity
  const specificMatches = containsKeywords(targetAudience, SPECIFIC_AUDIENCE_KEYWORDS);
  if (specificMatches.length >= 2) {
    score += 15;
    details.push(`Highly specific target audience (${specificMatches.slice(0, 2).join(', ')}) — easier to reach and convert.`);
  } else if (specificMatches.length === 1) {
    score += 8;
    details.push(`Target audience has some specificity (${specificMatches[0]}) — good start, but narrow further for better targeting.`);
  } else {
    const audienceWords = targetAudience.trim().split(/\s+/).length;
    if (audienceWords >= 5) {
      score += 5;
      details.push('Target audience is described but lacks specific demographic or psychographic signals.');
    } else {
      score -= 8;
      details.push('Target audience is too broad or vague — "everyone" is not a target market.');
    }
  }

  // Problem-solution language
  const problemWords = ['problem', 'issue', 'challenge', 'pain', 'struggle', 'difficult', 'frustrating', 'expensive', 'time-consuming', 'inefficient'];
  const solutionWords = ['solve', 'solution', 'automate', 'streamline', 'simplify', 'reduce', 'eliminate', 'improve', 'help', 'enable', 'empower'];

  const hasProblem = containsKeywords(businessIdea, problemWords).length > 0;
  const hasSolution = containsKeywords(businessIdea, solutionWords).length > 0;

  if (hasProblem && hasSolution) {
    score += 12;
    details.push('Clear problem-solution framing — investors and customers respond well to this narrative.');
  } else if (hasSolution) {
    score += 5;
    details.push('Solution is mentioned but the problem being solved could be stated more explicitly.');
  } else if (hasProblem) {
    score += 3;
    details.push('Problem is identified but the solution mechanism needs clearer articulation.');
  }

  score = clamp(score);
  const { grade, label } = scoreToGrade(score);
  const summary = score >= 70
    ? 'Strong market potential with a well-defined audience and meaningful addressable market.'
    : score >= 50
    ? 'Moderate market potential — refine the audience definition and quantify the market size.'
    : 'Limited market signals — rethink the target audience and market opportunity framing.';

  return { score, grade, label, summary, details };
}

// ─── Revenue Potential Score ──────────────────────────────────────────────────

function evaluateRevenue(revenueModel) {
  const lower = normalize(revenueModel);
  let matchedModel = null;
  let bestMatchCount = 0;

  for (const [key, model] of Object.entries(REVENUE_MODELS)) {
    const matches = containsKeywords(lower, model.keywords);
    if (matches.length > bestMatchCount) {
      bestMatchCount = matches.length;
      matchedModel = { key, ...model, matchedKeywords: matches };
    }
  }

  // If no model matched, try to score based on description quality
  if (!matchedModel || bestMatchCount === 0) {
    const wordCount = revenueModel.trim().split(/\s+/).length;
    let score = wordCount >= 10 ? 55 : wordCount >= 5 ? 40 : 28;
    return {
      score,
      grade: scoreToGrade(score).grade,
      label: scoreToGrade(score).label,
      modelType: 'Unclear Revenue Model',
      summary: 'The revenue model is not clearly defined. Investors and co-founders need a crisp explanation of how you make money.',
      explanation: 'Consider defining a primary revenue model: subscription, marketplace, advertising, or e-commerce. A clear monetization strategy is essential for startup credibility.',
      details: ['Revenue model lacks clarity — use specific terminology like "subscription", "marketplace commission", or "freemium".'],
    };
  }

  // Adjust based on description detail
  const wordCount = revenueModel.trim().split(/\s+/).length;
  let scoreAdjustment = 0;
  const details = [];

  if (wordCount >= 15) {
    scoreAdjustment += 5;
    details.push('Detailed revenue description — shows strong business model thinking.');
  } else if (wordCount < 5) {
    scoreAdjustment -= 8;
    details.push('Revenue model description is very brief — expand on pricing strategy and tiers.');
  }

  // Pricing indicators
  if (/\$\d+|\d+\s*(dollar|usd|eur|per month|per year|\/mo|\/yr)/i.test(revenueModel)) {
    scoreAdjustment += 6;
    details.push('Specific pricing mentioned — demonstrates market research and business planning.');
  }

  // Multiple revenue streams
  const streamCount = Object.values(REVENUE_MODELS).filter(m =>
    containsKeywords(lower, m.keywords).length > 0
  ).length;

  if (streamCount >= 2) {
    scoreAdjustment += 5;
    details.push('Multiple revenue streams detected — diversified income reduces business risk.');
  }

  const finalScore = clamp(matchedModel.score + scoreAdjustment);
  const { grade, label } = scoreToGrade(finalScore);

  return {
    score: finalScore,
    grade,
    label,
    modelType: matchedModel.label,
    summary: `${matchedModel.label} revenue model identified — ${finalScore >= 70 ? 'strong' : 'moderate'} revenue potential.`,
    explanation: matchedModel.explanation,
    details: [
      `Identified as: ${matchedModel.label}`,
      ...details,
      matchedModel.explanation,
    ],
  };
}

// ─── Competition Risk ─────────────────────────────────────────────────────────

function evaluateCompetition(businessIdea, targetAudience) {
  const combined = normalize(`${businessIdea} ${targetAudience}`);

  const highMatches = containsKeywords(combined, HIGH_COMPETITION_KEYWORDS);
  const lowMatches = containsKeywords(combined, LOW_COMPETITION_KEYWORDS);

  const highScore = highMatches.length;
  const lowScore = lowMatches.length;
  const net = highScore - lowScore;

  let risk, color, icon, explanation, badge;

  if (net >= 2) {
    risk = 'High';
    color = 'red';
    icon = '🔴';
    badge = 'bg-red-500/20 text-red-400 border-red-500/30';
    explanation = `High competition detected based on overlapping with established markets: "${highMatches.slice(0, 3).join('", "')}". You'll need a clear differentiator (price, UX, niche focus, or technology) to survive in this space.`;
  } else if (net >= 0) {
    risk = 'Medium';
    color = 'yellow';
    icon = '🟡';
    badge = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    explanation = `Moderate competition expected. The market has existing players but there may be room for differentiation. Focus on a specific niche or superior user experience to carve out your space.`;
  } else {
    risk = 'Low';
    color = 'green';
    icon = '🟢';
    badge = 'bg-green-500/20 text-green-400 border-green-500/30';
    explanation = `Low competition signals detected — potential blue ocean opportunity! ${lowMatches.length > 0 ? `Differentiation factors: "${lowMatches.slice(0, 2).join('", "')}".` : 'Validate the market exists before assuming low competition means no demand.'}`;
  }

  return { risk, color, icon, badge, explanation, highMatches, lowMatches };
}

// ─── Generate Strengths, Weaknesses & Suggestions ────────────────────────────

function generateInsights(formData, scores, competition) {
  const { startupName, businessIdea, targetAudience, revenueModel } = formData;
  const { brandScore, marketScore, revenueScore } = scores;
  const combined = normalize(`${businessIdea} ${targetAudience} ${revenueModel}`);

  const strengths = [];
  const weaknesses = [];
  const suggestions = [];

  // Strengths
  if (brandScore.score >= 70) {
    strengths.push(`🎯 Strong brand identity — "${startupName}" is memorable, concise, and tech-forward. This gives you a head start in brand recognition.`);
  }
  if (marketScore.score >= 65) {
    strengths.push(`📈 Well-defined market opportunity — your target audience is specific enough to enable precise marketing and product decisions.`);
  }
  if (revenueScore.score >= 75) {
    strengths.push(`💰 Solid revenue model — ${revenueScore.modelType} is a proven monetization strategy with good investor appetite and scaling potential.`);
  }
  if (competition.risk === 'Low') {
    strengths.push(`🌊 Blue ocean opportunity — low competition in your space means early-mover advantage and easier brand recognition.`);
  }
  if (containsKeywords(combined, ['ai', 'machine learning', 'automation', 'ml', 'artificial intelligence']).length > 0) {
    strengths.push(`🤖 AI/ML integration — technology-forward approach signals scalability and aligns with high investor interest in intelligent products.`);
  }
  if (containsKeywords(combined, ['mobile', 'app', 'ios', 'android', 'cross-platform']).length > 0) {
    strengths.push(`📱 Mobile-first strategy — capturing users on mobile increases engagement rates and aligns with how modern users consume digital products.`);
  }
  if (containsKeywords(combined, ['sustainability', 'green', 'eco', 'environment', 'carbon', 'renewable']).length > 0) {
    strengths.push(`🌱 Sustainability angle — ESG-aligned businesses attract a growing segment of conscious consumers and impact investors.`);
  }
  if (containsKeywords(combined, ['b2b', 'enterprise', 'business', 'companies', 'corporate']).length > 0) {
    strengths.push(`🏢 B2B focus — business customers typically have higher lifetime value, lower churn, and clearer ROI expectations.`);
  }

  // Weaknesses
  if (brandScore.score < 55) {
    weaknesses.push(`🔴 Weak brand name — "${startupName}" may struggle to stand out. Generic or long names hurt recall and SEO branding efforts.`);
  }
  if (marketScore.score < 50) {
    weaknesses.push(`🔴 Unclear market positioning — the target audience and market size are not clearly defined, making fundraising and marketing difficult.`);
  }
  if (revenueScore.score < 55) {
    weaknesses.push(`🔴 Revenue model risk — ${revenueScore.modelType === 'Unclear Revenue Model' ? 'no clear revenue model' : revenueScore.modelType + ' faces scaling challenges'} that investors will scrutinize.`);
  }
  if (competition.risk === 'High') {
    weaknesses.push(`🔴 Intense competition — you're entering an already crowded market. Without a strong moat (technology, network effects, or brand), survival is challenging.`);
  }
  if (businessIdea.trim().split(/\s+/).length < 10) {
    weaknesses.push(`🔴 Vague business concept — the idea lacks sufficient detail to evaluate feasibility. Co-founders, investors, and customers need a clearer picture.`);
  }
  if (targetAudience.trim().split(/\s+/).length < 4) {
    weaknesses.push(`🔴 Underdefined target audience — "everyone" is not a customer segment. Narrow down to a specific demographic, geography, or psychographic profile.`);
  }

  // Ensure at least 3 of each
  const fallbackStrengths = [
    `✅ You've identified a problem worth solving — that's the critical first step most aspiring founders skip.`,
    `✅ Taking the time to evaluate your idea demonstrates entrepreneurial rigor and reduces the risk of building the wrong product.`,
    `✅ Your concept has unique potential — with the right execution, validation, and team, it could find strong product-market fit.`,
  ];
  const fallbackWeaknesses = [
    `⚠️ Early-stage ideas often lack sufficient market validation — ensure you conduct customer discovery interviews before building.`,
    `⚠️ Funding gap risk — without clear traction metrics or a working MVP, attracting early-stage investment will be challenging.`,
    `⚠️ Execution complexity — even great ideas fail due to team gaps, poor timing, or underestimating go-to-market challenges.`,
  ];

  while (strengths.length < 3) strengths.push(fallbackStrengths[strengths.length]);
  while (weaknesses.length < 3) weaknesses.push(fallbackWeaknesses[weaknesses.length]);

  // Suggestions
  if (brandScore.score < 70) {
    suggestions.push(`🔧 Rebrand for memorability — aim for a 1-word, 5–10 character name with a .com domain. Use tools like Namelix or Looka to brainstorm. Test name recall with 5 people in 24 hours.`);
  } else {
    suggestions.push(`🔧 Protect your brand — register the trademark for "${startupName}" in your primary market and secure all major social media handles immediately.`);
  }

  if (marketScore.score < 65) {
    suggestions.push(`🔧 Conduct 20 customer discovery interviews — talk to your target audience before writing code. Use Calendly + Zoom and ask: "Tell me about the last time you faced [problem]." Document patterns.`);
  } else {
    suggestions.push(`🔧 Build a waitlist before launch — use a simple landing page (Carrd or Webflow) to validate demand. Aim for 500+ signups before investing heavily in product development.`);
  }

  if (revenueScore.modelType === 'Unclear Revenue Model' || revenueScore.score < 60) {
    suggestions.push(`🔧 Define a clear monetization path — pick one primary model (subscription is recommended for SaaS). Set a pricing hypothesis: "We charge $X/month for [feature set]" and validate it with prospects.`);
  } else if (revenueScore.modelType.includes('Subscription')) {
    suggestions.push(`🔧 Optimize your subscription funnel — implement a free trial (14 days works best), in-app upgrade prompts, and an annual plan discount (typically 20%) to improve LTV and reduce monthly churn.`);
  } else {
    suggestions.push(`🔧 Model your unit economics — calculate CAC (Customer Acquisition Cost) vs LTV (Lifetime Value). A healthy SaaS business maintains LTV:CAC ≥ 3:1. Know your numbers before scaling.`);
  }

  if (competition.risk === 'High') {
    suggestions.push(`🔧 Find your wedge — instead of competing head-on, dominate a micro-niche first. Pick one specific customer segment, geography, or use case and become the #1 solution for them before expanding.`);
  }

  if (containsKeywords(combined, ['b2c', 'consumer', 'end users', 'individual']).length > 0) {
    suggestions.push(`🔧 Focus on viral growth mechanisms — build referral loops, social sharing, or community features into your core product. B2C without a viral loop burns cash on paid acquisition.`);
  }

  // Always include an MVP suggestion
  suggestions.push(`🔧 Launch an MVP in 30 days — use no-code tools (Bubble, Webflow, Glide) to ship a working prototype fast. Real user feedback is worth more than 6 months of planning. Aim for 10 paying customers before your v1.0.`);

  return {
    strengths: strengths.slice(0, 3),
    weaknesses: weaknesses.slice(0, 3),
    suggestions: suggestions.slice(0, 3),
  };
}

// ─── Overall Score ────────────────────────────────────────────────────────────

function calculateOverallScore(brandScore, marketScore, revenueScore, competition) {
  const competitionBonus = competition.risk === 'Low' ? 8 : competition.risk === 'Medium' ? 0 : -5;

  const weighted = Math.round(
    brandScore.score * 0.20 +
    marketScore.score * 0.35 +
    revenueScore.score * 0.35 +
    competitionBonus * 1.0
  );

  const overall = clamp(weighted);
  const { grade, label } = scoreToGrade(overall);

  let verdict, verdictColor;
  if (overall >= 80) {
    verdict = '🚀 Strong Startup Concept';
    verdictColor = 'text-green-400';
  } else if (overall >= 65) {
    verdict = '⚡ Promising – Needs Refinement';
    verdictColor = 'text-blue-400';
  } else if (overall >= 50) {
    verdict = '🔧 Work in Progress';
    verdictColor = 'text-yellow-400';
  } else if (overall >= 35) {
    verdict = '⚠️ Significant Gaps Detected';
    verdictColor = 'text-orange-400';
  } else {
    verdict = '🔥 Back to the Drawing Board';
    verdictColor = 'text-red-400';
  }

  return { score: overall, grade, label, verdict, verdictColor };
}

// ─── Main Evaluation Function ─────────────────────────────────────────────────

export function evaluateStartup(formData) {
  const { startupName, businessIdea, targetAudience, revenueModel } = formData;

  const brandScore = evaluateBrand(startupName);
  const marketScore = evaluateMarket(businessIdea, targetAudience);
  const revenueScore = evaluateRevenue(revenueModel);
  const competition = evaluateCompetition(businessIdea, targetAudience);
  const overallScore = calculateOverallScore(brandScore, marketScore, revenueScore, competition);

  const scores = { brandScore, marketScore, revenueScore };
  const insights = generateInsights(formData, scores, competition);

  return {
    brandScore,
    marketScore,
    revenueScore,
    competition,
    overallScore,
    ...insights,
  };
}

// ─── Example Startup Data ─────────────────────────────────────────────────────

export const EXAMPLE_STARTUP = {
  startupName: 'NovaMind AI',
  businessIdea: 'An AI-powered mental health platform that helps remote workers manage stress, burnout, and anxiety through personalized daily check-ins, mood tracking, and guided cognitive behavioral therapy exercises. It integrates with Slack and Microsoft Teams to provide proactive wellness nudges.',
  targetAudience: 'Remote workers aged 25–40, particularly developers, designers, and knowledge workers at tech companies with 50–500 employees who experience high levels of workplace stress and lack access to affordable mental health support.',
  revenueModel: 'B2B SaaS subscription model at $12 per employee per month, with a freemium tier for individual users. Enterprise plans start at $8/seat/month for 100+ seat companies. Annual billing offers a 20% discount.',
};
