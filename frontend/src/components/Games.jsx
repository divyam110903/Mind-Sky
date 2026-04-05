import React, { useState, useRef } from 'react';
import * as FiIcons from 'react-icons/fi';

/* ═══════════════════════════════════════════════════════════
   GAME 1 — BUBBLE WRAP
═══════════════════════════════════════════════════════════ */
const COLS = 10;
const ROWS = 7;
const TOTAL = COLS * ROWS;

function BubbleWrap({ onBack }) {
  const [popped, setPopped] = useState(() => new Array(TOTAL).fill(false));
  const [anim, setAnim] = useState(null);
  const poppedCount = popped.filter(Boolean).length;

  const pop = (i) => {
    if (popped[i]) return;
    setPopped(p => { const n = [...p]; n[i] = true; return n; });
    setAnim(i);
    setTimeout(() => setAnim(null), 250);
  };

  const reset = () => setPopped(new Array(TOTAL).fill(false));
  const allPopped = poppedCount === TOTAL;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-2xl font-serif font-black text-[#0D1B2A]">Bubble Wrap</h2>
          <p className="text-xs font-black uppercase tracking-widest text-[#0D1B2A]/40">
            {poppedCount} / {TOTAL} popped
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="px-4 py-2 bg-white border border-gray-100 text-[#0D1B2A] rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 shadow-sm transition-all cursor-pointer"
          >
            Refill 🫧
          </button>
          <button onClick={onBack} className="px-4 py-2 bg-[#0D1B2A] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black shadow-sm transition-all cursor-pointer">
            ← Back
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${(poppedCount / TOTAL) * 100}%` }}
        />
      </div>

      {allPopped && (
        <div className="py-3 px-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 font-black text-sm flex items-center gap-2">
          🎉 All popped! So satisfying!
        </div>
      )}

      {/* Bubble grid */}
      <div
        className="grid gap-2 p-8 bg-white/60 backdrop-blur-xl border border-white rounded-[36px] shadow-xl"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      >
        {popped.map((isPop, i) => (
          <button
            key={i}
            onClick={() => pop(i)}
            className={`w-10 h-10 rounded-full relative transition-all duration-200 cursor-pointer focus:outline-none select-none ${
              isPop
                ? 'bg-gray-100 shadow-inner scale-90'
                : 'shadow-[0_4px_10px_rgba(99,102,241,0.25),inset_0_1px_4px_rgba(255,255,255,0.7)] hover:scale-110 active:scale-90'
            } ${anim === i ? 'scale-75' : ''}`}
            style={
              isPop
                ? { background: 'radial-gradient(circle at 50% 50%, #e5e7eb, #d1d5db)' }
                : { background: 'radial-gradient(circle at 35% 30%, #c7d2fe, #818cf8 60%, #4f46e5)' }
            }
          >
            {!isPop && (
              <span className="absolute top-1.5 left-2 w-2 h-1 bg-white/60 rounded-full rotate-[-20deg]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   GAME 2 — COLORING BOOK
═══════════════════════════════════════════════════════════ */
const PALETTE = [
  '#EF4444','#F97316','#FBBF24','#22C55E',
  '#14B8A6','#3B82F6','#8B5CF6','#EC4899',
  '#FDE68A','#BBF7D0','#BAE6FD','#DDD6FE',
  '#FFFFFF','#D1D5DB','#374151','#1F2937',
];

// SVG regions: a simple mandala-style flower
const REGIONS = [
  { id: 'bg',      fill: '#F0F7FF', d: 'M0,0 H300 V400 H0 Z' },
  { id: 'stem',    fill: '#4ADE80', d: 'M145,230 C143,255 141,275 140,310 L160,310 C159,275 157,255 155,230 Z' },
  { id: 'leafL',   fill: '#86EFAC', d: 'M147,280 C130,265 105,268 108,282 C111,296 135,292 147,280 Z' },
  { id: 'leafR',   fill: '#86EFAC', d: 'M153,265 C170,250 195,253 192,267 C189,281 165,277 153,265 Z' },
  { id: 'petal1',  fill: '#FDA4AF', d: 'M150,170 C158,140 175,115 160,95 C145,115 138,140 150,170 Z' },
  { id: 'petal2',  fill: '#FDA4AF', d: 'M150,170 C180,162 205,148 205,128 C185,128 162,148 150,170 Z' },
  { id: 'petal3',  fill: '#FDA4AF', d: 'M150,170 C180,178 205,193 205,213 C185,213 162,193 150,170 Z' },
  { id: 'petal4',  fill: '#FDA4AF', d: 'M150,170 C158,200 175,225 160,245 C145,225 138,200 150,170 Z' },
  { id: 'petal5',  fill: '#FDA4AF', d: 'M150,170 C120,178 95,193 95,213 C115,213 138,193 150,170 Z' },
  { id: 'petal6',  fill: '#FDA4AF', d: 'M150,170 C120,162 95,148 95,128 C115,128 138,148 150,170 Z' },
  { id: 'innerP1', fill: '#FCA5A5', d: 'M150,170 C155,152 163,140 156,130 C149,138 144,152 150,170 Z' },
  { id: 'innerP2', fill: '#FCA5A5', d: 'M150,170 C165,167 174,158 170,151 C162,152 153,163 150,170 Z' },
  { id: 'innerP3', fill: '#FCA5A5', d: 'M150,170 C165,173 174,182 170,189 C162,188 153,177 150,170 Z' },
  { id: 'innerP4', fill: '#FCA5A5', d: 'M150,170 C155,188 163,200 156,210 C149,202 144,188 150,170 Z' },
  { id: 'innerP5', fill: '#FCA5A5', d: 'M150,170 C135,173 126,182 130,189 C138,188 147,177 150,170 Z' },
  { id: 'innerP6', fill: '#FCA5A5', d: 'M150,170 C135,167 126,158 130,151 C138,152 147,163 150,170 Z' },
  { id: 'center',  fill: '#FDE68A', d: 'M150,170 m-18,0 a18,18 0 1,0 36,0 a18,18 0 1,0 -36,0' },
  { id: 'dot',     fill: '#FBBF24', d: 'M150,170 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0' },
];

function ColoringBook({ onBack }) {
  const [selected, setSelected] = useState('#3B82F6');
  const [colors, setColors] = useState(() => {
    const m = {};
    REGIONS.forEach(r => { m[r.id] = r.fill; });
    return m;
  });

  const paint = (id) => {
    if (id === 'bg') return; // don't color background
    setColors(c => ({ ...c, [id]: selected }));
  };

  const reset = () => {
    const m = {};
    REGIONS.forEach(r => { m[r.id] = r.fill; });
    setColors(m);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-2xl font-serif font-black text-[#0D1B2A]">Coloring Book</h2>
          <p className="text-xs font-black uppercase tracking-widest text-[#0D1B2A]/40">Pick a color · Click to paint</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="px-4 py-2 bg-white border border-gray-100 text-[#0D1B2A] rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 shadow-sm transition-all cursor-pointer">
            Reset 🎨
          </button>
          <button onClick={onBack} className="px-4 py-2 bg-[#0D1B2A] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black shadow-sm transition-all cursor-pointer">
            ← Back
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start justify-center w-full">
        {/* SVG Canvas */}
        <div className="bg-white rounded-[32px] shadow-xl border border-gray-100 p-4 shrink-0">
          <svg viewBox="0 0 300 340" width="260" height="295" style={{ display: 'block' }}>
            {REGIONS.map(r => (
              <path
                key={r.id}
                d={r.d}
                fill={colors[r.id]}
                stroke={r.id === 'bg' ? 'none' : '#374151'}
                strokeWidth={r.id === 'bg' ? 0 : 1.2}
                strokeLinejoin="round"
                onClick={() => paint(r.id)}
                style={{ cursor: r.id === 'bg' ? 'default' : 'pointer', transition: 'fill 0.15s ease' }}
              />
            ))}
          </svg>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4">
          {/* Current color */}
          <div className="bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border-2 border-[#0D1B2A] shadow-inner" style={{ backgroundColor: selected }} />
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#0D1B2A]/40">Selected</div>
              <div className="text-sm font-black text-[#0D1B2A]">{selected}</div>
            </div>
          </div>

          {/* Palette */}
          <div className="bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-4 shadow-sm">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#0D1B2A]/40 mb-3">Color Palette</div>
            <div className="grid grid-cols-4 gap-2">
              {PALETTE.map(c => (
                <button
                  key={c}
                  onClick={() => setSelected(c)}
                  title={c}
                  className={`w-9 h-9 rounded-xl transition-all cursor-pointer border-2 ${
                    selected === c ? 'scale-110 border-[#0D1B2A] shadow-md' : 'border-gray-100 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Tip */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 text-xs font-semibold text-amber-700">
            💡 Click any region on the flower to paint it with your selected color.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   GAME 3 — TOSS THE PAPER
═══════════════════════════════════════════════════════════ */
function TossThePaper({ onBack }) {
  const [power, setPower] = useState(55);
  const [angle, setAngle] = useState(50);
  const [state, setState] = useState('idle'); // idle | tossing | hit | miss
  const [score, setScore] = useState({ hits: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const toss = () => {
    if (state === 'tossing') return;
    setState('tossing');

    // Hit probability: best around power 50-65, angle 40-60
    const pDiff = Math.abs(power - 58) / 50;
    const aDiff = Math.abs(angle - 50) / 50;
    const hitChance = Math.max(0.1, 0.92 - pDiff - aDiff + Math.random() * 0.15);
    const isHit = Math.random() < hitChance;

    setTimeout(() => {
      setState(isHit ? 'hit' : 'miss');
      setScore(s => ({ hits: s.hits + (isHit ? 1 : 0), total: s.total + 1 }));
      setStreak(s => isHit ? s + 1 : 0);
      setTimeout(() => setState('idle'), 1400);
    }, 1000);
  };

  const reset = () => { setScore({ hits: 0, total: 0 }); setStreak(0); setState('idle'); };
  const accuracy = score.total > 0 ? Math.round((score.hits / score.total) * 100) : 0;

  // Paper ball position during animation
  const ballTossed = state === 'tossing' || state === 'hit';

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-2xl font-serif font-black text-[#0D1B2A]">Toss the Paper</h2>
          <p className="text-xs font-black uppercase tracking-widest text-[#0D1B2A]/40">
            {score.hits}/{score.total} shots · {accuracy}% accuracy
            {streak >= 3 && <span className="text-orange-500 ml-2">🔥 {streak} streak!</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="px-4 py-2 bg-white border border-gray-100 text-[#0D1B2A] rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 shadow-sm transition-all cursor-pointer">
            Reset
          </button>
          <button onClick={onBack} className="px-4 py-2 bg-[#0D1B2A] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black shadow-sm transition-all cursor-pointer">
            ← Back
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 w-full">
        {[
          { label: 'Shots', value: score.total, icon: '🗞️' },
          { label: 'Hits', value: score.hits, icon: '🎯' },
          { label: 'Accuracy', value: `${accuracy}%`, icon: '📊' },
        ].map((s, i) => (
          <div key={i} className="bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-4 text-center shadow-sm">
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="text-xl font-black text-[#0D1B2A]">{s.value}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-[#0D1B2A]/40">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Arena */}
      <div className="relative w-full h-56 bg-gradient-to-b from-sky-100 to-blue-50 rounded-[32px] border border-white shadow-xl overflow-hidden select-none">

        {/* Room details */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-r from-amber-100 to-amber-50 border-t border-amber-200/60 rounded-b-[32px]" />
        <div className="absolute bottom-12 left-0 right-0 h-px bg-[#0D1B2A]/8" />

        {/* Desk */}
        <div className="absolute bottom-8 left-0 w-36 h-6 bg-amber-200/80 rounded-r-2xl border border-amber-300/50 shadow-sm" />

        {/* Paper ball */}
        <div
          className="absolute text-3xl transition-all ease-in-out select-none pointer-events-none"
          style={{
            left: ballTossed ? 'calc(100% - 90px)' : '40px',
            bottom: ballTossed ? (state === 'hit' ? '56px' : '200px') : '56px',
            transitionDuration: '900ms',
            transitionTimingFunction: state === 'tossing' ? 'cubic-bezier(0.2, 0, 0.8, 1)' : 'ease',
            filter: state === 'tossing' ? 'blur(1px)' : 'none',
            transform: state === 'tossing' ? 'rotate(360deg) scale(0.7)' : 'rotate(0deg) scale(1)',
            opacity: state === 'miss' ? 0 : 1,
          }}
        >
          🗞️
        </div>

        {/* Arc trajectory */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <path
            d={`M 60,${224 - 56} Q ${60 + (power / 100) * 280},${224 - 80 - (angle / 100) * 100} ${600 - 72},${224 - 60}`}
            stroke="#0D1B2A"
            strokeWidth="1.5"
            strokeDasharray="6 5"
            fill="none"
            opacity="0.12"
          />
        </svg>

        {/* Bin */}
        <div className="absolute right-10 bottom-8 text-5xl select-none">🗑️</div>

        {/* Result overlay */}
        {(state === 'hit' || state === 'miss') && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`px-8 py-4 rounded-2xl font-black text-2xl shadow-2xl border ${
              state === 'hit'
                ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                : 'bg-red-50 border-red-100 text-red-500'
            }`}>
              {state === 'hit' ? '🎯 Swish!' : '😅 Miss!'}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0D1B2A]/40">Power</span>
            <span className="text-xs font-black text-[#0D1B2A]">{power}%</span>
          </div>
          <input type="range" min="10" max="100" value={power} onChange={e => setPower(+e.target.value)}
            className="w-full accent-indigo-500 cursor-pointer" />
          <div className="flex justify-between text-[9px] font-black text-[#0D1B2A]/25 mt-1">
            <span>Weak</span><span>💪 Strong</span>
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0D1B2A]/40">Angle</span>
            <span className="text-xs font-black text-[#0D1B2A]">{angle}°</span>
          </div>
          <input type="range" min="10" max="90" value={angle} onChange={e => setAngle(+e.target.value)}
            className="w-full accent-indigo-500 cursor-pointer" />
          <div className="flex justify-between text-[9px] font-black text-[#0D1B2A]/25 mt-1">
            <span>Low</span><span>📐 High</span>
          </div>
        </div>
      </div>

      <button
        onClick={toss}
        disabled={state === 'tossing'}
        className="w-full py-4 bg-[#0D1B2A] text-white rounded-2xl font-black text-sm uppercase tracking-[0.25em] hover:bg-black shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
      >
        {state === 'tossing' ? '✈️  In the air…' : '🗞️  Toss!'}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   GAME SELECTION SCREEN
═══════════════════════════════════════════════════════════ */
const GAME_CARDS = [
  {
    id: 'bubble',
    title: 'Bubble Wrap',
    desc: 'Pop every bubble on the sheet. Satisfying, simple, stress-melting.',
    emoji: '🫧',
    accent: 'from-indigo-400 to-violet-500',
    tag: 'Satisfying',
  },
  {
    id: 'coloring',
    title: 'Coloring Book',
    desc: 'Paint a beautiful flower with your choice of colors. Calm your mind.',
    emoji: '🎨',
    accent: 'from-pink-400 to-rose-500',
    tag: 'Relaxing',
  },
  {
    id: 'toss',
    title: 'Toss the Paper',
    desc: 'Crumple it up and sink the shot. Adjust power and angle to win.',
    emoji: '🗞️',
    accent: 'from-amber-400 to-orange-500',
    tag: 'Fun',
  },
];

export default function Games({ user }) {
  const [activeGame, setActiveGame] = useState(null);
  const firstName = user?.fullName?.split(' ')[0] || 'Friend';

  if (activeGame === 'bubble') return <div className="max-w-3xl mx-auto pb-16"><BubbleWrap onBack={() => setActiveGame(null)} /></div>;
  if (activeGame === 'coloring') return <div className="max-w-3xl mx-auto pb-16"><ColoringBook onBack={() => setActiveGame(null)} /></div>;
  if (activeGame === 'toss') return <div className="max-w-3xl mx-auto pb-16"><TossThePaper onBack={() => setActiveGame(null)} /></div>;

  return (
    <div className="max-w-3xl mx-auto pb-16">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-serif font-black tracking-tight mb-1">Games</h1>
        <p className="text-xs font-black uppercase tracking-widest text-[#0D1B2A]/40">
          Stress-relief mini games just for you, {firstName}
        </p>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GAME_CARDS.map(g => (
          <button
            key={g.id}
            onClick={() => setActiveGame(g.id)}
            className="bg-white/60 backdrop-blur-xl border border-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left group cursor-pointer"
          >
            {/* Colour bar top */}
            <div className={`h-28 bg-gradient-to-br ${g.accent} flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, white 0%, transparent 60%)' }} />
              <span className="text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300 select-none">
                {g.emoji}
              </span>
              <span className="absolute top-3 right-3 px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-white">
                {g.tag}
              </span>
            </div>

            {/* Card body */}
            <div className="p-6">
              <h3 className="text-lg font-serif font-black text-[#0D1B2A] mb-2">{g.title}</h3>
              <p className="text-sm font-medium text-[#0D1B2A]/50 leading-relaxed mb-5">{g.desc}</p>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0D1B2A]/60 group-hover:text-[#0D1B2A] transition-colors">
                <FiIcons.FiPlay size={13} /> Play now
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Tip */}
      <div className="mt-8 flex items-start gap-3 px-5 py-4 bg-blue-50 border border-blue-100 rounded-2xl">
        <span className="text-xl">💙</span>
        <p className="text-sm font-semibold text-blue-700 leading-snug">
          Take a short break and play — even 5 minutes of mindful play can lower cortisol levels and improve your mood.
        </p>
      </div>
    </div>
  );
}
