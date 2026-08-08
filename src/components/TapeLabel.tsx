'use client'

const TAPE_VARIANTS = [
  { rotate: -2.5, img: '/images/tape/tape-1.png' },
  { rotate: 1.8,  img: '/images/tape/tape-2.png' },
  { rotate: -1.2, img: '/images/tape/tape-3.png' },
  { rotate: 2.6,  img: '/images/tape/tape-4.png' },
  { rotate: -3.1, img: '/images/tape/tape-5.png' },
  { rotate: 1.4,  img: '/images/tape/tape-1.png' }, // reuse, mirrored below
]

export default function TapeLabel({
  text,
  variant = 0,
}: {
  text: string
  variant?: number
}) {
  const v = TAPE_VARIANTS[variant % TAPE_VARIANTS.length]
  const isReused = variant === 5

  return (
    <span
      style={{
        display: 'inline-block',
        position: 'relative',
        transform: `rotate(${v.rotate}deg)`,
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = `rotate(0deg) scale(1.02)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = `rotate(${v.rotate}deg) scale(1)`
      }}
    >
      <img
        src={v.img}
        alt=""
        style={{
          position: 'absolute',
          inset: '-16px -24px',
          width: 'calc(100% + 48px)',
          height: 'calc(100% + 32px)',
          objectFit: 'fill',
          transform: isReused ? 'scaleX(-1)' : 'none',
          filter: 'saturate(0.85) brightness(1.02)',
          mixBlendMode: 'multiply' as const,
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
          padding: '4px 10px',
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap' as const,
          display: 'inline-block',
          opacity: 0.9,
        }}
      >
        {text}
      </span>
    </span>
  )
}
