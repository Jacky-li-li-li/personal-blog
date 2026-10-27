/**
 * Page-themed cursor particles: grass (about), snow (work), sand (notes).
 * Canvas overlay, pointer-events none; fine pointer + hover only; respects reduced-motion.
 */

export type SceneCursorTheme = 'grass' | 'snow' | 'sand';

type ParticleKind = 'blade' | 'flake' | 'grain';

type Particle = {
  alive: boolean;
  kind: ParticleKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  angle: number;
  spin: number;
  sway: number;
  phase: number;
  colorIndex: number;
  streak: boolean;
  /** Blade base width multiplier for filled taper. */
  width: number;
};

const CANVAS_ATTR = 'data-scene-cursor-canvas';
const MAX_PARTICLES = 180;
const TRAIL_DISTANCE = 5;
/** Per-theme trail counts (grass uses cluster blades instead). */
const TRAIL_SPAWN_SNOW = 4;
const TRAIL_SPAWN_SAND = 5;
const GRASS_CLUSTER_MIN = 3;
const GRASS_CLUSTER_MAX = 6;
const CLICK_SPAWN_GRASS = 14;
const CLICK_SPAWN_SNOW_MIN = 14;
const CLICK_SPAWN_SNOW_MAX = 20;
const CLICK_SPAWN_SAND_MIN = 16;
const CLICK_SPAWN_SAND_MAX = 22;

let activeTheme: SceneCursorTheme | null = null;
let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let width = 0;
let height = 0;
let dpr = 1;
let raf = 0;
let lastTime = 0;
let lastX = 0;
let lastY = 0;
let hasPointer = false;
let running = false;
let bound = false;

const pool: Particle[] = [];
let reducedMotionMq: MediaQueryList | null = null;
let finePointerMq: MediaQueryList | null = null;
let colors: string[] = [];

function mqReduced(): MediaQueryList {
  if (!reducedMotionMq) reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  return reducedMotionMq;
}

function mqFine(): MediaQueryList {
  if (!finePointerMq) finePointerMq = window.matchMedia('(hover: hover) and (pointer: fine)');
  return finePointerMq;
}

function effectsEnabled(): boolean {
  return mqFine().matches && !mqReduced().matches;
}

function readColors(theme: SceneCursorTheme): string[] {
  const root = getComputedStyle(document.documentElement);
  if (theme === 'grass') {
    // Bias toward mid/near greens so blades read clearly on paper.
    return [
      root.getPropertyValue('--about-grass-mid').trim() || '#89a168',
      root.getPropertyValue('--about-grass-near').trim() || '#607f4d',
      root.getPropertyValue('--about-grass-ink').trim() || '#2f5339',
      '#7a9a58',
    ];
  }
  if (theme === 'snow') {
    // Prefer bright white / cool paper snow over muted mid-mountain grey.
    const snow = root.getPropertyValue('--work-snow').trim() || '#f4f5f1';
    const far = root.getPropertyValue('--work-mountain-far').trim() || '#dde5e2';
    return ['#ffffff', snow, far, 'rgba(255,255,255,0.95)'];
  }

  const nav = document.querySelector('.nav--notes');
  const windSource = nav ? getComputedStyle(nav) : root;
  const wind = windSource.getPropertyValue('--notes-wind-rgb').trim();
  const sandNear = root.getPropertyValue('--notes-sand-near').trim() || '#be915b';
  const sandMid = root.getPropertyValue('--notes-sand-mid').trim() || '#d5b985';
  const sandInk = root.getPropertyValue('--notes-sand-ink').trim() || '#82613f';
  // Warmer, more saturated ochres for readable sand drag.
  const warm = ['#c9954a', '#d4a85c', sandNear, sandMid, sandInk];
  if (wind) {
    const rgb = wind.split(/\s+/).join(',');
    return [`rgb(${rgb})`, ...warm];
  }
  return warm;
}

function acquire(): Particle {
  for (const p of pool) {
    if (!p.alive) return p;
  }
  if (pool.length < MAX_PARTICLES) {
    const p: Particle = {
      alive: false,
      kind: 'grain',
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      maxLife: 1,
      size: 1,
      angle: 0,
      spin: 0,
      sway: 0,
      phase: 0,
      colorIndex: 0,
      streak: false,
      width: 1,
    };
    pool.push(p);
    return p;
  }
  let oldest = pool[0]!;
  for (const p of pool) {
    if (p.life < oldest.life) oldest = p;
  }
  return oldest;
}

