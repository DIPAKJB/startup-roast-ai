# Startup Roast AI – Implementation Plan

## Project Structure
- React + Vite + Tailwind CSS
- Component-based architecture
- All logic runs locally in browser (no APIs)

## Components
- App.jsx – Root component, state management
- HeroSection.jsx – Headline + subheadline
- InputForm.jsx – Startup Name, Idea, Audience, Revenue Model
- RoastReport.jsx – Full evaluation output
- ScoreCard.jsx – Individual score display
- ScoreBar.jsx – Animated progress bar
- StrengthsWeaknesses.jsx – Lists
- Suggestions.jsx – Actionable tips
- Footer.jsx – Contact + Digital Heroes button

## Scoring Engine (utils/scoringEngine.js)
Deterministic keyword-based logic:
- Brand Score: name length, uniqueness keywords
- Market Potential: audience specificity, market size keywords
- Revenue Potential: revenue model classification
- Competition Risk: competitive landscape keywords
- Overall Score: weighted average
