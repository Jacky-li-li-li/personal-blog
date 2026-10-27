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
};

const CANVAS_ATTR = 'data-scene-cursor-canvas';
const MAX_PARTICLES = 120;
const TRAIL_DISTANCE = 8;
const TRAIL_SPAWN = 2;
const CLICK_SPAWN_MIN = 10;
const CLICK_SPAWN_MAX = 16;

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
    return [
      root.getPropertyValue('--about-grass-near').trim() || '#607f4d',
      root.getPropertyValue('--about-grass-mid').trim() || '#89a168',
      root.getPropertyValue('--about-grass-ink').trim() || '#2f5339',
      root.getPropertyValue('--about-grass-deep').trim() || '#3f6243',
    ];
  }
  if (theme === 'snow') {
    return [
      root.getPropertyValue('--work-snow').trim() || '#f4f5f1',
      root.getPropertyValue('--work-mountain-far').trim() || '#dde5e2',
      root.getPropertyValue('--work-mountain-mid').trim() || '#b9c9c8',
      '#ffffff',
    ];
  }

  // --notes-wind-rgb lives on .nav--notes; fall back to sand tokens on :root.
  const nav = document.querySelector('.nav--notes');
  const windSource = nav ? getComputedStyle(nav) : root;
  const wind = windSource.getPropertyValue('--notes-wind-rgb').trim();
  const sandNear = root.getPropertyValue('--notes-sand-near').trim() || '#be915b';
  const sandMid = root.getPropertyValue('--notes-sand-mid').trim() || '#d5b985';
  const sandInk = root.getPropertyValue('--notes-sand-ink').trim() || '#82613f';
  const sandShadow = root.getPropertyValue('--notes-sand-shadow').trim() || '#a97646';
  if (wind) {
    const rgb = wind.split(/\s+/).join(',');
    return [`rgb(${rgb})`, sandNear, sandMid, sandInk];
  }
  return [sandNear, sandMid, sandInk, sandShadow];
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

function spawn(
  theme: SceneCursorTheme,
  x: number,
  y: number,
  burst: boolean,
  dirX = 0,
  dirY = 0,
): void {
  const count = burst
    ? CLICK_SPAWN_MIN + Math.floor(Math.random() * (CLICK_SPAWN_MAX - CLICK_SPAWN_MIN + 1))
    : TRAIL_SPAWN;
  const dirLen = Math.hypot(dirX, dirY) || 1;
  const nx = dirX / dirLen;
  const ny = dirY / dirLen;

  for (let i = 0; i < count; i += 1) {
    const p = acquire();
    p.alive = true;
    p.colorIndex = Math.floor(Math.random() * colors.length);
    p.phase = Math.random() * Math.PI * 2;
    p.streak = Math.random() > 0.55;
    p.x = x + (Math.random() - 0.5) * (burst ? 10 : 4);
    p.y = y + (Math.random() - 0.5) * (burst ? 10 : 4);

    if (theme === 'grass') {
      p.kind = 'blade';
      p.maxLife = burst ? 0.7 + Math.random() * 0.55 : 0.45 + Math.random() * 0.45;
      p.size = burst ? 5 + Math.random() * 7 : 4 + Math.random() * 5;
      p.angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.9;
      p.spin = (Math.random() - 0.5) * 0.8;
      p.sway = 0.4 + Math.random() * 0.8;
      p.vx = (Math.random() - 0.5) * (burst ? 28 : 12);
      p.vy = burst ? -(18 + Math.random() * 36) : -(8 + Math.random() * 18);
    } else if (theme === 'snow') {
      p.kind = 'flake';
      p.maxLife = burst ? 0.85 + Math.random() * 0.5 : 0.55 + Math.random() * 0.55;
      p.size = burst ? 1.6 + Math.random() * 2.4 : 1.1 + Math.random() * 1.8;
      p.angle = Math.random() * Math.PI;
      p.spin = (Math.random() - 0.5) * 1.4;
      p.sway = 8 + Math.random() * 14;
      if (burst) {
        const a = Math.random() * Math.PI * 2;
        const speed = 40 + Math.random() * 90;
        p.vx = Math.cos(a) * speed;
        p.vy = Math.sin(a) * speed * 0.55 - 20;
      } else {
        p.vx = -nx * (12 + Math.random() * 28) + (Math.random() - 0.5) * 16;
        p.vy = 12 + Math.random() * 28;
      }
    } else {
      p.kind = 'grain';
      p.maxLife = burst ? 0.65 + Math.random() * 0.45 : 0.4 + Math.random() * 0.5;
      p.size = burst ? 0.7 + Math.random() * 1.4 : 0.45 + Math.random() * 0.9;
      p.angle = Math.atan2(ny, nx) + (Math.random() - 0.5) * 0.4;
      p.spin = (Math.random() - 0.5) * 2;
      p.sway = (Math.random() - 0.5) * 6;
      if (burst) {
        const a = Math.random() * Math.PI * 2;
        const speed = 50 + Math.random() * 110;
        p.vx = Math.cos(a) * speed;
        p.vy = Math.sin(a) * speed - 10;
      } else {
        p.vx = -nx * (20 + Math.random() * 40) + (Math.random() - 0.5) * 18;
        p.vy = -ny * (10 + Math.random() * 24) + 8 + Math.random() * 18;
      }
    }

    p.life = p.maxLife;
  }
}

