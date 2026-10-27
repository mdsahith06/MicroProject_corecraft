import React, { useState, useMemo } from 'react';
import {
  Layers3,
  TrendingUp,
  Clock,
  Code2,
  HelpCircle,
  Check,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function ComplexityLab() {
  const [n, setN] = useState<number>(32);
  const [activeCurve, setActiveCurve] = useState<string>('all');
  const [viewSnippet, setViewSnippet] = useState<string | null>(null);

  const curves = [
    {
      key: 'O(1)',
      name: 'Constant O(1)',
      color: '#fda4af', // warm soft rose
      fn: () => 1,
      example: 'Hash map lookup, Array index access',
      snippet: 'function getFirst(arr) {\n  return arr[0]; // Exactly 1 operation\n}',
    },
    {
      key: 'O(log n)',
      name: 'Logarithmic O(log n)',
      color: '#fb7185', // bright rose
      fn: (x: number) => Math.log2(x),
      example: 'Binary search, BST lookup',
      snippet:
        'function binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) { // Halves search space each loop\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n}',
    },
    {
      key: 'O(n)',
      name: 'Linear O(n)',
      color: '#f43f5e', // crimson rose
      fn: (x: number) => x,
      example: 'Linear search, Array traversal',
      snippet:
        'function findMax(arr) {\n  let max = arr[0];\n  for (let x of arr) { // Visits all n items once\n    if (x > max) max = x;\n  }\n  return max;\n}',
    },
    {
      key: 'O(n log n)',
      name: 'Linearithmic O(n log n)',
      color: '#be123c', // deep ruby maroon
      fn: (x: number) => x * Math.log2(x),
      example: 'Merge Sort, Quick Sort (avg), Heap Sort',
      snippet:
        'function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid)); // log n levels\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right); // n comparisons per level\n}',
    },
    {
      key: 'O(n²)',
      name: 'Quadratic O(n²)',
      color: '#fbbf24', // amber gold for maximum readable contrast
      fn: (x: number) => x * x,
      example: 'Bubble Sort, Nested pairwise comparison',
      snippet:
        'function findDuplicates(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = i + 1; j < arr.length; j++) { // n * n comparisons\n      if (arr[i] === arr[j]) return true;\n    }\n  }\n  return false;\n}',
    },
  ];

  // Generate chart data up to current n
  const chartData = useMemo(() => {
    const points = [];
    const step = Math.max(1, Math.floor(n / 24));
    for (let i = 1; i <= n; i += step) {
      points.push({
        n: i,
        'O(1)': 1,
        'O(log n)': Number(Math.log2(i).toFixed(2)),
        'O(n)': i,
        'O(n log n)': Number((i * Math.log2(i)).toFixed(2)),
        'O(n²)': i * i,
      });
    }
    // ensure endpoint is included
    if (points[points.length - 1]?.n !== n) {
      points.push({
        n: n,
        'O(1)': 1,
        'O(log n)': Number(Math.log2(n).toFixed(2)),
        'O(n)': n,
        'O(n log n)': Number((n * Math.log2(n)).toFixed(2)),
        'O(n²)': n * n,
      });
    }
    return points;
  }, [n]);

  // Theoretical execution time at 1 GHz CPU clock (10^9 ops/sec)
  const formatTime = (ops: number) => {
    const seconds = ops / 1e9;
    if (seconds < 1e-6) return `${(seconds * 1e9).toFixed(1)} ns`;
    if (seconds < 1e-3) return `${(seconds * 1e6).toFixed(1)} µs`;
    if (seconds < 1) return `${(seconds * 1e3).toFixed(2)} ms`;
    return `${seconds.toFixed(2)} s`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-300 text-xs font-mono uppercase tracking-wider mb-2">
          <Layers3 className="w-3.5 h-3.5" /> Module 03 · Algorithm Analysis
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Big O Explorer & Asymptotic Growth
        </h2>
        <p className="text-rose-200/60 text-sm sm:text-base mt-1 max-w-2xl">
          Big O notation characterizes functions according to their growth rate. Compare how
          fundamental algorithms scale as problem size <code>n</code> expands.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Chart and Sliders */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#14050d]/80 border border-rose-950/70 rounded-2xl p-5 sm:p-6 backdrop-blur-sm shadow-xl">
            {/* Input Slider */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <label
                  htmlFor="n-input-slider"
                  className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-200 block"
                >
                  Input Size (n): <span className="text-rose-400 font-bold text-sm">n = {n}</span>
                </label>
                <span className="text-xs text-rose-400/50">
                  Drag slider to see relative divergence of curves
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[16, 32, 64, 128].map((presetN) => (
                  <button
                    key={presetN}
                    onClick={() => setN(presetN)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition border ${
                      n === presetN
                        ? 'bg-rose-950/90 border-rose-500/60 text-rose-100'
                        : 'bg-[#1b0612]/60 border-rose-950 text-rose-400/50 hover:text-white'
                    }`}
                  >
                    n={presetN}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1 my-3">
              <input
                id="n-input-slider"
                type="range"
                min="4"
                max="128"
                step="2"
                value={n}
                onChange={(e) => setN(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer h-2 bg-[#1f0815] rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-rose-400/50">
                <span>n = 4 (Trivial)</span>
                <span>n = 64 (Moderate)</span>
                <span>n = 128 (Large)</span>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 my-4 pt-3 border-t border-rose-950/60">
              <span className="text-xs text-rose-400/50 font-mono mr-1">Focus Curve:</span>
              <button
                onClick={() => setActiveCurve('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition border ${
                  activeCurve === 'all'
                    ? 'bg-rose-900/60 text-white border-rose-700'
                    : 'bg-[#0a0306]/70 text-rose-400/50 border-rose-950 hover:text-rose-200'
                }`}
              >
                Show All
              </button>
              {curves.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setActiveCurve(activeCurve === c.key ? 'all' : c.key)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition border flex items-center gap-1.5 ${
                    activeCurve === c.key
                      ? 'bg-rose-950/90 text-white border-rose-600 ring-1 ring-rose-500/40'
                      : 'bg-[#0a0306]/70 text-rose-400/50 border-rose-950 hover:text-rose-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.key}
                </button>
              ))}
            </div>

            {/* Recharts Chart */}
            <div className="h-[280px] sm:h-[320px] w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#2c0c16" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="n"
                    tick={{ fill: '#9f1239', fontSize: 11 }}
                    axisLine={{ stroke: '#4c0519' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#9f1239', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#16060e',
                      borderColor: '#4c0519',
                      borderRadius: '12px',
                      color: '#fff1f2',
                      fontSize: '12px',
                    }}
                    labelStyle={{ color: '#fda4af', fontWeight: 'bold' }}
                    labelFormatter={(label) => `Input Size n = ${label}`}
                  />
                  {curves.map((c) => (
                    <Line
                      key={c.key}
                      type="monotone"
                      dataKey={c.key}
                      stroke={c.color}
                      strokeWidth={activeCurve === 'all' || activeCurve === c.key ? 2.5 : 1}
                      strokeOpacity={activeCurve === 'all' || activeCurve === c.key ? 1 : 0.15}
                      dot={false}
                      isAnimationActive={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Mathematical Breakdown & Real World Comparison */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#14050d]/80 border border-rose-950/70 rounded-2xl p-5 backdrop-blur-sm shadow-xl">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-300/70 mb-3 flex items-center justify-between">
              <span>Operations at n = {n}</span>
              <span className="text-[10px] text-rose-400/50">At 1 GHz</span>
            </h3>

            <div className="space-y-2.5">
              {curves.map((c) => {
                const ops = c.fn(n);
                return (
                  <div
                    key={c.key}
                    onClick={() => setViewSnippet(viewSnippet === c.key ? null : c.key)}
                    className="p-3 rounded-xl bg-[#0a0306]/70 border border-rose-950 hover:border-rose-900 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-mono font-semibold text-white">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                        {c.key}
                      </div>
                      <span className="text-[11px] font-mono text-rose-300/70">
                        {formatTime(ops)}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between mt-1.5">
                      <div className="text-sm font-mono font-bold text-rose-100">
                        {Math.round(ops).toLocaleString()} ops
                      </div>
                      <div className="text-[10px] text-rose-400/60 hover:text-rose-300 flex items-center gap-1">
                        <Code2 className="w-3 h-3" /> Snippet
                      </div>
                    </div>

                    {viewSnippet === c.key && (
                      <div className="mt-3 pt-2.5 border-t border-rose-950 text-[11px] font-mono text-rose-300 bg-[#16060e] p-2 rounded-lg">
                        <div className="text-rose-400/60 text-[10px] mb-1">Canonical Implementation:</div>
                        <pre className="whitespace-pre-wrap">{c.snippet}</pre>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick CS Rule Card */}
          <div className="bg-[#14050d]/80 border border-rose-950/70 rounded-2xl p-5 backdrop-blur-sm text-xs text-rose-200/80 space-y-2">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              Asymptotic Simplification Rules
            </h4>
            <p className="text-rose-200/60 leading-relaxed text-[11px]">
              When writing Big O:
            </p>
            <ul className="space-y-1.5 text-[11px] text-rose-200/60 list-disc pl-4">
              <li>
                <strong className="text-rose-200">Drop constants:</strong> <code>O(2n + 5) → O(n)</code>
              </li>
              <li>
                <strong className="text-rose-200">Drop lower-order terms:</strong> <code>O(n² + n) → O(n²)</code>
              </li>
              <li>
                <strong className="text-rose-200">Log bases do not matter:</strong> <code>log₂ n = (ln n) / (ln 2)</code>, so constant factors vanish in asymptotic notation.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
