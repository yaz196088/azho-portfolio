'use client'

const TAPE_VARIANTS = [
  { rotate: -2.5, img: '/images/tape/tape-1.png' },
  { rotate: 1.8,  img: '/images/tape/tape-2.png' },
  { rotate: -1.2, img: '/images/tape/tape-3.png' },
  { rotate: 2.6,  img: '/images/tape/tape-4.png' },
  { rotate: -3.1, img: '/images/tape/tape-5.png' },
  { rotate: 1.4,  img: '/images/tape/tape-2.png', mirror: true },
]

export default function TapeLabel({
  text,
  variant = 0,
}: {
  text: string
  variant?: number
}) {
  const v = TAPE_VARIANTS[variant % TAPE_VARIANTS.length]

  return (
    <span
      style={{
        display: 'inline-block',
        position: 'relative',
        transform: `rotate(${v.rotate}deg)`,
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        padding: '0.15em 0.4em',
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
          top: '50%',
          left: '50%',
          width: '115%',
          height: '210%',
          minWidth: '160px',
          transform: `translate(-50%, -50%) ${v.mirror ? 'scaleX(-1)' : ''}`,
          objectFit: 'cover' as const,
          objectPosition: 'center',
          filter: 'saturate(0.9)',
          opacity: 0.95,
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
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap' as const,
          display: 'inline-block',
        }}
      >
        {text}
      </span>
    </span>
  )
}
