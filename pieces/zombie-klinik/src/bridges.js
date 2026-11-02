// =====================================================================
//  CAMERAS — every shot moves. Hard cuts only (BRIDGES = []).
//  in / out: slow push in / pull out with a heavier vignette; fin / fout: a fast spring zoom (with a whoosh in the score);
//  hold: a slow drift; shake: an impact shake that settles. Plus global shakes on the big hits (SHAKES).
// =====================================================================
const ERA_BG = ERA_LIST.map(() => '#3d4c68');
const PIVOT = {   // where each scene's subject sits (world coords): the zoom keeps it on its screen spot
  curtain: [560, 820], face: [540, 860], monitor: [540, 820], monitorB: [560, 760], city: [540, 900], roomBed: [440, 820],
  lukasSide: [540, 900], dogPet: [600, 960], dogNap: [520, 1150], feet: [560, 1250], reach: [640, 880], clip: [560, 940],
  station: [540, 760], corridor: [540, 880], doorPlate: [540, 820], burst: [560, 900], janaDog: [540, 1000], bedWheel: [500, 1120],
  brake: [560, 1100], leads: [540, 900], iv: [560, 900], door: [560, 760], group: [540, 1000], janaDark: [540, 860],
  dogDark: [560, 1000], bathPush: [540, 1000], blueprint: [540, 820], dogSilent: [520, 1000], gownBack: [540, 1000],
  elevHall: [540, 900], button: [540, 900], elevator: [540, 1000], rush: [540, 1000], wheelchair: [540, 1000],
  wheelRun: [540, 1000], wheelClose: [540, 1000], radio: [540, 900], stairGroup: [540, 900], stairDown: [540, 900],
  stairUp: [540, 860], helipad: [540, 900], choice: [540, 860], endcard: [540, 960],
};
// impacts: [time, amplitude px] — the score puts a hit on each
const SHAKES = [[0, 30], [at('l12'), 14], [at('l18'), 26], [at('l23'), 30], [at('l27'), 16], [at('l39'), 22], [at('l42'), 18], [at('l45'), 26], [at('l55'), 30], [at('l58'), 26]];
const shotOf = (era) => SHOT_LIST[era];
function camState(era, t) {
  const [t0, sc, cam, args] = shotOf(era), t1 = ERA_LIST[era][1], d = Math.max(0.3, t1 - t0), lt = t - t0, u = clamp(lt / d);
  const sine = (x) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(x));
  let z = 1, ox = 0, oy = 0;
  if (cam === 'in') z = 1 + 0.15 * sine(u);
  else if (cam === 'out') z = 1.17 - 0.15 * sine(u);
  else if (cam === 'fin') z = 1 + 0.26 * springEase(lt, 260, 22) + 0.04 * u;
  else if (cam === 'fout') z = 1.36 - 0.34 * springEase(lt, 260, 22);
  else if (cam === 'hold') z = 1.02 + 0.04 * u;
  else if (cam === 'shake') { z = 1.07 + 0.03 * u; const a = 26 * Math.exp(-lt * 6) + 3; ox = Math.sin(t * 61) * a; oy = Math.cos(t * 47) * a * 0.8; }
  for (const [ts, amp] of SHAKES) { const k = t - ts; if (k >= 0 && k < 0.6) { const a = amp * Math.exp(-k * 7); ox += Math.sin(t * 73 + ts) * a; oy += Math.cos(t * 59 + ts) * a; } }
  return { z: z * (args.z || 1), ox, oy, u, cam };
}
function pieceCam(era, t) {
  const c = camState(era, t), p = shotOf(era)[3].p || PIVOT[shotOf(era)[1]] || [540, 900];
  return camOf({ z: c.z, p, to: [p[0] + c.ox, p[1] + c.oy] });
}
// the vignette: heavier and tightening on slow moves (tension), lighter on fast ones
function endScene(extra = 0) {
  const e = eraAt(TT), c = camState(e, TT), slow = c.cam === 'in' || c.cam === 'out';
  fcVignette(Math.min(0.92, (slow ? 0.62 + 0.25 * c.u : 0.55) + extra));
}
const BRIDGES = [];
