import React, { useState, useMemo } from 'react';
import { Binary, Check, Copy, RotateCcw, Sparkles, HelpCircle } from 'lucide-react';

export function NumberSystemsLab() {
  const [value, setValue] = useState<string>('42');
  const [base, setBase] = useState<number>(10);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const baseLabels: Record<number, { name: string; prefix: string; radix: string }> = {
    2: { name: 'Binary', prefix: '0b', radix: 'Base 2' },
    8: { name: 'Octal', prefix: '0o', radix: 'Base 8' },
    10: { name: 'Decimal', prefix: '', radix: 'Base 10' },
    16: { name: 'Hexadecimal', prefix: '0x', radix: 'Base 16' },
  };

  const validation = useMemo(() => {
    const raw = value.trim();
    if (!raw) return { valid: false, reason: 'Enter a number to convert.', num: 0 };

    const regexMap: Record<number, RegExp> = {
      2: /^[01]+$/,
      8: /^[0-7]+$/,
      10: /^\d+$/,
      16: /^[0-9a-fA-F]+$/,
    };

    if (!regexMap[base]?.test(raw)) {
      return {
        valid: false,
        reason: `Invalid digit for ${baseLabels[base]?.name ?? 'selected base'}. Allowed: ${
          base === 2 ? '0, 1' : base === 8 ? '0-7' : base === 10 ? '0-9' : '0-9, A-F'
        }`,
        num: 0,
      };
    }

    const parsed = parseInt(raw, base);
    if (!Number.isSafeInteger(parsed) || parsed < 0) {
      return {
        valid: false,
        reason: 'Please enter a non-negative integer within safe range (≤ 2⁵³ - 1).',
        num: 0,
      };
    }

    return { valid: true, reason: '', num: parsed };
  }, [value, base]);

  const num = validation.valid ? validation.num : 0;

  // 8-bit array representation for the interactive switchboard (0 to 255)
  const isByteRange = num >= 0 && num <= 255 && validation.valid;
  const bits = useMemo(() => {
    const arr = [];
    for (let i = 7; i >= 0; i--) {
      arr.push({
        power: i,
        weight: Math.pow(2, i),
        active: isByteRange ? Boolean((num >> i) & 1) : false,
      });
    }
    return arr;
  }, [num, isByteRange]);

  const toggleBit = (power: number) => {
    let current = validation.valid ? num : 0;
    if (current > 255) current = 0; // reset to 8-bit range for smooth toggling
    const newNum = current ^ (1 << power);
    setBase(10);
    setValue(newNum.toString(10));
  };

  const conversions = useMemo(() => {
    if (!validation.valid) return [];
    return [2, 8, 10, 16].map((b) => ({
      base: b,
      name: baseLabels[b]?.name ?? `Base ${b}`,
      formatted: validation.num.toString(b).toUpperCase(),
      prefix: baseLabels[b]?.prefix ?? '',
    }));
  }, [validation]);

  const handleCopy = (str: string, key: string) => {
    navigator.clipboard.writeText(str);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const presets = [
    { label: '42 (Decimal)', val: '42', b: 10 },
    { label: '127 (7-bit Max)', val: '127', b: 10 },
    { label: '255 (Full Byte)', val: '255', b: 10 },
    { label: '101010 (Binary)', val: '101010', b: 2 },
    { label: 'CAFE (Hex)', val: 'CAFE', b: 16 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/40 text-rose-300 text-xs font-mono uppercase tracking-wider mb-2">
          <Binary className="w-3.5 h-3.5" /> Module 01 · Representation
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Number Systems & Radix Arithmetic
        </h2>
        <p className="text-rose-200/60 text-sm sm:text-base mt-1 max-w-2xl">
          Computers operate entirely in binary voltages, but humans reason in decimal and hex.
          Switch between radices, toggle individual bits, and see place-value mechanics in action.
        </p>
      </div>

      {/* Main Interactive Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input and Base Selector */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#14050d]/80 border border-rose-950/70 rounded-2xl p-5 sm:p-6 backdrop-blur-sm shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs font-semibold text-rose-300 uppercase tracking-wider font-mono">
                Select Input Radix
              </label>
              <span className="text-xs text-rose-400/50">Choose base to type in</span>
            </div>

            {/* Radix Switcher Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
              {[2, 8, 10, 16].map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    if (validation.valid) {
                      setValue(validation.num.toString(b).toUpperCase());
                    }
                    setBase(b);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-left border transition-all ${
                    base === b
                      ? 'bg-rose-950/90 border-rose-500/70 text-rose-100 shadow-md shadow-rose-950/50 ring-1 ring-rose-500/30'
                      : 'bg-[#1b0612]/50 border-rose-950 text-rose-400/50 hover:bg-[#220816] hover:text-rose-200'
                  }`}
                >
                  <div className="text-xs font-semibold">{baseLabels[b]?.name}</div>
                  <div className="text-[10px] font-mono opacity-60">Base {b}</div>
                </button>
              ))}
            </div>

            {/* Input Field */}
            <div className="relative">
              <div
                className={`flex items-center bg-[#0a0306]/90 border rounded-xl px-4 py-3 transition-colors ${
                  !validation.valid
                    ? 'border-rose-500/80 ring-2 ring-rose-500/15'
                    : 'border-rose-950/80 focus-within:border-rose-500/70 focus-within:ring-2 focus-within:ring-rose-500/20'
                }`}
              >
                <span className="text-rose-400/50 font-mono text-sm mr-2 select-none">
                  {baseLabels[base]?.prefix}
                </span>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={`Enter ${baseLabels[base]?.name.toLowerCase()} value`}
                  className="w-full bg-transparent text-white font-mono text-lg sm:text-xl outline-none placeholder:text-rose-900/60"
                  spellCheck={false}
                />
                <button
                  onClick={() => {
                    setValue('42');
                    setBase(10);
                  }}
                  className="p-1.5 text-rose-400/50 hover:text-rose-200 rounded-lg hover:bg-rose-950/40 transition"
                  title="Reset to default"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {!validation.valid && (
                <div className="mt-2 text-xs text-rose-400 flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  {validation.reason}
                </div>
              )}
            </div>

            {/* Presets */}
            <div className="mt-5 pt-4 border-t border-rose-950/60 flex flex-wrap items-center gap-2">
              <span className="text-xs text-rose-400/50 font-mono">Quick Presets:</span>
              {presets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setBase(p.b);
                    setValue(p.val);
                  }}
                  className="text-xs px-2.5 py-1 rounded-lg bg-[#1e0714] hover:bg-[#2a091c] text-rose-200/80 hover:text-white border border-rose-950/70 transition"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive 8-Bit Switchboard */}
          <div className="bg-[#14050d]/80 border border-rose-950/70 rounded-2xl p-5 sm:p-6 backdrop-blur-sm shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-rose-400" />
                  Interactive 8-Bit Switchboard (0–255)
                </h3>
                <p className="text-xs text-rose-200/60 mt-0.5">
                  Click any bit to toggle between 0 and 1. Watch the sum change instantly.
                </p>
              </div>
              <div className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#1e0714] text-rose-300 self-start sm:self-auto border border-rose-950">
                1 Byte = 8 Bits
              </div>
            </div>

            {/* 8-bit switches grid */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 my-4">
              {bits.map((bit) => (
                <button
                  key={bit.power}
                  onClick={() => toggleBit(bit.power)}
                  className={`flex flex-col items-center justify-between p-2.5 rounded-xl border transition-all select-none ${
                    bit.active
                      ? 'bg-rose-950/90 border-rose-500/80 text-white shadow-md shadow-rose-950/60 ring-1 ring-rose-500/30'
                      : 'bg-[#0a0306]/70 border-rose-950 text-rose-400/40 hover:border-rose-900 hover:text-rose-200'
                  }`}
                >
                  <span className="text-[10px] font-mono text-rose-400/50">2^{bit.power}</span>
                  <span
                    className={`text-xl font-bold font-mono my-1 ${
                      bit.active ? 'text-rose-300' : 'text-rose-900/60'
                    }`}
                  >
                    {bit.active ? '1' : '0'}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-1 rounded ${
                      bit.active ? 'bg-rose-900/60 text-rose-200' : 'text-rose-500/50'
                    }`}
                  >
                    +{bit.weight}
                  </span>
                </button>
              ))}
            </div>

            {/* Nibbles visual breakdown */}
            <div className="mt-4 pt-3 border-t border-rose-950/60 flex items-center justify-between text-xs text-rose-300/70 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-400" />
                <span>High Nibble: 0x{((num >> 4) & 0xf).toString(16).toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Low Nibble: 0x{(num & 0xf).toString(16).toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Radix Output Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#14050d]/80 border border-rose-950/70 rounded-2xl p-5 sm:p-6 backdrop-blur-sm shadow-xl">
            <h3 className="text-xs font-semibold text-rose-300 uppercase tracking-wider font-mono mb-4">
              Real-Time Representations
            </h3>

            <div className="space-y-3">
              {conversions.length > 0 ? (
                conversions.map((item) => (
                  <div
                    key={item.base}
                    className={`p-3.5 rounded-xl border transition-all ${
                      item.base === base
                        ? 'bg-[#1f0815] border-rose-500/50 ring-1 ring-rose-500/25'
                        : 'bg-[#0a0306]/70 border-rose-950/80 hover:border-rose-900'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-rose-200 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        {item.name}
                      </span>
                      <span className="font-mono text-[10px] text-rose-400/50">Base {item.base}</span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="font-mono text-base text-white tracking-wide break-all">
                        <span className="text-rose-400/50 text-xs mr-1">{item.prefix}</span>
                        {item.formatted}
                      </div>
                      <button
                        onClick={() => handleCopy(item.formatted, item.name)}
                        className="p-1.5 rounded-lg bg-[#1a0712] hover:bg-rose-950 text-rose-300/70 hover:text-white transition flex items-center gap-1 text-xs shrink-0 border border-rose-950"
                        title="Copy value"
                      >
                        {copiedKey === item.name ? (
                          <Check className="w-3.5 h-3.5 text-rose-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-rose-400/50 text-xs font-mono">
                  Enter a valid number to see conversions
                </div>
              )}
            </div>
          </div>

          {/* Positional Math Card */}
          <div className="bg-[#14050d]/80 border border-rose-950/70 rounded-2xl p-5 backdrop-blur-sm text-xs text-rose-200/80">
            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-rose-400" />
              How Radix Place Values Work
            </h4>
            <p className="text-rose-200/60 leading-relaxed">
              Every positional numeral system multiplies each digit by the radix raised to that position&apos;s
              index:
            </p>
            <div className="my-3 p-3 rounded-lg bg-[#0a0306] font-mono text-rose-300 text-[11px] overflow-x-auto border border-rose-950">
              Value = ∑ (digit × Base^position)
            </div>
            <p className="text-rose-200/60 leading-relaxed">
              For example, in binary, position 0 is 2⁰ (1), position 1 is 2¹ (2), and position 7 is 2⁷ (128).
              Hexadecimal bundles exactly 4 binary bits into a single symbol from 0 to F.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
