'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function JoinWaitlist() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      
      if (result.success) {
        setIsSubmitted(true);
        setEmail('');
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-6 md:px-12 py-20 my-12">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-blue-500/10 border border-teal-500/20 backdrop-blur-sm">
          {/* Animated background effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-transparent to-cyan-500/5 animate-pulse" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-700" />
          
          <div className="relative z-10 px-8 md:px-16 py-16 md:py-20 text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/50 animate-bounce">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Join the Waitlist
            </h2>
            
            <p className="text-lg md:text-xl text-gray-300 mb-2 max-w-2xl mx-auto">
              Be the first to experience the future of trading
            </p>
            <p className="text-sm md:text-base text-gray-400 mb-10 max-w-xl mx-auto">
              Get early access to exclusive features, real-time insights, and be part of our growing community
            </p>

            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/50 transition backdrop-blur-sm"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Joining...</span>
                      </>
                    ) : (
                      <>
                        <span>Join Now</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  By joining, you agree to receive updates about TelemetryTrade
                </p>
              </form>
            ) : (
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-green-500/20 border border-green-500/50 text-green-400 animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="font-semibold">You're on the waitlist!</span>
                </div>
              </div>
            )}

            {/* Stats/Trust indicators */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-teal-400 mb-1">1000+</div>
                  <div className="text-xs md:text-sm text-gray-400">Early Adopters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">24/7</div>
                  <div className="text-xs md:text-sm text-gray-400">Real-time Updates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">100%</div>
                  <div className="text-xs md:text-sm text-gray-400">Free to Join</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
