'use client';

import React from 'react';
import Image from 'next/image';
import { Linkedin, Mail, Globe } from 'lucide-react';

export const FoundersSection: React.FC = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 py-16 sm:py-20 md:py-32 bg-gradient-to-b from-zinc-950 via-black to-zinc-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-rubik
                       text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400
                       mb-3 sm:mb-4 leading-tight"
          >
            Meet the Founder
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Visionary behind TelemetryTrade&apos;s 4D Intelligence framework
          </p>
        </div>

        {/* Founder Card */}
        <div className="max-w-5xl mx-auto">
          <div
            className="group relative overflow-hidden rounded-2xl border border-zinc-800/50 
                       bg-gradient-to-br from-zinc-900/80 to-black/80 backdrop-blur-sm
                       transition-all duration-500 hover:border-cyan-500/50 
                       hover:shadow-2xl hover:shadow-cyan-500/20"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-cyan-500 to-blue-500" />

            {/* Content - Responsive Layout */}
            <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-6 sm:gap-8 items-center">
                {/* Profile Image */}
                <a href="https://www.sbali.tech/" target="_blank" rel="noopener noreferrer" className="block z-10">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto md:mx-0">
                    <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-cyan-500/30 shadow-xl cursor-pointer">
                      <Image
                        src="/Images/Founder.jpeg"
                        alt="Siddhant Bali - Founder"
                        width={192}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 blur-2xl -z-10" />
                  </div>
                </a>

                {/* Info */}
                <div className="text-center md:text-left space-y-3 sm:space-y-4">
                  <div>
                    <a
                      href="https://www.sbali.tech/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block z-10 cursor-pointer"
                    >
                      <h3 className="text-3xl sm:text-4xl md:text-4xl text-white font-rubik">
                        Siddhant Bali
                      </h3>
                    </a>

                    <p className="text-cyan-400 text-lg sm:text-xl font-medium mt-2">
                      Founder & Lead Developer
                    </p>
                  </div>

                  <div className="space-y-1.5 text-gray-300 text-sm sm:text-base">
                    <p>GenAI & Agentic AI Web Developer × Researcher</p>
                    <p>Dean&apos;s List&apos;25 IIIT-Delhi | CSD 2026 Batch</p>
                    <p>Human-Centered Systems, Product Design, Linux & Cloud</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto md:mx-0">
                    Full-stack developer with ~2 years of production engineering experience, 
                    specializing in building scalable, secure, and high-performance web platforms. 
                    Delivered production-ready solutions for labs, institutions, and organizations 
                    that require reliability at scale.
                  </p>

                  {/* Links */}
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                    <a
                      href="https://www.sbali.tech/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 
                               text-white text-sm font-medium cursor-pointer z-10"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Visit Website</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/kintsugi-programmer/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg border border-zinc-700 
                               text-gray-300 text-sm font-medium cursor-pointer z-10"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>

                    <a
                      href="mailto:kintsugiprogrammer@gmail.com"
                      className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg border border-zinc-700 
                               text-gray-300 text-sm font-medium cursor-pointer z-10"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Contact</span>
                    </a>
                  </div>

                  {/* Achievements */}
                  <div className="mt-6 pt-6 border-t border-zinc-800">
                    <p className="text-xs text-gray-500 mb-3">Key Achievements</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {[
                        'Distinguished Dean&#39;s List Award',
                        '1000+ GitHub Commits',
                        'Lead Developer @ IIITD',
                        'Production Systems @ AIIMS',
                      ].map((achievement) => (
                        <span
                          key={achievement}
                          className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>
        </div>

        {/* Quote */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-gray-400 text-sm sm:text-base italic">
            &quot;Not empty, just exclusive. My most private repos run the show. 🚀&quot;
          </p>
        </div>
      </div>
    </section>
  );
};