function fillBlade(
  p: Particle,
  cx: number,
  cy: number,
  burst: boolean,
  index: number,
  total: number,
): void {
  p.alive = true;
  p.kind = 'blade';
  p.colorIndex = Math.floor(Math.random() * colors.length);
  p.phase = Math.random() * Math.PI * 2;
  p.streak = false;
  // Fan blades across a tuft: shared base, spread angles.
  const fan = ((index + 0.5) / total - 0.5) * (burst ? 1.15 : 0.95);
  const jitter = (Math.random() - 0.5) * 0.22;
  p.angle = -Math.PI / 2 + fan + jitter;
  p.spin = (Math.random() - 0.5) * 0.35;
  p.sway = 0.8 + Math.random() * 1.4;
  p.width = 0.85 + Math.random() * 0.55;
  // Cluster around shared root with slight scatter.
  const spread = burst ? 14 : 9;
  p.x = cx + fan * spread + (Math.random() - 0.5) * 4;
  p.y = cy + Math.abs(fan) * 3 + (Math.random() - 0.5) * 3;
  p.maxLife = burst ? 1.0 + Math.random() * 0.55 : 0.7 + Math.random() * 0.5;
  p.size = burst ? 14 + Math.random() * 12 : 10 + Math.random() * 9;
  // Mostly rooted: little translation, slight sprout upward then settle.
  p.vx = fan * (burst ? 10 : 6) + (Math.random() - 0.5) * 4;
  p.vy = burst ? -(6 + Math.random() * 14) : -(3 + Math.random() * 8);
  p.life = p.maxLife;
}

function spawnGrassCluster(x: number, y: number, burst: boolean): void {
  const total = burst
    ? CLICK_SPAWN_GRASS
    : GRASS_CLUSTER_MIN + Math.floor(Math.random() * (GRASS_CLUSTER_MAX - GRASS_CLUSTER_MIN + 1));
  for (let i = 0; i < total; i += 1) {
    fillBlade(acquire(), x, y, burst, i, total);
  }
}

function spawn(
  theme: SceneCursorTheme,
  x: number,
  y: number,
  burst: boolean,
  dirX = 0,
  dirY = 0,
): void {
  if (theme === 'grass') {
    spawnGrassCluster(x, y, burst);
    return;
  }

  const dirLen = Math.hypot(dirX, dirY) || 1;
  const nx = dirX / dirLen;
  const ny = dirY / dirLen;

  let count: number;
  if (theme === 'snow') {
    count = burst
      ? CLICK_SPAWN_SNOW_MIN +
        Math.floor(Math.random() * (CLICK_SPAWN_SNOW_MAX - CLICK_SPAWN_SNOW_MIN + 1))
      : TRAIL_SPAWN_SNOW;
  } else {
    count = burst
      ? CLICK_SPAWN_SAND_MIN +
        Math.floor(Math.random() * (CLICK_SPAWN_SAND_MAX - CLICK_SPAWN_SAND_MIN + 1))
      : TRAIL_SPAWN_SAND;
  }

  for (let i = 0; i < count; i += 1) {
    const p = acquire();
    p.alive = true;
    p.colorIndex = Math.floor(Math.random() * colors.length);
    p.phase = Math.random() * Math.PI * 2;
    p.width = 1;

    if (theme === 'snow') {
      p.kind = 'flake';
      p.streak = false;
      p.maxLife = burst ? 1.1 + Math.random() * 0.6 : 0.85 + Math.random() * 0.55;
      p.size = burst ? 3.2 + Math.random() * 3.6 : 2.4 + Math.random() * 2.8;
      p.angle = Math.random() * Math.PI;
      p.spin = (Math.random() - 0.5) * 0.9;
      p.sway = 6 + Math.random() * 10;
      p.x = x + (Math.random() - 0.5) * (burst ? 16 : 6);
      p.y = y + (Math.random() - 0.5) * (burst ? 16 : 6);
      if (burst) {
        const a = Math.random() * Math.PI * 2;
        const speed = 55 + Math.random() * 120;
        p.vx = Math.cos(a) * speed;
        p.vy = Math.sin(a) * speed * 0.45 - 30;
      } else {
        p.vx = -nx * (10 + Math.random() * 22) + (Math.random() - 0.5) * 14;
        p.vy = 6 + Math.random() * 16; // slower fall
      }
    } else {
      p.kind = 'grain';
      p.streak = Math.random() > 0.35;
      p.maxLife = burst ? 0.85 + Math.random() * 0.5 : 0.65 + Math.random() * 0.55;
      p.size = burst ? 1.6 + Math.random() * 2.2 : 1.1 + Math.random() * 1.6;
      p.angle = Math.atan2(ny, nx) + (Math.random() - 0.5) * 0.5;
      p.spin = (Math.random() - 0.5) * 2.4;
      p.sway = (Math.random() - 0.5) * 8;
      p.x = x + (Math.random() - 0.5) * (burst ? 18 : 8);
      p.y = y + (Math.random() - 0.5) * (burst ? 14 : 6);
      if (burst) {
        const a = Math.random() * Math.PI * 2;
        const speed = 80 + Math.random() * 160;
        p.vx = Math.cos(a) * speed;
        p.vy = Math.sin(a) * speed - 20;
      } else {
        // Longer sand drag behind the pointer.
        p.vx = -nx * (35 + Math.random() * 55) + (Math.random() - 0.5) * 22;
        p.vy = -ny * (14 + Math.random() * 28) + 10 + Math.random() * 22;
      }
    }

    p.life = p.maxLife;
  }
}

