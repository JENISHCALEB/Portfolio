/**
 * HeroCanvas.jsx
 * ─────────────────────────────────────────────────────────────
 * A full-screen cinematic Canvas animation:
 *   • Neural-network nodes with pulsing glow
 *   • Flowing energy streams along edges
 *   • Data packets that travel down edges
 *   • Rotating hexagons at different depths
 *   • Electric arc bursts between near nodes
 *   • Floating AI / tech symbol glyphs
 *   • Matrix-style digit rain columns
 *   • Mouse attraction — particles & lines bend toward cursor
 *   • Subtle cursor glow ring
 *
 * Colors: #050505 bg, #E50914 red glow, crimson, white accents
 * Performance: requestAnimationFrame + will-change + reduced-motion guard
 * ─────────────────────────────────────────────────────────────
 */
import { useEffect, useRef } from 'react'

/* ── Palette ─────────────────────────────────────────────── */
const RED        = 'rgba(229,9,20,'
const CRIMSON    = 'rgba(180,0,30,'
const DARK_RED   = 'rgba(120,0,15,'
const WHITE      = 'rgba(255,255,255,'
const SOFT_WHITE = 'rgba(220,200,200,'

/* ── Helpers ─────────────────────────────────────────────── */
const rand   = (a, b) => a + Math.random() * (b - a)
const randI  = (a, b) => Math.floor(rand(a, b))
const lerp   = (a, b, t) => a + (b - a) * t
const dist   = (ax, ay, bx, by) => Math.hypot(ax - bx, ay - by)
const clamp  = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

/* ── AI/Tech glyph set (unicode, circuit, AI symbols) ───── */
const GLYPHS = ['⬡','◈','⬢','◉','⊕','⊗','⌬','△','⋮','⋯',
                '01','10','AI','ML','∑','∞','⟨⟩','{}','</>','∇']

/* ═══════════════════════════════════════════════════════════
   NODE — a neural-network connection point
   ═══════════════════════════════════════════════════════════ */
class Node {
  constructor(W, H) { this.reset(W, H) }
  reset(W, H) {
    this.x   = rand(0, W)
    this.y   = rand(0, H)
    this.vx  = rand(-0.18, 0.18)
    this.vy  = rand(-0.12, 0.12)
    this.r   = rand(2, 5)
    this.alpha = rand(0.4, 0.9)
    // Pulse timing
    this.pulseSpeed = rand(0.008, 0.025)
    this.pulsePhase = rand(0, Math.PI * 2)
    // Depth layer (0=far, 1=near) — affects speed & brightness
    this.depth = rand(0, 1)
    this.speedMul = 0.4 + this.depth * 0.6
    // Random colour: red or soft-white
    this.isRed = Math.random() < 0.65
    this.W = W; this.H = H
  }
  update(t, mouse) {
    // Mouse attraction — gentle pull
    if (mouse.x !== null) {
      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const d = Math.hypot(dx, dy)
      if (d < 200) {
        const force = (200 - d) / 200 * 0.015 * this.speedMul
        this.vx += dx / d * force
        this.vy += dy / d * force
      }
    }
    // Dampen velocity
    this.vx *= 0.992
    this.vy *= 0.992
    this.x += this.vx * this.speedMul
    this.y += this.vy * this.speedMul
    // Wrap edges
    if (this.x < -10) this.x = this.W + 10
    if (this.x > this.W + 10) this.x = -10
    if (this.y < -10) this.y = this.H + 10
    if (this.y > this.H + 10) this.y = -10
    this.pulsePhase += this.pulseSpeed
  }
  draw(ctx) {
    const pulse = 0.5 + 0.5 * Math.sin(this.pulsePhase)
    const glow = this.r * 4 * (0.6 + 0.4 * pulse)
    const col = this.isRed ? RED : WHITE
    const a = this.alpha * (0.5 + 0.5 * pulse)
    // Outer glow
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glow)
    grad.addColorStop(0, col + a + ')')
    grad.addColorStop(0.4, col + (a * 0.3) + ')')
    grad.addColorStop(1, col + '0)')
    ctx.beginPath()
    ctx.arc(this.x, this.y, glow, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()
    // Core dot
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r * (0.8 + 0.2 * pulse), 0, Math.PI * 2)
    ctx.fillStyle = col + Math.min(a + 0.3, 1) + ')'
    ctx.fill()
  }
}

