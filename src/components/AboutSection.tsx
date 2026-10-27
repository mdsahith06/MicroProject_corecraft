import React from 'react';
import { Eye, Zap, GraduationCap, CheckCircle2 } from 'lucide-react';

export function AboutSection() {
  const principles = [
    {
      icon: Eye,
      title: 'Explorable Explanations',
      desc: 'Active learning beats passive memorization. Rather than reading about a state machine or Big O curve, you adjust the input and directly observe the consequences.',
    },
    {
      icon: Zap,
      title: 'Zero Latency & Client-Side',
      desc: 'Every algorithm and state machine runs in real time directly within your web browser. No backend delays, no rate limits, and zero external trackers.',
    },
    {
      icon: GraduationCap,
      title: 'Rigorous Curriculum Alignment',
      desc: 'Engineered specifically for engineering students navigating Computer Architecture (COA), Theory of Computation (FLAT), and Algorithms (DAA).',
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#0a0306] border-t border-rose-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Rationale */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
              Pedagogy & Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Making Abstract Computational Models Concrete.
            </h2>
            <p className="text-sm sm:text-base text-rose-200/60 leading-relaxed">
              Standard computer science education often forces students into a false dilemma: either
              endure wall-to-wall textbook definitions or get lost in low-level debugger step traces.
              CoreCraft provides a third path: interactive micro-worlds where the underlying axioms of
              computing can be touched and observed.
            </p>

            <div className="space-y-4 pt-4">
              {principles.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-[#16060f] border border-rose-950 text-rose-400 shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-0.5">{p.title}</h3>
                      <p className="text-xs sm:text-sm text-rose-200/60 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Key Takeaways Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#14050d]/80 border border-rose-950/70 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-xl space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-rose-400" />
                Semester Exam Survival Guide
              </h3>

              <div className="space-y-3 text-xs text-rose-200/70">
                <div className="p-3 rounded-xl bg-[#0a0306]/70 border border-rose-950">
                  <strong className="text-rose-100 block mb-1">COA Number Systems</strong>
                  Hexadecimal is base 16: each hex digit maps directly to exactly 4 binary bits (one
                  nibble). Memorize <code>1111₂ = F₁₆ = 15₁₀</code> to save calculation time.
                </div>

                <div className="p-3 rounded-xl bg-[#0a0306]/70 border border-rose-950">
                  <strong className="text-rose-100 block mb-1">FLAT Automata Parity</strong>
                  The empty string <code>ε</code> contains zero 1s. Zero is an even number, meaning the
                  initial state must be designated as an accepting state.
                </div>

                <div className="p-3 rounded-xl bg-[#0a0306]/70 border border-rose-950">
                  <strong className="text-rose-100 block mb-1">DAA Asymptotic Growth</strong>
                  As <code>n</code> scales to thousands, algorithm complexity class dominates over
                  hardware speed. An <code>O(n log n)</code> sort on a slow laptop beats an{' '}
                  <code>O(n²)</code> sort on a supercomputer.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
