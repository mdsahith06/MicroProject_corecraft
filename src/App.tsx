import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ModuleCards } from './components/ModuleCards';
import { NumberSystemsLab } from './components/labs/NumberSystemsLab';
import { AutomataLab } from './components/labs/AutomataLab';
import { ComplexityLab } from './components/labs/ComplexityLab';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { Binary, Waypoints, Layers3, Sparkles } from 'lucide-react';

export type ModuleId = 'coa' | 'flat' | 'daa';

export function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('coa');

  const handleSelectModule = (id: ModuleId) => {
    setActiveModule(id);
    const labEl = document.getElementById('lab');
    if (labEl) {
      labEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const moduleTabs = [
    {
      id: 'coa' as const,
      code: 'COA',
      title: 'Number Systems',
      subtitle: 'Radix & Bit Representation',
      icon: Binary,
      color: 'rose',
    },
    {
      id: 'flat' as const,
      code: 'FLAT',
      title: 'Even-Ones DFA',
      subtitle: 'Deterministic State Machine',
      icon: Waypoints,
      color: 'pink',
    },
    {
      id: 'daa' as const,
      code: 'DAA',
      title: 'Big O Explorer',
      subtitle: 'Asymptotic Order of Growth',
      icon: Layers3,
      color: 'amber',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0c0407] text-rose-50 flex flex-col selection:bg-rose-900/60 selection:text-rose-100">
      <Navbar onSelectModule={handleSelectModule} />

      <main className="flex-1">
        <Hero onExploreLabs={() => handleSelectModule('coa')} />
        <ModuleCards onSelectModule={handleSelectModule} />

        {/* Interactive Lab Section */}
        <section id="lab" className="py-20 bg-[#080204]/90 border-t border-rose-950/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16060f] border border-rose-950 text-rose-300 text-xs font-mono mb-3">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Simulation Workbench</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                The Interactive Virtual Lab
              </h2>
              <p className="text-sm sm:text-base text-rose-200/60 mt-2">
                Select a domain below to manipulate parameters, trace transitions, and build genuine
                computational intuition.
              </p>
            </div>

            {/* Lab Switcher Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-12">
              {moduleTabs.map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeModule === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveModule(tab.id)}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? tab.color === 'rose'
                          ? 'bg-rose-950/90 border-rose-500/80 ring-1 ring-rose-500/30 shadow-lg shadow-rose-950/80 text-white'
                          : tab.color === 'pink'
                          ? 'bg-pink-950/90 border-pink-500/80 ring-1 ring-pink-500/30 shadow-lg shadow-pink-950/80 text-white'
                          : 'bg-amber-950/90 border-amber-500/80 ring-1 ring-amber-500/30 shadow-lg shadow-amber-950/80 text-white'
                        : 'bg-[#14050d]/60 border-rose-950 text-rose-300/50 hover:border-rose-900 hover:text-rose-200'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? tab.color === 'rose'
                            ? 'bg-rose-900/60 text-rose-200'
                            : tab.color === 'pink'
                            ? 'bg-pink-900/60 text-pink-200'
                            : 'bg-amber-900/60 text-amber-200'
                          : 'bg-[#1c0812] text-rose-400/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1e0714] text-rose-300 font-bold border border-rose-950">
                          {tab.code}
                        </span>
                        <span className="font-bold text-sm text-white truncate">{tab.title}</span>
                      </div>
                      <div className="text-[11px] text-rose-300/60 truncate mt-0.5">
                        {tab.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Lab Component */}
            <div className="bg-[#12050b]/80 border border-rose-950/70 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
              {activeModule === 'coa' && <NumberSystemsLab />}
              {activeModule === 'flat' && <AutomataLab />}
              {activeModule === 'daa' && <ComplexityLab />}
            </div>
          </div>
        </section>

        <AboutSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