/* ═══════════════════════════════════════════════════════════
   DATA PACKET — travels along an edge between two nodes
   ═══════════════════════════════════════════════════════════ */
class Packet {
  constructor(src, dst) {
    this.src = src
    this.dst = dst
    this.t   = 0
    this.speed = rand(0.004, 0.012)
    this.size  = rand(2, 4)
    this.alive = true
    this.isRed = Math.random() < 0.7
  }
  update() {
    this.t += this.speed
    if (this.t >= 1) this.alive = false
  }
  draw(ctx) {
    const x = lerp(this.src.x, this.dst.x, this.t)
    const y = lerp(this.src.y, this.dst.y, this.t)
    // Trail
    for (let i = 1; i <= 6; i++) {
      const ti = Math.max(0, this.t - this.speed * i * 3)
      const tx = lerp(this.src.x, this.dst.x, ti)
      const ty = lerp(this.src.y, this.dst.y, ti)
      const a  = (1 - i / 6) * 0.6
      ctx.beginPath()
      ctx.arc(tx, ty, this.size * (1 - i / 7), 0, Math.PI * 2)
      ctx.fillStyle = (this.isRed ? RED : WHITE) + a + ')'
      ctx.fill()
    }
    // Head
    ctx.beginPath()
    ctx.arc(x, y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = WHITE + '0.95)'
    ctx.shadowBlur = 8
    ctx.shadowColor = this.isRed ? '#E50914' : '#fff'
    ctx.fill()
    ctx.shadowBlur = 0
  }
}

/* ═══════════════════════════════════════════════════════════
   HEXAGON — rotating geometric shape at a fixed position
   ═══════════════════════════════════════════════════════════ */
class Hexagon {
  constructor(W, H) {
    this.x     = rand(0, W)
    this.y     = rand(0, H)
    this.r     = rand(18, 55)
    this.angle = rand(0, Math.PI * 2)
    this.omega = rand(-0.003, 0.003) // rotation speed
    this.alpha = rand(0.04, 0.14)
    this.depth = rand(0, 1)
    this.strokeW = rand(0.5, 1.5)
    this.pulse = rand(0, Math.PI * 2)
    this.pulseSpeed = rand(0.01, 0.025)
    this.isRed = Math.random() < 0.55
  }
  update() {
    this.angle += this.omega
    this.pulse += this.pulseSpeed
  }
  draw(ctx) {
    const a = this.alpha * (0.6 + 0.4 * Math.sin(this.pulse))
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    // Outer hex
    this._hex(ctx, this.r, a)
    // Inner hex (smaller, rotated opposite)
    ctx.rotate(Math.PI / 6)
    this._hex(ctx, this.r * 0.55, a * 0.5)
    ctx.restore()
  }
  _hex(ctx, r, a) {
    const col = this.isRed ? RED : SOFT_WHITE
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i
      const x = Math.cos(angle) * r
      const y = Math.sin(angle) * r
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.strokeStyle = col + a + ')'
    ctx.lineWidth = this.strokeW
    ctx.stroke()
  }
}

/* ═══════════════════════════════════════════════════════════
   GLYPH — floating AI / tech symbol
   ═══════════════════════════════════════════════════════════ */
class Glyph {
  constructor(W, H) {
    this.W = W; this.H = H
    this.reset()
  }
  reset() {
    this.x     = rand(0, this.W)
    this.y     = rand(-50, this.H + 50)
    this.text  = GLYPHS[randI(0, GLYPHS.length)]
    this.size  = rand(10, 22)
    this.alpha = rand(0.05, 0.2)
    this.vy    = rand(0.15, 0.6)
    this.vx    = rand(-0.1, 0.1)
    this.life  = 0
    this.maxLife = rand(200, 600)
    this.isRed = Math.random() < 0.5
  }
  update() {
    this.x += this.vx
    this.y -= this.vy   // float upward
    this.life++
    if (this.life > this.maxLife || this.y < -60) this.reset()
  }
  draw(ctx) {
    const progress = this.life / this.maxLife
    const fade = progress < 0.1 ? progress / 0.1
               : progress > 0.85 ? (1 - progress) / 0.15 : 1
    const col = this.isRed ? RED : SOFT_WHITE
    ctx.font = `${this.size}px 'Courier New', monospace`
    ctx.fillStyle = col + (this.alpha * fade) + ')'
    ctx.fillText(this.text, this.x, this.y)
  }
}

/* ═══════════════════════════════════════════════════════════
   ENERGY STREAM — a bezier arc that pulses with light
   ═══════════════════════════════════════════════════════════ */
class EnergyStream {
  constructor(W, H) {
    this.W = W; this.H = H
    this.reset()
  }
  reset() {
    // Random start on left or top edge → end on right or bottom
    const side = Math.floor(Math.random() * 4)
    switch(side) {
      case 0: this.x1 = rand(0, this.W);  this.y1 = 0; break
      case 1: this.x1 = this.W;           this.y1 = rand(0, this.H); break
      case 2: this.x1 = rand(0, this.W);  this.y1 = this.H; break
      default:this.x1 = 0;                this.y1 = rand(0, this.H)
    }
    this.x2 = rand(0, this.W)
    this.y2 = rand(0, this.H)
    this.cx1 = rand(0, this.W)
    this.cy1 = rand(0, this.H)
    this.cx2 = rand(0, this.W)
    this.cy2 = rand(0, this.H)
    this.t     = 0
    this.speed = rand(0.003, 0.009)
    this.alpha = rand(0.06, 0.22)
    this.width = rand(0.5, 2)
    this.alive = true
    this.isRed = Math.random() < 0.6
    this.life  = 0
    this.maxLife = rand(120, 300)
  }
  update() {
    this.t = Math.min(1, this.t + this.speed)
    this.life++
    if (this.life > this.maxLife) this.alive = false
  }
  draw(ctx) {
    const fade = this.t < 0.1 ? this.t / 0.1
               : this.t > 0.85 ? (1 - this.t) / 0.15 : 1
    const col = this.isRed ? RED : WHITE
    // Draw the full bezier in low alpha
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(this.x1, this.y1)
    ctx.bezierCurveTo(this.cx1, this.cy1, this.cx2, this.cy2, this.x2, this.y2)
    ctx.strokeStyle = col + (this.alpha * 0.5 * fade) + ')'
    ctx.lineWidth = this.width
    ctx.stroke()
    // Bright moving dot along the path
    const bx = this._bezierPt(this.x1, this.cx1, this.cx2, this.x2, this.t)
    const by = this._bezierPt(this.y1, this.cy1, this.cy2, this.y2, this.t)
    // Trail dots
    for (let i = 1; i <= 8; i++) {
      const ti = Math.max(0, this.t - this.speed * i * 4)
      const tx = this._bezierPt(this.x1, this.cx1, this.cx2, this.x2, ti)
      const ty = this._bezierPt(this.y1, this.cy1, this.cy2, this.y2, ti)
      ctx.beginPath()
      ctx.arc(tx, ty, this.width * 1.5 * (1 - i / 9), 0, Math.PI * 2)
      ctx.fillStyle = col + ((1 - i / 9) * 0.5 * fade) + ')'
      ctx.fill()
    }
    // Head
    ctx.beginPath()
    ctx.arc(bx, by, this.width * 3, 0, Math.PI * 2)
    ctx.fillStyle = WHITE + (0.9 * fade) + ')'
    ctx.shadowBlur = 10
    ctx.shadowColor = this.isRed ? '#E50914' : '#fff'
    ctx.fill()
    ctx.shadowBlur = 0
    ctx.restore()
  }
  _bezierPt(p0, p1, p2, p3, t) {
    const mt = 1 - t
    return mt*mt*mt*p0 + 3*mt*mt*t*p1 + 3*mt*t*t*p2 + t*t*t*p3
  }
}

/* ═══════════════════════════════════════════════════════════
   ELECTRIC ARC — jagged lightning between two points
   ═══════════════════════════════════════════════════════════ */
class ElectricArc {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1; this.y1 = y1
    this.x2 = x2; this.y2 = y2
    this.life = 0
    this.maxLife = randI(8, 22)
    this.alive = true
    this.segs = 8
    this.offset = rand(8, 28)
  }
  update() { this.life++; if (this.life >= this.maxLife) this.alive = false }
  draw(ctx) {
    const a = (1 - this.life / this.maxLife) * 0.7
    ctx.save()
    ctx.strokeStyle = RED + a + ')'
    ctx.lineWidth   = rand(0.5, 1.5)
    ctx.shadowBlur  = 8
    ctx.shadowColor = '#E50914'
    ctx.beginPath()
    ctx.moveTo(this.x1, this.y1)
    for (let i = 1; i < this.segs; i++) {
      const t = i / this.segs
      const bx = lerp(this.x1, this.x2, t) + rand(-this.offset, this.offset)
      const by = lerp(this.y1, this.y2, t) + rand(-this.offset, this.offset)
      ctx.lineTo(bx, by)
    }
    ctx.lineTo(this.x2, this.y2)
    ctx.stroke()
    ctx.shadowBlur = 0
    ctx.restore()
  }
}

