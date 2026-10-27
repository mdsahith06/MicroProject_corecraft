import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreLabs: () => void;
}

export function Hero({ onExploreLabs }: HeroProps) {
  // Live mini-sandbox right on the hero card
  const [nibble, setNibble] = useState<number[]>([1, 0, 1, 0]); // 10 in binary (0b1010)

  const toggleBit = (index: number) => {
    const updated = [...nibble];
    updated[index] = updated[index] === 1 ? 0 : 1;
    setNibble(updated);
  };

  const decimalValue = nibble.reduce((acc, bit, idx) => acc + bit * Math.pow(2, 3 - idx), 0);
  const onesCount = nibble.filter((b) => b === 1).length;
  const isEvenOnes = onesCount % 2 === 0;

  return (
    <section id="home" className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      {/* Ambient maroon aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-rose-950/40 via-red-950/30 to-purple-950/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#180610] border border-rose-950/80 text-rose-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Interactive CS Pedagogy</span>
              <span className="text-rose-900">|</span>
              <span className="text-rose-400 font-semibold">B.Tech Curriculum</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Computer Science,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-rose-400 to-rose-600">
                Visualised.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-rose-200/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Stop memorizing abstract theorems for your semester exams. Interact directly with radix
              representation, state transition graphs, and algorithmic scaling laws.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreLabs}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white font-bold text-sm transition-all shadow-lg shadow-rose-950/60 hover:shadow-rose-900/60 flex items-center gap-2 border border-rose-500/30"
              >
                Launch Interactive Labs <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                href="#modules"
                className="px-5 py-3.5 rounded-xl bg-[#16060e]/80 hover:bg-[#200914] border border-rose-950/70 text-rose-200/90 hover:text-white font-medium text-sm transition"
              >
                Browse Syllabus Modules
              </a>
            </div>

            {/* Curriculum Pill Badges */}
            <div className="pt-6 border-t border-rose-950/50 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-rose-300/60">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                COA (Computer Architecture)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                FLAT (Formal Languages)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                DAA (Algorithm Analysis)
              </span>
            </div>
          </div>

          {/* Right Column: Live Interactive Sandbox Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative subtle border glow */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-rose-900/40 via-red-900/30 to-purple-900/30 blur-xl opacity-60" />

              <div className="relative bg-[#14050d]/90 border border-rose-950/70 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-rose-950/60 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-600/80" />
                    <div className="w-3 h-3 rounded-full bg-rose-400/80" />
                    <div className="w-3 h-3 rounded-full bg-rose-200/80" />
                    <span className="ml-2 text-xs font-mono text-rose-300/60">live-preview.wasm</span>
                  </div>
                  <span className="text-[11px] font-mono text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-800/40">
                    Interactive
                  </span>
                </div>

                {/* 4-Bit Live Switcher */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-rose-300/70">4-Bit Interactive Nibble:</span>
                    <span className="text-xs font-mono text-rose-400/50">Click bit to toggle</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {nibble.map((bit, idx) => {
                      const weight = Math.pow(2, 3 - idx);
                      return (
                        <button
                          key={idx}
                          onClick={() => toggleBit(idx)}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all select-none ${
                            bit === 1
                              ? 'bg-rose-950/80 border-rose-600/70 text-rose-200 ring-1 ring-rose-500/30 shadow-md shadow-rose-950/50'
                              : 'bg-[#0a0306]/70 border-rose-950 text-rose-400/40 hover:border-rose-900'
                          }`}
                        >
                          <span className="text-[10px] font-mono text-rose-400/50">2^{3 - idx}</span>
                          <span className="text-2xl font-bold font-mono my-0.5">{bit}</span>
                          <span className="text-[10px] font-mono opacity-60">+{weight}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Computed Stats */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-[#0a0306]/70 border border-rose-950/80">
                    <span className="text-[11px] font-mono text-rose-400/60 block">Decimal Value</span>
                    <div className="text-2xl font-bold font-mono text-white mt-1">
                      {decimalValue}
                      <span className="text-xs text-rose-400/60 font-normal ml-1.5">₁₀</span>
                    </div>
                    <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                      Hex: 0x{decimalValue.toString(16).toUpperCase()}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0a0306]/70 border border-rose-950/80">
                    <span className="text-[11px] font-mono text-rose-400/60 block">Automaton State</span>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                          isEvenOnes
                            ? 'bg-rose-950/80 text-rose-200 border border-rose-500/50'
                            : 'bg-pink-950/80 text-pink-200 border border-pink-500/50'
                        }`}
                      >
                        {isEvenOnes ? 'q₀' : 'q₁'}
                      </div>
                      <span className="text-xs font-semibold text-rose-100">
                        {isEvenOnes ? 'Accepted' : 'Rejected'}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-rose-300/60 mt-1 block">
                      {onesCount} ones ({isEvenOnes ? 'Even' : 'Odd'})
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-rose-300/60 flex items-center gap-2 pt-1">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Real computational models behind every pixel.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
