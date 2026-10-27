import React from 'react';
import { Terminal, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-rose-950/40 bg-[#080204] py-12 text-rose-300/50 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-rose-950/80 text-rose-300 border border-rose-800/40 flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white text-sm">
              CoreCraft<span className="text-rose-500">.</span>
            </span>
            <span className="text-rose-950">|</span>
            <span>Interactive Computer Science Education</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#modules" className="hover:text-rose-200 transition-colors">
              Modules
            </a>
            <a href="#lab" className="hover:text-rose-200 transition-colors">
              Interactive Lab
            </a>
            <a href="#about" className="hover:text-rose-200 transition-colors">
              About
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-rose-950/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-rose-400/40 font-mono">
          <div>
            © {new Date().getFullYear()} CoreCraft. Released under MIT License for academic and self-study use.
          </div>
          <div className="flex items-center gap-1">
            <span>Built for engineering students worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
