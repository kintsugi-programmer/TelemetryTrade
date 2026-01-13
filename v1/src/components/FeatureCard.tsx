'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  gradient,
  delay = 0,
}) => {
  return (
    <div
      className={`
        group relative overflow-hidden rounded-xl border border-zinc-800/50
        bg-gradient-to-br from-zinc-900/50 to-black/50 backdrop-blur-sm
        p-6 transition-all duration-500 hover:border-zinc-700 
        hover:shadow-lg hover:shadow-cyan-500/20
        animate-fade-in
      `}
      style={{
        animationDelay: `${delay * 100}ms`,
      }}
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${gradient}`}
      />

      {/* Icon */}
      <div className="relative mb-4">
        <div className={`inline-block p-3 rounded-lg bg-gradient-to-br ${gradient}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};
