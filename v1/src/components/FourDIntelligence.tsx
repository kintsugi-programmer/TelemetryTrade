'use client';

import React from 'react';

export const FourDIntelligence: React.FC = () => {
  const dimensions = [
    {
      title: 'D1 — Deep Data',
      subtitle: 'Input Universe',
      description: 'AI that absorbs everything',
      points: [
        'Reads whitepapers end-to-end',
        'Parses filings (10-K, 10-Q)',
        'Monitors news streams',
        'Tracks market history',
        'Captures live price feeds',
      ],
      gradient: 'from-blue-500 to-cyan-500',
      position: 'left',
    },
    {
      title: 'D2 — Dynamic Analysis',
      subtitle: 'Market Motion Engine',
      description: 'AI that thinks in motion',
      points: [
        'Real-time price interpretation',
        'Multi-asset comparison',
        'Multi-level chart overlays',
        'Pattern recognition',
        'Volatility detection',
      ],
      gradient: 'from-cyan-500 to-teal-500',
      position: 'top',
    },
    {
      title: 'D3 — Dimensional Insight',
      subtitle: 'Insight Core',
      description: 'AI that connects the dots',
      points: [
        'Unifies technical & fundamental data',
        'Detects cross-asset relationships',
        'Learns from historical scenarios',
        'Builds structured explanations',
        'Provides confidence scoring',
      ],
      gradient: 'from-purple-500 to-pink-500',
      position: 'right',
    },
    {
      title: 'D4 — Decision Intelligence',
      subtitle: 'Decision Layer',
      description: 'AI that guides your next move',
      points: [
        'Clear summaries',
        'Trend explanations',
        'Portfolio risk insights',
        'Scenario simulations',
        'Actionable suggestions',
      ],
      gradient: 'from-pink-500 to-orange-500',
      position: 'bottom',
    },
  ];

  return (
    <section className="w-full px-6 md:px-12 py-20 md:py-32 bg-gradient-to-b from-zinc-950 via-black to-zinc-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-rubik
                       text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400
                       mb-6 leading-tight"
          >
            TelemetryTrade &apos; 4D Intelligence
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            From total market understanding to clear decisions &mdash; across every dimension.
          </p>
        </div>

        {/* 2x2 Grid for 4D Dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {dimensions.map((dim) => (
            <div
              key={dim.title}
              className={`group relative overflow-hidden rounded-2xl border border-zinc-800/50 
                          bg-gradient-to-br from-zinc-900/60 to-black/60 backdrop-blur-sm
                          p-8 transition-all duration-500 hover:border-zinc-700 
                          hover:shadow-xl hover:shadow-cyan-500/20`}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 
                            bg-gradient-to-br ${dim.gradient}`}
              />

              {/* Content */}
              <div className="relative">
                {/* Icon/Number */}
                <div className={`inline-block mb-4 px-4 py-2 rounded-lg bg-gradient-to-r ${dim.gradient}`}>
                  <span className="text-white font-bold text-sm">{dim.title.split('—')[0].trim()}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl text-white mb-1">
                  {dim.title.split('—')[1].trim()}
                </h3>

                {/* Subtitle */}
                <p className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${dim.gradient} mb-3`}>
                  {dim.subtitle}
                </p>

                {/* Description */}
                <p className="text-gray-400 italic text-sm mb-6">{dim.description}</p>

                {/* Points */}
                <ul className="space-y-3">
                  {dim.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <div className={`mt-1.5 h-2 w-2 rounded-full bg-gradient-to-r ${dim.gradient} flex-shrink-0`} />
                      <span className="text-gray-300 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
          ))}
        </div>

        {/* Summary Statement */}
        <div className="mt-16 text-center p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm">
          <p className="text-lg text-gray-200 mb-4">
            <span className="font-bold text-cyan-400">Slogan:</span> Deep Data. Dynamic Analysis. Dimensional Insight. Decision Intelligence.
          </p>
          <p className="text-gray-400">
            <span className="font-bold text-cyan-400">Ultra-Short Branding:</span> 4D AI for traders: Input. Motion. Insight. Decisions.
          </p>
        </div>
      </div>
    </section>
  );
};