function drawBlade(p: Particle, alpha: number): void {
  if (!ctx) return;
  const color = colors[p.colorIndex] ?? colors[0]!;
  const len = p.size * (0.55 + 0.45 * (p.life / p.maxLife));
  const tipX = p.x + Math.cos(p.angle) * len;
  const tipY = p.y + Math.sin(p.angle) * len;
  const bend = p.sway * Math.sin(p.phase) * 1.2;
  const midX = p.x + Math.cos(p.angle) * len * 0.5 + Math.cos(p.angle + Math.PI / 2) * bend;
  const midY = p.y + Math.sin(p.angle) * len * 0.5 + Math.sin(p.angle + Math.PI / 2) * bend;

  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.quadraticCurveTo(midX, midY, tipX, tipY);
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha * 0.72;
  ctx.lineWidth = Math.max(0.6, p.size * 0.14);
  ctx.lineCap = 'round';
  ctx.stroke();

  const ox = Math.cos(p.angle + Math.PI / 2) * Math.max(0.45, p.size * 0.08);
  const oy = Math.sin(p.angle + Math.PI / 2) * Math.max(0.45, p.size * 0.08);
  ctx.beginPath();
  ctx.moveTo(p.x + ox, p.y + oy);
  ctx.quadraticCurveTo(midX, midY, tipX, tipY);
  ctx.quadraticCurveTo(midX, midY, p.x - ox, p.y - oy);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha * 0.38;
  ctx.fill();
}

function drawFlake(p: Particle, alpha: number): void {
  if (!ctx) return;
  const color = colors[p.colorIndex] ?? colors[0]!;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);
  ctx.globalAlpha = alpha * 0.78;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(0.35, p.size * 0.22);
  ctx.lineCap = 'round';

  const arms = p.size > 2.2 ? 6 : 4;
  const r = p.size;
  for (let i = 0; i < arms; i += 1) {
    const a = (Math.PI * i) / arms;
    ctx.beginPath();
    ctx.moveTo(-Math.cos(a) * r, -Math.sin(a) * r);
    ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(0, 0, Math.max(0.35, r * 0.22), 0, Math.PI * 2);
  ctx.globalAlpha = alpha * 0.55;
  ctx.fill();
  ctx.restore();
}

function drawGrain(p: Particle, alpha: number): void {
  if (!ctx) return;
  const color = colors[p.colorIndex] ?? colors[0]!;
  if (p.streak) {
    ctx.beginPath();
    ctx.moveTo(p.x - p.vx * 0.02, p.y - p.vy * 0.015);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha * 0.35;
    ctx.lineWidth = Math.max(0.3, p.size * 0.45);
    ctx.lineCap = 'round';
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.ellipse(p.x, p.y, p.size * 1.25, p.size * 0.55, p.angle, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha * 0.7;
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
      p.vy += 55 * dt;
      p.vx *= 1 - 1.8 * dt;
      p.angle += p.spin * dt + Math.sin(time * 0.004 + p.phase) * 0.35 * dt;
      p.phase += dt * 4;
    } else if (p.kind === 'flake') {
      p.vy += 18 * dt;
      p.vx += Math.sin(time * 0.002 + p.phase) * p.sway * dt;
      p.vx *= 1 - 0.6 * dt;
      p.angle += p.spin * dt;
    } else {
      p.vy += 70 * dt;
      p.vx *= 1 - 2.2 * dt;
      p.vy *= 1 - 0.4 * dt;
      p.angle += p.spin * dt;
    }

    p.x += p.vx * dt;
    p.y += p.vy * dt;

    const t = p.life / p.maxLife;
    const alpha = t < 0.25 ? t / 0.25 : t > 0.85 ? (1 - t) / 0.15 : 1;
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

  // clear pool when switching theme on SPA-ish remounts
  for (const p of pool) p.alive = false;

  resize();
  if (!bound) {
    bind();
    bound = true;
  }

  running = true;
}