function drawBlade(p: Particle, alpha: number): void {
  if (!ctx) return;
  const color = colors[p.colorIndex] ?? colors[0]!;
  // Grow in then hold: length eases up over first ~30% of life.
  const grown = Math.min(1, (1 - p.life / p.maxLife) / 0.28 + 0.55);
  const len = p.size * grown;
  const tipX = p.x + Math.cos(p.angle) * len;
  const tipY = p.y + Math.sin(p.angle) * len;
  const bend = p.sway * Math.sin(p.phase) * 1.6;
  const midX = p.x + Math.cos(p.angle) * len * 0.48 + Math.cos(p.angle + Math.PI / 2) * bend;
  const midY = p.y + Math.sin(p.angle) * len * 0.48 + Math.sin(p.angle + Math.PI / 2) * bend;
  const baseW = Math.max(1.1, p.size * 0.11 * p.width);

  const ox = Math.cos(p.angle + Math.PI / 2) * baseW;
  const oy = Math.sin(p.angle + Math.PI / 2) * baseW;

  ctx.beginPath();
  ctx.moveTo(p.x + ox, p.y + oy);
  ctx.quadraticCurveTo(midX + ox * 0.35, midY + oy * 0.35, tipX, tipY);
  ctx.quadraticCurveTo(midX - ox * 0.35, midY - oy * 0.35, p.x - ox, p.y - oy);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha * 0.82;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.quadraticCurveTo(midX, midY, tipX, tipY);
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha * 0.95;
  ctx.lineWidth = Math.max(0.9, baseW * 0.55);
  ctx.lineCap = 'round';
  ctx.stroke();
}

function drawFlake(p: Particle, alpha: number): void {
  if (!ctx) return;
  const color = colors[p.colorIndex] ?? colors[0]!;
  const r = p.size;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);

  // Soft glow disc behind arms so flakes read on light paper.
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.85, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = alpha * 0.28;
  ctx.fill();

  ctx.strokeStyle = color;
  ctx.fillStyle = '#ffffff';
  ctx.lineCap = 'round';
  ctx.lineWidth = Math.max(0.9, r * 0.28);
  ctx.globalAlpha = alpha * 0.92;

  // Cross + diagonals = readable ❄️
  const arms = 4;
  for (let i = 0; i < arms; i += 1) {
    const a = (Math.PI * i) / arms;
    const c = Math.cos(a);
    const s = Math.sin(a);
    ctx.beginPath();
    ctx.moveTo(-c * r, -s * r);
    ctx.lineTo(c * r, s * r);
    ctx.stroke();
    // Small barbs near tips.
    const tip = r * 0.62;
    const bx = c * tip;
    const by = s * tip;
    const px = -s * r * 0.28;
    const py = c * r * 0.28;
    ctx.beginPath();
    ctx.moveTo(bx - px, by - py);
    ctx.lineTo(bx, by);
    ctx.lineTo(bx + px, by + py);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(0, 0, Math.max(0.7, r * 0.28), 0, Math.PI * 2);
  ctx.globalAlpha = alpha * 0.85;
  ctx.fill();

  ctx.restore();
}

