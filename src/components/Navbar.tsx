import React, { useState } from 'react';
import { Terminal, Github, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onSelectModule: (module: 'coa' | 'flat' | 'daa') => void;
}

export function Navbar({ onSelectModule }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c0407]/85 backdrop-blur-md border-b border-rose-950/40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 via-rose-700 to-rose-950 flex items-center justify-center text-white shadow-md shadow-rose-950/50 group-hover:scale-105 transition-transform border border-rose-500/30">
            <Terminal className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="font-bold text-lg text-white tracking-tight">
            CoreCraft<span className="text-rose-500">.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-rose-200/70">
          <button
            onClick={() => scrollTo('modules')}
            className="hover:text-white transition-colors"
          >
            Modules
          </button>
          <button
            onClick={() => scrollTo('lab')}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            Interactive Lab
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="hover:text-white transition-colors"
          >
            About & Pedagogy
          </button>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg border border-rose-950/60 hover:border-rose-900 bg-[#16060d]/70 hover:bg-[#200913] text-rose-200/80 hover:text-white text-xs font-mono flex items-center gap-2 transition"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Open Source</span>
          </a>
          <button
            onClick={() => {
              onSelectModule('coa');
              scrollTo('lab');
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white font-semibold text-xs transition shadow-md shadow-rose-950/60 flex items-center gap-1.5 border border-rose-500/30"
          >
            Launch Lab <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-rose-300 hover:text-white rounded-lg hover:bg-rose-950/40"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-b border-rose-950/60 bg-[#0c0407] px-4 py-4 space-y-3">
          <button
            onClick={() => scrollTo('modules')}
            className="block w-full text-left py-2 text-sm text-rose-200 hover:text-white"
          >
            Modules
          </button>
          <button
            onClick={() => scrollTo('lab')}
            className="block w-full text-left py-2 text-sm text-rose-200 hover:text-white"
          >
            Interactive Lab
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="block w-full text-left py-2 text-sm text-rose-200 hover:text-white"
          >
            About & Pedagogy
          </button>
          <div className="pt-2 border-t border-rose-950/60 flex items-center justify-between">
            <button
              onClick={() => {
                onSelectModule('coa');
                scrollTo('lab');
              }}
              className="w-full py-2.5 rounded-xl bg-rose-600 text-white font-semibold text-xs text-center shadow-lg shadow-rose-950/50"
            >
              Launch Lab
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
