'use client';

import React from 'react';
import Link from 'next/link';
import { FeatureCard } from './FeatureCard';
import {
  BarChart3,
  Zap,
  Brain,
  BarChart4,
  DollarSign,
  TrendingUp,
  Layers,
  MessageSquare,
  Activity,
  BookOpen,
  Globe,
  Shield,
  Database,
  BarChart2,
  Lightbulb,
  Lock,
} from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Advanced Charting',
    description: 'High-performance real-time charts with technical tools, multi-asset comparison, and multiple timeframe support.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: BookOpen,
    title: 'AI Research (RAG)',
    description: 'Verified Retrieval-Augmented Generation system trained on whitepapers, filings, and historical market data.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Activity,
    title: 'Anomaly Detection',
    description: 'Intelligent detection of volatility shifts, unusual volume events, and market anomalies in real-time.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Zap,
    title: 'Real-time Market Data',
    description: 'Live integration with stock and crypto market APIs delivering instant price updates and analysis.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: DollarSign,
    title: 'Currency Conversion',
    description: 'INR ↔ USD, EUR, GBP auto-conversion with support for cross-pair cryptocurrency exchanges.',
    gradient: 'from-red-500 to-pink-500',
  },
  {
    icon: Brain,
    title: 'Portfolio Intelligence',
    description: 'Upload portfolio screenshots for AI analysis of distribution, risk, and optimization suggestions.',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Lightbulb,
    title: 'Explainable AI (XAI)',
    description: 'Transparent model outputs with reasoning, confidence scores, and evidence traces for every insight.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: MessageSquare,
    title: 'Trading Assistant',
    description: 'Intelligent chatbot that reads market data, whitepapers, and suggests risk-optimized strategies.',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    icon: TrendingUp,
    title: 'Trend Analysis',
    description: 'Multi-level technical analysis with pattern recognition and historical probability insights.',
    gradient: 'from-lime-500 to-green-500',
  },
  {
    icon: Globe,
    title: 'Multilingual Platform',
    description: 'Full website translation with regional content adaptation for global users and traders.',
    gradient: 'from-fuchsia-500 to-purple-500',
  },
  {
    icon: Layers,
    title: '4D Intelligence',
    description: 'Deep Data, Dynamic Analysis, Dimensional Insight, and Decision Intelligence in one framework.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Database,
    title: 'Data & Insights',
    description: 'Comprehensive market research, sentiment analysis, and structured insights generation.',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    icon: BarChart4,
    title: 'Educational Content',
    description: 'Beginner-friendly guides on indicators, risk management, and trading fundamentals.',
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    icon: BarChart2,
    title: 'News & Signals',
    description: 'Community & News Signal Aggregator filtering authentic data from multiple sources.',
    gradient: 'from-sky-500 to-blue-500',
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: 'Portfolio risk scoring, alerts for over-leveraged positions, and safety recommendations.',
    gradient: 'from-green-600 to-teal-500',
  },
  {
    icon: Lock,
    title: 'Security & Privacy',
    description: 'Encrypted storage, zero data sharing, compliance with regulations, and user data protection.',
    gradient: 'from-purple-600 to-indigo-500',
  },
];

export const FeaturesSection: React.FC = () => {
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
            Powerful Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need for intelligent trading and market analysis, all in one platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              delay={index}
            />
          ))}
        </div>

        {/* CTA */}
       
      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};
