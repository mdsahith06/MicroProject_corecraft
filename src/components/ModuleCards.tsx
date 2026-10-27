import React from 'react';
import { Binary, Waypoints, Layers3, ArrowRight } from 'lucide-react';

interface ModuleCardsProps {
  onSelectModule: (module: 'coa' | 'flat' | 'daa') => void;
}

export function ModuleCards({ onSelectModule }: ModuleCardsProps) {
  const modules = [
    {
      id: 'coa' as const,
      code: 'COA',
      course: 'Computer Organization & Architecture',
      title: 'Number Systems & Radix Arithmetic',
      desc: 'Understand how electronic logic represents data. Transition seamlessly between binary, octal, decimal, and hexadecimal with positional weights and 8-bit switchboards.',
      icon: Binary,
      accent: 'rose',
      tag: 'Representation & Storage',
      topics: ['Positional Base Arithmetic', '8-Bit Byte & Nibble Splitting', 'Safe Integer Ranges'],
    },
    {
      id: 'flat' as const,
      code: 'FLAT',
      course: 'Formal Languages & Automata Theory',
      title: 'Finite State Machines & Parity DFAs',
      desc: 'Trace a deterministic finite automaton processing binary alphabet strings. Observe state transitions between accepting state q₀ (even ones) and non-accepting state q₁ (odd ones).',
      icon: Waypoints,
      accent: 'pink',
      tag: 'Computation Models',
      topics: ['5-Tuple Formal Definition', 'Transition Step Simulation', 'Language Recognition'],
    },
    {
      id: 'daa' as const,
      code: 'DAA',
      course: 'Design & Analysis of Algorithms',
      title: 'Big O Complexity & Asymptotic Growth',
      desc: 'Compare asymptotic scaling laws without benchmark noise. Discover how O(1), O(log n), O(n), O(n log n), and O(n²) diverge as dataset sizes scale into millions.',
      icon: Layers3,
      accent: 'amber',
      tag: 'Algorithmic Efficiency',
      topics: ['Order of Growth Classes', 'Theoretical CPU Clock Cycles', 'Canonical Code Snippets'],
    },
  ];

  return (
    <section id="modules" className="py-20 bg-[#0a0306] border-t border-rose-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400 mb-2">
              Curriculum Modules
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Three Core Pillars of Computer Science
            </h2>
          </div>
          <p className="text-sm sm:text-base text-rose-200/60 max-w-md">
            Built directly around standard university CS curricula. Click any module to jump straight
            into its interactive simulation environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                className="group relative bg-[#13050d]/70 hover:bg-[#1a0711] border border-rose-950/70 hover:border-rose-800/80 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#1e0714] text-rose-300 font-semibold border border-rose-950">
                      {m.code}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        m.accent === 'rose'
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-700/50'
                          : m.accent === 'pink'
                          ? 'bg-pink-950/80 text-pink-300 border border-pink-700/50'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-700/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-rose-400/50 uppercase tracking-wider block mb-1">
                    {m.course}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-rose-200/60 leading-relaxed mb-4">
                    {m.desc}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-rose-950/60 mb-6">
                    {m.topics.map((t) => (
                      <div key={t} className="text-xs text-rose-200/50 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-rose-900" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectModule(m.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1d0613] hover:bg-rose-600 hover:text-white text-rose-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all group/btn border border-rose-950/80"
                >
                  Open {m.code} Lab
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
