'use client'

const TAPE_VARIANTS = [
  { rotate: -2.5, torn: 'polygon(2% 15%, 8% 0%, 94% 8%, 100% 20%, 97% 82%, 91% 100%, 6% 92%, 0% 78%)' },
  { rotate: 1.8,  torn: 'polygon(0% 8%, 92% 0%, 100% 12%, 98% 88%, 90% 100%, 10% 96%, 3% 85%, 0% 22%)' },
  { rotate: -1.2, torn: 'polygon(4% 0%, 96% 6%, 100% 90%, 93% 100%, 8% 94%, 0% 84%, 2% 18%, 6% 4%)' },
  { rotate: 2.6,  torn: 'polygon(1% 12%, 90% 0%, 99% 18%, 100% 85%, 88% 100%, 5% 90%, 0% 70%, 3% 25%)' },
  { rotate: -3.1, torn: 'polygon(3% 4%, 95% 0%, 100% 22%, 96% 92%, 85% 100%, 10% 88%, 0% 65%, 5% 10%)' },
  { rotate: 1.4,  torn: 'polygon(0% 18%, 88% 2%, 100% 0%, 97% 80%, 92% 100%, 12% 94%, 2% 76%, 0% 40%)' },
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
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = `rotate(0deg) scale(1.03)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = `rotate(${v.rotate}deg) scale(1)`
      }}
    >
      <span
        style={{
          position: 'absolute',
          inset: '-10px -16px',
          background: 'rgba(230, 218, 194, 0.85)',
          clipPath: v.torn,
          boxShadow: '0 4px 10px rgba(16,15,13,0.12), inset 0 0 20px rgba(255,255,255,0.3)',
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
          padding: '2px 6px',
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </span>
    </span>
  )
}
