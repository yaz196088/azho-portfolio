'use client'
import { useState, useEffect } from 'react'

export type TapeAdjust = {
  x: number      // horizontal offset in px
  y: number      // vertical offset in px
  scale: number  // scale multiplier
  rotate: number // rotation in degrees
  img: string    // path to tape image
}

declare global {
  interface Window { __tapeOverrides?: TapeAdjust[] }
}

const DEFAULT_VARIANTS: TapeAdjust[] = [
  { x: 0, y: 0, scale: 1, rotate: -2.5, img: '/images/tape/tape-1.png' },
  { x: 0, y: 0, scale: 1, rotate: 1.8,  img: '/images/tape/tape-2.png' },
  { x: 0, y: 0, scale: 1, rotate: -1.2, img: '/images/tape/tape-3.png' },
  { x: 0, y: 0, scale: 1, rotate: 2.6,  img: '/images/tape/tape-4.png' },
  { x: 0, y: 0, scale: 1, rotate: -3.1, img: '/images/tape/tape-5.png' },
  { x: 0, y: 0, scale: 1, rotate: 1.4,  img: '/images/tape/tape-2.png' },
]

export { DEFAULT_VARIANTS }

export default function TapeLabel({
  text,
  variant = 0,
  adjust,
}: {
  text: string
  variant?: number
  adjust?: TapeAdjust
}) {
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    const handler = () => forceUpdate(n => n + 1)
    window.addEventListener('tape-update', handler)
    return () => window.removeEventListener('tape-update', handler)
  }, [])

  const v =
    adjust ||
    (typeof window !== 'undefined' && window.__tapeOverrides?.[variant]) ||
    DEFAULT_VARIANTS[variant % DEFAULT_VARIANTS.length]

  return (
    <span
      data-tape-variant={variant}
      style={{
        display: 'inline-block',
        position: 'relative',
        padding: '0.15em 0.4em',
      }}
    >
      <img
        src={v.img}
        alt=""
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '112%',
          height: '190%',
          minWidth: '120px',
          transform: `translate(-50%, -50%) translate(${v.x}px, ${v.y}px) rotate(${v.rotate}deg) scale(${v.scale})`,
          objectFit: 'cover' as const,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <span
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: "'Permanent Marker', cursive",
          fontSize: 'inherit',
          color: '#100F0D',
          whiteSpace: 'nowrap' as const,
          display: 'inline-block',
        }}
      >
        {text}
      </span>
    </span>
  )
}
