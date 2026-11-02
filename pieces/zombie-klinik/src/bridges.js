// hard cuts only; every shot gets a slow push-in (the reference never holds the camera still)
const ERA_BG = ERA_LIST.map(() => '#3d4c68');
function pieceCam(era, t) {
  const [t0, t1] = ERA_LIST[era], u = clamp((t - t0) / Math.max(0.5, t1 - t0)), p = SHOT_PIVOT[era] || [540, 900];
  return camOf({ z: 1 + 0.06 * u, p, to: p });
}
const SHOT_PIVOT = [];
const BRIDGES = [];
