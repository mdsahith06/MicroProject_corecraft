import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Waypoints,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  FastForward,
} from 'lucide-react';

export function AutomataLab() {
  const [inputString, setInputString] = useState<string>('1010');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(800); // ms per step
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isValidBinary = /^[01]*$/.test(inputString);
  const bits = useMemo(() => inputString.split(''), [inputString]);

  // Compute states at each step: states[0] is start state (0 = q0/A, 1 = q1/B)
  const stateSequence = useMemo(() => {
    let s = 0; // 0 = A (even), 1 = B (odd)
    const seq = [0];
    for (const bit of bits) {
      if (bit === '1') {
        s = 1 - s;
      }
      seq.push(s);
    }
    return seq;
  }, [bits]);

  const boundedStep = Math.max(0, Math.min(currentStep, bits.length));
  const currentState = stateSequence[boundedStep] ?? 0;
  const isFinished = boundedStep === bits.length;
  const isAccepted = isFinished && currentState === 0;

  // Active transition info (which transition was just traversed or is being scanned)
  const lastBitRead = boundedStep > 0 ? bits[boundedStep - 1] : null;
  const previousState = boundedStep > 0 ? stateSequence[boundedStep - 1] : null;

  // Auto-play effect
  useEffect(() => {
    if (isPlaying) {
      if (currentStep >= bits.length) {
        setIsPlaying(false);
        return;
      }
      timerRef.current = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, speed);
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStep, bits.length, speed]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleStepForward = () => {
    if (currentStep < bits.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const presets = [
    { label: 'Empty (ε)', val: '', desc: '0 ones (even) -> Accept' },
    { label: '1010', val: '1010', desc: '2 ones (even) -> Accept' },
    { label: '11100', val: '11100', desc: '3 ones (odd) -> Reject' },
    { label: '101111', val: '101111', desc: '5 ones (odd) -> Reject' },
    { label: '1111000', val: '1111000', desc: '4 ones (even) -> Accept' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-800/40 text-pink-300 text-xs font-mono uppercase tracking-wider mb-2">
          <Waypoints className="w-3.5 h-3.5" /> Module 02 · State Machines
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Deterministic Finite Automata (Even-Ones DFA)
        </h2>
        <p className="text-rose-200/60 text-sm sm:text-base mt-1 max-w-2xl">
          A DFA processes an input string symbol-by-symbol through a finite set of states. This
          automaton decides language <code>L = &#123; w ∈ &#123;0, 1&#125;* | |w|₁ is even &#125;</code>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Automaton Diagram & Simulation */}
        <div className="lg:col-span-7 space-y-6">
          {/* SVG Diagram Canvas */}
          <div className="bg-[#14050d]/80 border border-rose-950/70 rounded-2xl p-5 sm:p-6 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-300/70">
                State Transition Diagram
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 text-rose-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  {currentState === 0 ? 'State q₀ (Even)' : 'State q₁ (Odd)'}
                </span>
              </div>
            </div>

            {/* SVG Visualizer */}
            <div className="w-full aspect-[2/1] sm:aspect-[2.4/1] relative flex items-center justify-center py-2">
              <svg viewBox="0 0 500 220" className="w-full h-full max-h-[260px] select-none">
                <defs>
                  {/* Arrow markers */}
                  <marker
                    id="arrowhead"
                    markerWidth="8"
                    markerHeight="6"
                    refX="7"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3, 0 6" fill="#881337" />
                  </marker>
                  <marker
                    id="arrowhead-active-rose"
                    markerWidth="8"
                    markerHeight="6"
                    refX="7"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3, 0 6" fill="#f43f5e" />
                  </marker>
                </defs>

                {/* Start Arrow pointing to q0 */}
                <path
                  d="M 40 110 L 95 110"
                  stroke="#fda4af"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                  fill="none"
                />
                <text x="50" y="100" fill="#fda4af" fontSize="12" fontFamily="monospace">
                  Start
                </text>

                {/* Self-loop on q0 for bit '0' */}
                <path
                  d="M 125 75 C 90 20, 170 20, 140 75"
                  stroke={previousState === 0 && lastBitRead === '0' ? '#f43f5e' : '#4c0519'}
                  strokeWidth={previousState === 0 && lastBitRead === '0' ? '3' : '2'}
                  fill="none"
                  markerEnd={
                    previousState === 0 && lastBitRead === '0'
                      ? 'url(#arrowhead-active-rose)'
                      : 'url(#arrowhead)'
                  }
                />
                <text
                  x="132"
                  y="28"
                  fill={previousState === 0 && lastBitRead === '0' ? '#f43f5e' : '#fda4af'}
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  0
                </text>

                {/* Self-loop on q1 for bit '0' */}
                <path
                  d="M 345 75 C 310 20, 390 20, 360 75"
                  stroke={previousState === 1 && lastBitRead === '0' ? '#f43f5e' : '#4c0519'}
                  strokeWidth={previousState === 1 && lastBitRead === '0' ? '3' : '2'}
                  fill="none"
                  markerEnd={
                    previousState === 1 && lastBitRead === '0'
                      ? 'url(#arrowhead-active-rose)'
                      : 'url(#arrowhead)'
                  }
                />
                <text
                  x="352"
                  y="28"
                  fill={previousState === 1 && lastBitRead === '0' ? '#f43f5e' : '#fda4af'}
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  0
                </text>

                {/* Arc q0 -> q1 for bit '1' (Top curve) */}
                <path
                  d="M 165 92 Q 240 50, 312 92"
                  stroke={previousState === 0 && lastBitRead === '1' ? '#f43f5e' : '#4c0519'}
                  strokeWidth={previousState === 0 && lastBitRead === '1' ? '3' : '2'}
                  fill="none"
                  markerEnd={
                    previousState === 0 && lastBitRead === '1'
                      ? 'url(#arrowhead-active-rose)'
                      : 'url(#arrowhead)'
                  }
                />
                <text
                  x="238"
                  y="62"
                  fill={previousState === 0 && lastBitRead === '1' ? '#f43f5e' : '#fda4af'}
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  1
                </text>

                {/* Arc q1 -> q0 for bit '1' (Bottom curve) */}
                <path
                  d="M 312 128 Q 240 170, 165 128"
                  stroke={previousState === 1 && lastBitRead === '1' ? '#f43f5e' : '#4c0519'}
                  strokeWidth={previousState === 1 && lastBitRead === '1' ? '3' : '2'}
                  fill="none"
                  markerEnd={
                    previousState === 1 && lastBitRead === '1'
                      ? 'url(#arrowhead-active-rose)'
                      : 'url(#arrowhead)'
                  }
                />
                <text
                  x="238"
                  y="165"
                  fill={previousState === 1 && lastBitRead === '1' ? '#f43f5e' : '#fda4af'}
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  1
                </text>

                {/* State q0 (Even / Accept State - Double Circle) */}
                <g className="cursor-pointer">
                  {/* Outer ring */}
                  <circle
                    cx="135"
                    cy="110"
                    r="40"
                    fill={currentState === 0 ? '#4c0519' : '#14050d'}
                    stroke={currentState === 0 ? '#f43f5e' : '#5c1226'}
                    strokeWidth="2.5"
                    className="transition-colors duration-300"
                  />
                  {/* Accepting inner ring */}
                  <circle
                    cx="135"
                    cy="110"
                    r="33"
                    fill="none"
                    stroke={currentState === 0 ? '#f43f5e' : '#5c1226'}
                    strokeWidth="1.5"
                    className="transition-colors duration-300"
                  />
                  <text
                    x="135"
                    y="114"
                    fill="#fff1f2"
                    fontSize="18"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    q₀
                  </text>
                  <text
                    x="135"
                    y="165"
                    fill="#fda4af"
                    fontSize="11"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                    fontWeight="500"
                  >
                    Even (Accept)
                  </text>
                </g>

                {/* State q1 (Odd / Reject State - Single Circle) */}
                <g className="cursor-pointer">
                  <circle
                    cx="345"
                    cy="110"
                    r="40"
                    fill={currentState === 1 ? '#4c0519' : '#14050d'}
                    stroke={currentState === 1 ? '#f43f5e' : '#5c1226'}
                    strokeWidth="2.5"
                    className="transition-colors duration-300"
                  />
                  <text
                    x="345"
                    y="114"
                    fill="#fff1f2"
                    fontSize="18"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    q₁
                  </text>
                  <text
                    x="345"
                    y="165"
                    fill="#fda4af"
                    fontSize="11"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                    fontWeight="500"
                  >
                    Odd (Reject)
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* Input Tape & Execution Stepper */}
          <div className="bg-[#14050d]/80 border border-rose-950/70 rounded-2xl p-5 sm:p-6 backdrop-blur-sm shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-300/70">
                Simulation Tape
              </span>
              <span className="text-xs font-mono text-rose-400/50">
                Step {boundedStep} of {bits.length}
              </span>
            </div>

            {/* Tape Visualization */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-2 px-1 min-h-[56px]">
              {bits.length > 0 ? (
                bits.map((bit, idx) => {
                  const isConsumed = idx < boundedStep;
                  const isCurrent = idx === boundedStep && !isFinished;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStep(idx + 1);
                      }}
                      className={`w-10 h-11 rounded-lg font-mono text-lg font-bold flex flex-col items-center justify-center transition-all border ${
                        isCurrent
                          ? 'bg-rose-950/90 border-rose-500 text-rose-100 ring-2 ring-rose-500/30 shadow-lg shadow-rose-950/60'
                          : isConsumed
                          ? 'bg-[#1e0714] border-rose-950 text-rose-300/60'
                          : 'bg-[#0a0306]/70 border-rose-950 text-rose-400/40'
                      }`}
                      title={`Jump to step ${idx + 1}`}
                    >
                      <span>{bit}</span>
                      <span className="text-[9px] font-normal text-rose-400/50 -mt-1">{idx}</span>
                    </button>
                  );
                })
              ) : (
                <div className="text-xs text-rose-400/50 italic py-2">
                  [Empty String ε] · Machine stays in start state q₀
                </div>
              )}
            </div>

            {/* Playback Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={!isValidBinary || isFinished}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 disabled:opacity-40 text-white font-medium text-xs flex items-center gap-2 transition shadow-md shadow-rose-950/60 border border-rose-500/30"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Pause' : 'Auto-Run'}
                </button>

                <button
                  onClick={handleStepBackward}
                  disabled={boundedStep <= 0}
                  className="p-2 rounded-xl bg-[#1e0714] hover:bg-rose-950 disabled:opacity-40 text-rose-200 transition border border-rose-950"
                  title="Step Backward"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleStepForward}
                  disabled={isFinished || !isValidBinary}
                  className="p-2 rounded-xl bg-[#1e0714] hover:bg-rose-950 disabled:opacity-40 text-rose-200 transition border border-rose-950"
                  title="Step Forward"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleReset}
                  className="p-2 rounded-xl bg-[#1e0714] hover:bg-rose-950 text-rose-200 transition border border-rose-950"
                  title="Reset Simulation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Speed Controller */}
              <div className="flex items-center gap-1.5 text-xs text-rose-300/70 font-mono">
                <FastForward className="w-3.5 h-3.5 text-rose-400/50" />
                <span>Speed:</span>
                {[
                  { label: '0.5x', ms: 1200 },
                  { label: '1x', ms: 750 },
                  { label: '2x', ms: 350 },
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSpeed(s.ms)}
                    className={`px-2 py-1 rounded text-[11px] transition ${
                      speed === s.ms
                        ? 'bg-rose-950/80 text-rose-200 font-bold border border-rose-500/40'
                        : 'bg-[#1a0712] text-rose-400/50 hover:text-white border border-rose-950'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Verdict Status Box */}
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
                !isValidBinary
                  ? 'bg-rose-950/30 border-rose-700/60 text-rose-200'
                  : isFinished
                  ? isAccepted
                    ? 'bg-rose-950/40 border-rose-500/70 text-rose-100 shadow-md shadow-rose-950/50'
                    : 'bg-amber-950/30 border-amber-700/60 text-amber-200'
                  : 'bg-[#0a0306]/70 border-rose-950 text-rose-200'
              }`}
            >
              {isFinished ? (
                isAccepted ? (
                  <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                )
              ) : (
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0 mt-1.5 animate-pulse" />
              )}
              <div>
                <div className="font-semibold text-sm">
                  {!isValidBinary
                    ? 'Invalid Binary String'
                    : isFinished
                    ? isAccepted
                      ? 'String Accepted (Even Count of 1s)'
                      : 'String Rejected (Odd Count of 1s)'
                    : `Currently in State q${currentState}`}
                </div>
                <div className="text-xs opacity-80 mt-0.5">
                  {!isValidBinary
                    ? 'Only binary digits 0 and 1 are permitted in Σ = {0, 1}.'
                    : isFinished
                    ? isAccepted
                      ? 'The automaton halted in accepting state q₀. The count of 1s is even.'
                      : 'The automaton halted in rejecting state q₁. The count of 1s is odd.'
                    : `Next transition will evaluate input bit "${bits[boundedStep]}".`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Custom Input & Formal Spec */}
        <div className="lg:col-span-5 space-y-5">
          {/* Input Box */}
          <div className="bg-[#14050d]/80 border border-rose-950/70 rounded-2xl p-5 sm:p-6 backdrop-blur-sm shadow-xl space-y-4">
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-rose-200">
              Binary Input String
            </label>

            <div className="relative">
              <input
                type="text"
                value={inputString}
                onChange={(e) => {
                  setInputString(e.target.value.replace(/[^01]/g, ''));
                  handleReset();
                }}
                placeholder="e.g. 1010"
                className="w-full bg-[#0a0306]/90 border border-rose-950 rounded-xl px-4 py-3 font-mono text-white text-lg outline-none focus:border-rose-500/70 focus:ring-2 focus:ring-rose-500/20"
                spellCheck={false}
              />
            </div>

            {/* Keypad Buttons */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => {
                  setInputString((prev) => prev + '0');
                  handleReset();
                }}
                className="py-2 rounded-xl bg-[#1e0714] hover:bg-rose-950 text-white font-mono text-sm font-bold border border-rose-950"
              >
                + 0
              </button>
              <button
                onClick={() => {
                  setInputString((prev) => prev + '1');
                  handleReset();
                }}
                className="py-2 rounded-xl bg-[#1e0714] hover:bg-rose-950 text-white font-mono text-sm font-bold border border-rose-950"
              >
                + 1
              </button>
              <button
                onClick={() => {
                  setInputString((prev) => prev.slice(0, -1));
                  handleReset();
                }}
                className="py-2 rounded-xl bg-[#17060f] hover:bg-[#250818] text-rose-300/70 hover:text-white text-xs font-mono border border-rose-950"
              >
                ⌫ Del
              </button>
              <button
                onClick={() => {
                  setInputString('');
                  handleReset();
                }}
                className="py-2 rounded-xl bg-[#17060f] hover:bg-[#250818] text-rose-300/70 hover:text-white text-xs font-mono border border-rose-950"
              >
                Clear
              </button>
            </div>

            {/* Presets */}
            <div className="pt-3 border-t border-rose-950/60 space-y-2">
              <span className="text-xs text-rose-400/50 font-mono">Curated Test Cases:</span>
              <div className="grid grid-cols-1 gap-1.5">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => {
                      setInputString(p.val);
                      handleReset();
                    }}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#0a0306]/70 hover:bg-[#1f0816] border border-rose-950 text-left transition text-xs"
                  >
                    <span className="font-mono text-white font-medium">{p.label}</span>
                    <span className="text-rose-300/50 text-[11px]">{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Formal CS Specification Drawer */}
          <div className="bg-[#14050d]/80 border border-rose-950/70 rounded-2xl p-5 backdrop-blur-sm text-xs text-rose-200/80 space-y-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-pink-400" />
              Formal 5-Tuple Definition
            </h4>
            <p className="text-rose-200/60 leading-relaxed">
              Formally, this DFA is specified by the 5-tuple <code>M = (Q, Σ, δ, q₀, F)</code>:
            </p>
            <div className="p-3 rounded-lg bg-[#0a0306] font-mono text-[11px] text-rose-300/90 space-y-1 border border-rose-950">
              <div>• Q = &#123; q₀, q₁ &#125; (Set of states)</div>
              <div>• Σ = &#123; 0, 1 &#125; (Input alphabet)</div>
              <div>• q₀ = Start state</div>
              <div>• F = &#123; q₀ &#125; (Accepting states)</div>
              <div>• δ(q₀, 0) = q₀,  δ(q₀, 1) = q₁</div>
              <div>• δ(q₁, 0) = q₁,  δ(q₁, 1) = q₀</div>
            </div>
            <p className="text-rose-200/60 leading-relaxed text-[11px]">
              Notice that reading a <code>0</code> preserves parity (self-loop), while reading a{' '}
              <code>1</code> toggles between even and odd parity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
