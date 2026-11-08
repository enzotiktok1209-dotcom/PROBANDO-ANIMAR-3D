// =====================================================================
//  timeline.js — TIMELINE for the tools (export, review) and the score
// =====================================================================
finalizeShots();
const TIMELINE = {
  width: PW, height: PH, fps: FPS, duration: DURATION, frames: NFRAMES, loop: LOOP_T, safe: SAFE, format: 'beat-cut',
  shots: SHOTS.map((s) => ({ id: s.i + 1, key: 'shot' + (s.i + 1), era: s.i, t0: s.t0, t1: s.t1, title: s.title || ('shot ' + (s.i + 1)) })),
  cuts: SHOTS.slice(1).map((s) => s.t0), morphs: [], cues: {},
  narration: CHUNKS.map((c) => ({ t0: c.t0, t1: c.t1, text: WORDS.slice(c.a, c.b + 1).map((w) => w.w).join(' ') })),
  acts: [], board: [],
};
window.TIMELINE = TIMELINE;
