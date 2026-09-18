// Brand devices: the official Constructor University wordmark (vector, never
// re-typeset), the five-colour ribbon, and the modular shape system from the
// Constructor identity (decorative only, never behind body copy).
import type { CSSProperties } from 'react'

export function Logo({ size = 22, onDark = false, style }: { size?: number; onDark?: boolean; style?: CSSProperties }) {
  const src = onDark ? '/brand/cu-wordmark-white.svg' : '/brand/cu-wordmark-navy.svg'
  // The lockup is 2359.56 × 650.24 (≈3.63:1)
  return <img src={src} alt="Constructor University" style={{ height: size, width: 'auto', display: 'block', ...style }} />
}

export function Ribbon({ onNavy = false, style }: { onNavy?: boolean; style?: CSSProperties }) {
  return (
    <div className={`ribbon ${onNavy ? 'on-navy' : ''}`} aria-hidden style={style}>
      <span /><span /><span /><span /><span />
    </div>
  )
}

type Shape = { k: 'quarter' | 'qring' | 'corner' | 'chev' | 'dot' | 'square'; c: string; q?: number } | null

const D: Record<string, string> = {
  quarter: 'M100,100 L0,100 A100,100 0 0 1 100,0 Z',
  qring: 'M0,100 A100,100 0 0 1 100,0 L100,52 A48,48 0 0 0 52,100 Z',
  corner: 'M0,0 H100 V38 H38 V100 H0 Z',
  chev: 'M22,12 L84,50 L22,88 V62 L46,50 L22,38 Z',
}

export function Shapes({ rows, cell = 36, style, className }: { rows: Shape[][]; cell?: number; style?: CSSProperties; className?: string }) {
  const cols = Math.max(...rows.map((r) => r.length))
  return (
    <svg width={cols * cell} height={rows.length * cell} viewBox={`0 0 ${cols * 100} ${rows.length * 100}`} style={{ display: 'block', ...style }} className={className} aria-hidden>
      {rows.flatMap((r, ri) => r.map((s, ci) => {
        if (!s) return null
        const t = `translate(${ci * 100},${ri * 100})${s.q ? ` rotate(${s.q * 90},50,50)` : ''}`
        return (
          <g key={`${ri}-${ci}`} transform={t}>
            {s.k === 'dot' ? <circle cx="50" cy="50" r="24" fill={s.c} />
              : s.k === 'square' ? <rect x="26" y="26" width="48" height="48" fill={s.c} />
              : <path d={D[s.k]} fill={s.c} />}
          </g>
        )
      }))}
    </svg>
  )
}

// A ready-made cluster for hero corners.
export const HERO_SHAPES: Shape[][] = [
  [null, { k: 'quarter', c: '#00B2FF', q: 0 }, { k: 'square', c: '#FFC700' }],
  [{ k: 'corner', c: '#EB1700', q: 2 }, { k: 'qring', c: '#FFFFFF', q: 1 }, { k: 'dot', c: '#00D19E' }],
  [{ k: 'chev', c: '#00B2FF' }, null, { k: 'quarter', c: '#EB1700', q: 2 }],
]