/* ═══════════════════════════════════════════════════════════
   SCAN LINE — horizontal beam that sweeps the canvas
   ═══════════════════════════════════════════════════════════ */
class ScanLine {
  constructor(H) {
    this.y = rand(0, H)
    this.H = H
    this.vy = rand(0.3, 1.2)
    this.alpha = rand(0.04, 0.12)
    this.width = rand(1, 3)
  }
  update() {
    this.y += this.vy
    if (this.y > this.H + 10) this.y = -10
  }
  draw(ctx, W) {
    const grad = ctx.createLinearGradient(0, this.y, W, this.y)
    grad.addColorStop(0, RED + '0)')
    grad.addColorStop(0.2, RED + this.alpha + ')')
    grad.addColorStop(0.5, WHITE + (this.alpha * 0.5) + ')')
    grad.addColorStop(0.8, RED + this.alpha + ')')
    grad.addColorStop(1, RED + '0)')
    ctx.beginPath()
    ctx.moveTo(0, this.y)
    ctx.lineTo(W, this.y)
    ctx.strokeStyle = grad
    ctx.lineWidth = this.width
    ctx.stroke()
  }
}

/* ═══════════════════════════════════════════════════════════
   MAIN CANVAS COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    /* ── Sizing ── */
    let W, H
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width  = W * dpr
      canvas.height = H * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    /* ── Mouse tracking ── */
    const mouse = { x: null, y: null }
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouse.x = null; mouse.y = null }
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    /* ── Particle count scales with screen ── */
    const isLowEnd = navigator.hardwareConcurrency <= 4
    const nodeCount    = isLowEnd ? 40  : 80
    const hexCount     = isLowEnd ? 6   : 14
    const glyphCount   = isLowEnd ? 10  : 22
    const streamCount  = isLowEnd ? 4   : 9
    const scanCount    = isLowEnd ? 2   : 4
    const MAX_EDGE_DIST = 160

    /* ── Initialise scene objects ── */
    const nodes    = Array.from({ length: nodeCount }, () => new Node(W, H))
    const hexes    = Array.from({ length: hexCount  }, () => new Hexagon(W, H))
    const glyphs   = Array.from({ length: glyphCount}, () => new Glyph(W, H))
    const streams  = Array.from({ length: streamCount},() => new EnergyStream(W, H))
    const scans    = Array.from({ length: scanCount  }, () => new ScanLine(H))
    const packets  = []
    const arcs     = []

    let frame = 0
    let rafId

    /* ── Spawn packet on random close-enough edge ── */
    const trySpawnPacket = () => {
      if (packets.length > 30) return
      const i = randI(0, nodes.length)
      const ni = nodes[i]
      for (let j = i + 1; j < nodes.length; j++) {
        const nj = nodes[j]
        if (dist(ni.x, ni.y, nj.x, nj.y) < MAX_EDGE_DIST) {
          if (Math.random() < 0.04) packets.push(new Packet(ni, nj))
          break
        }
      }
    }

    /* ── Spawn electric arc between close nodes ── */
    const trySpawnArc = () => {
      if (arcs.length > 8) return
      const i = randI(0, nodes.length)
      const ni = nodes[i]
      for (let j = i + 1; j < nodes.length; j++) {
        const nj = nodes[j]
        const d = dist(ni.x, ni.y, nj.x, nj.y)
        if (d < 90 && Math.random() < 0.005) {
          arcs.push(new ElectricArc(ni.x, ni.y, nj.x, nj.y))
          break
        }
      }
    }

    /* ── Respawn streams ── */
    const tryRespawnStream = () => {
      streams.forEach((s, i) => {
        if (!s.alive) streams[i] = new EnergyStream(W, H)
      })
    }

    /* ════════════════════════════════════════════
       RENDER LOOP
       ════════════════════════════════════════════ */
    const draw = () => {
      frame++
      ctx.clearRect(0, 0, W, H)

      /* Vignette / ambient glow background */
      const vgGrad = ctx.createRadialGradient(W * 0.7, H * 0.4, 0, W * 0.7, H * 0.4, W * 0.8)
      vgGrad.addColorStop(0, 'rgba(229,9,20,0.04)')
      vgGrad.addColorStop(0.5, 'rgba(100,0,10,0.02)')
      vgGrad.addColorStop(1, 'rgba(5,5,5,0)')
      ctx.fillStyle = vgGrad
      ctx.fillRect(0, 0, W, H)

      /* ─── Scan lines ─────────────────────────── */
      scans.forEach(s => { s.update(); s.draw(ctx, W) })

      /* ─── Hexagons (back layer) ───────────────── */
      hexes.forEach(h => { h.update(); h.draw(ctx) })

      /* ─── Glyphs (mid layer) ─────────────────── */
      glyphs.forEach(g => { g.update(); g.draw(ctx) })

      /* ─── Energy streams ─────────────────────── */
      tryRespawnStream()
      streams.forEach(s => { s.update(); s.draw(ctx) })

      /* ─── Neural edges between nearby nodes ───── */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const ni = nodes[i], nj = nodes[j]
          const d = dist(ni.x, ni.y, nj.x, nj.y)
          if (d < MAX_EDGE_DIST) {
            const a = (1 - d / MAX_EDGE_DIST) * 0.35
            // Edge colour: red when both nodes are red
            const col = (ni.isRed && nj.isRed) ? RED : (ni.isRed || nj.isRed) ? CRIMSON : SOFT_WHITE
            // Slightly bend line toward mouse
            let mx = (ni.x + nj.x) / 2
            let my = (ni.y + nj.y) / 2
            if (mouse.x !== null) {
              const md = dist(mx, my, mouse.x, mouse.y)
              if (md < 180) {
                const pull = (180 - md) / 180 * 12
                mx += (mouse.x - mx) / md * pull
                my += (mouse.y - my) / md * pull
              }
            }
            ctx.beginPath()
            ctx.moveTo(ni.x, ni.y)
            ctx.quadraticCurveTo(mx, my, nj.x, nj.y)
            ctx.strokeStyle = col + a + ')'
            ctx.lineWidth = 0.7 * (ni.depth + nj.depth) / 2 + 0.3
            ctx.stroke()
          }
        }
      }

      /* ─── Nodes ──────────────────────────────── */
      nodes.forEach(n => { n.update(frame, mouse); n.draw(ctx) })

      /* ─── Data packets ───────────────────────── */
      if (frame % 4 === 0) trySpawnPacket()
      for (let i = packets.length - 1; i >= 0; i--) {
        packets[i].update(); packets[i].draw(ctx)
        if (!packets[i].alive) packets.splice(i, 1)
      }

      /* ─── Electric arcs ──────────────────────── */
      if (frame % 30 === 0) trySpawnArc()
      for (let i = arcs.length - 1; i >= 0; i--) {
        arcs[i].update(); arcs[i].draw(ctx)
        if (!arcs[i].alive) arcs.splice(i, 1)
      }

      /* ─── Cursor glow ────────────────────────── */
      if (mouse.x !== null) {
        const cGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 60)
        cGrad.addColorStop(0, RED + '0.08)')
        cGrad.addColorStop(0.5, RED + '0.03)')
        cGrad.addColorStop(1, RED + '0)')
        ctx.fillStyle = cGrad
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2)
        ctx.fill()
        // Thin ring
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2)
        ctx.strokeStyle = RED + '0.25)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      rafId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'auto',   // needs pointer events for mouse tracking
        willChange: 'transform', // hints GPU compositing
        zIndex: 0,
      }}
    />
  )
}
