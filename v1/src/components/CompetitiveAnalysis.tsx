'use client';

import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface CompetitorComparison {
  tool: string;
  charts: boolean;
  rag: boolean;
  portfolio: boolean;
  xai: boolean;
  multiAsset: boolean;
}

const competitors: CompetitorComparison[] = [
  {
    tool: 'TradingView',
    charts: true,
    rag: false,
    portfolio: false,
    xai: false,
    multiAsset: true,
  },
  {
    tool: 'AlphaSense',
    charts: false,
    rag: true,
    portfolio: false,
    xai: false,
    multiAsset: false,
  },
  {
    tool: 'Koyfin/Ticker',
    charts: true,
    rag: false,
    portfolio: false,
    xai: false,
    multiAsset: true,
  },
  {
    tool: 'ChatGPT/Agents',
    charts: false,
    rag: false,
    portfolio: false,
    xai: false,
    multiAsset: false,
  },
  {
    tool: 'TelemetryTrade',
    charts: true,
    rag: true,
    portfolio: true,
    xai: true,
    multiAsset: true,
  },
];

export const CompetitiveAnalysis: React.FC = () => {
  return (
    <section className="w-full px-6 md:px-12 py-20 md:py-32 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-rubik
                       text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400
                       mb-4 leading-tight"
          >
            Why TelemetryTrade is Different
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Typical tools solve only one problem. We solve them all in one unified platform.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-zinc-800/50 backdrop-blur-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800/50 bg-gradient-to-r from-zinc-900/50 to-black/50">
                <th className="px-6 py-4 text-left font-semibold text-white">Platform</th>
                <th className="px-6 py-4 text-center font-semibold text-cyan-400">Advanced Charts</th>
                <th className="px-6 py-4 text-center font-semibold text-cyan-400">RAG Research</th>
                <th className="px-6 py-4 text-center font-semibold text-cyan-400">Portfolio AI</th>
                <th className="px-6 py-4 text-center font-semibold text-cyan-400">Explainable AI</th>
                <th className="px-6 py-4 text-center font-semibold text-cyan-400">Multi-Asset</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((competitor) => {
                const isOurs = competitor.tool === 'TelemetryTrade';
                return (
                  <tr
                    key={competitor.tool}
                    className={`border-b border-zinc-800/50 transition-all duration-300 hover:bg-zinc-900/30 ${
                      isOurs ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10' : ''
                    }`}
                  >
                    <td
                      className={`px-6 py-4 ${
                        isOurs ? 'text-cyan-400' : 'text-white'
                      }`}
                    >
                      {competitor.tool}
                    </td>
                    {[
                      competitor.charts,
                      competitor.rag,
                      competitor.portfolio,
                      competitor.xai,
                      competitor.multiAsset,
                    ].map((feature, featureIdx) => (
                      <td key={featureIdx} className="px-6 py-4 text-center">
                        {feature ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-600 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Key Differentiators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Verified Research',
              description: 'RAG trained on whitepapers, filings, and official documents',
              icon: '📄',
            },
            {
              title: 'Portfolio Intelligence',
              description: 'Upload screenshots for AI-powered analysis and optimization',
              icon: '💼',
            },
            {
              title: 'Cross-Asset Insights',
              description: 'Real-time analysis across stocks, crypto, and multiple markets',
              icon: '🌐',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/50 to-black/50 
                        hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