function drawGrain(p: Particle, alpha: number): void {
  if (!ctx) return;
  const color = colors[p.colorIndex] ?? colors[0]!;
  if (p.streak) {
    const streakLen = 0.035 + Math.min(0.05, Math.hypot(p.vx, p.vy) * 0.00025);
    ctx.beginPath();
    ctx.moveTo(p.x - p.vx * streakLen, p.y - p.vy * streakLen * 0.7);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha * 0.55;
    ctx.lineWidth = Math.max(0.7, p.size * 0.7);
    ctx.lineCap = 'round';
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.ellipse(p.x, p.y, p.size * 1.55, p.size * 0.7, p.angle, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha * 0.88;
  ctx.fill();
}

function tick(time: number): void {
  raf = 0;
  if (!running || !ctx || !canvas || !activeTheme) return;

  if (document.hidden || !effectsEnabled()) {
    ctx.clearRect(0, 0, width, height);
    lastTime = 0;
    return;
  }

  const dt = lastTime ? Math.min(0.05, (time - lastTime) / 1000) : 0.016;
  lastTime = time;

  ctx.clearRect(0, 0, width, height);

  for (const p of pool) {
    if (!p.alive) continue;
    p.life -= dt;
    if (p.life <= 0) {
      p.alive = false;
      continue;
    }

    if (p.kind === 'blade') {
      p.vy += 28 * dt;
      p.vx *= 1 - 2.4 * dt;
      p.vy *= 1 - 1.2 * dt;
      p.angle += p.spin * dt + Math.sin(time * 0.004 + p.phase) * 0.45 * dt;
      p.phase += dt * 3.2;
    } else if (p.kind === 'flake') {
      p.vy += 10 * dt; // gentler gravity → slower fall
      p.vx += Math.sin(time * 0.0018 + p.phase) * p.sway * dt;
      p.vx *= 1 - 0.45 * dt;
      p.angle += p.spin * dt;
    } else {
      p.vy += 85 * dt;
      p.vx *= 1 - 1.6 * dt;
      p.vy *= 1 - 0.35 * dt;
      p.angle += p.spin * dt;
    }

    p.x += p.vx * dt;
    p.y += p.vy * dt;

    const t = p.life / p.maxLife;
    // Hold opacity longer in the middle of life.
    const alpha = t < 0.18 ? t / 0.18 : t > 0.78 ? (1 - t) / 0.22 : 1;
    if (alpha <= 0.01) continue;

    if (p.kind === 'blade') drawBlade(p, alpha);
    else if (p.kind === 'flake') drawFlake(p, alpha);
    else drawGrain(p, alpha);
  }

  ctx.globalAlpha = 1;
  schedule();
}

function schedule(): void {
  if (!running || raf || document.hidden) return;
  if (!pool.some((p) => p.alive)) {
    lastTime = 0;
    return;
  }
  raf = window.requestAnimationFrame(tick);
}

function resize(): void {
  if (!canvas || !ctx) return;
  const bounds = canvas.getBoundingClientRect();
  dpr = Math.min(2, window.devicePixelRatio || 1);
  width = bounds.width;
  height = bounds.height;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function onPointerMove(event: PointerEvent): void {
  if (!activeTheme || !effectsEnabled()) return;
  if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;

  const x = event.clientX;
  const y = event.clientY;
  if (!hasPointer) {
    hasPointer = true;
    lastX = x;
    lastY = y;
    return;
  }

  const dx = x - lastX;
  const dy = y - lastY;
  const dist = Math.hypot(dx, dy);
  if (dist >= TRAIL_DISTANCE) {
    spawn(activeTheme, x, y, false, dx, dy);
    lastX = x;
    lastY = y;
    schedule();
  }
}

function onPointerDown(event: PointerEvent): void {
  if (!activeTheme || !effectsEnabled()) return;
  if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
  if (event.button !== 0) return;
  spawn(activeTheme, event.clientX, event.clientY, true);
  schedule();
}

function onVisibility(): void {
  if (document.hidden) {
    lastTime = 0;
    if (raf) {
      window.cancelAnimationFrame(raf);
      raf = 0;
    }
    if (ctx) ctx.clearRect(0, 0, width, height);
  } else if (pool.some((p) => p.alive)) {
    raf = window.requestAnimationFrame(tick);
  }
}

function onThemeChange(): void {
  if (activeTheme) colors = readColors(activeTheme);
}

function ensureCanvas(): HTMLCanvasElement {
  const existing = document.querySelector<HTMLCanvasElement>(`canvas[${CANVAS_ATTR}]`);
  if (existing) return existing;

  const el = document.createElement('canvas');
  el.className = 'scene-cursor';
  el.setAttribute(CANVAS_ATTR, '');
  el.setAttribute('aria-hidden', 'true');
  document.body.appendChild(el);
  return el;
}

function bind(): void {
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerdown', onPointerDown, { passive: true });
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  const observer = new MutationObserver(onThemeChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}

/**
 * Mount (or reuse) the scene-cursor canvas for a themed page. Idempotent.
 */
export function initSceneCursor(theme: SceneCursorTheme): void {
  if (typeof window === 'undefined') return;
  if (!effectsEnabled()) return;

  activeTheme = theme;
  colors = readColors(theme);
  canvas = ensureCanvas();
  canvas.dataset.theme = theme;
  ctx = canvas.getContext('2d');
  if (!ctx) return;

  for (const p of pool) p.alive = false;

  resize();
  if (!bound) {
    bind();
    bound = true;
  }

  running = true;
}
