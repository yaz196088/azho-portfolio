'use client'

const TAPE_VARIANTS = [
  {
    rotate: -2.5,
    filterId: 'tape-warp-0',
    torn: 'polygon(2% 22%, 6% 4%, 18% 12%, 34% 0%, 52% 9%, 68% 2%, 84% 14%, 94% 3%, 100% 18%, 96% 38%, 100% 58%, 94% 76%, 98% 90%, 82% 100%, 66% 91%, 48% 100%, 30% 93%, 14% 100%, 4% 84%, 8% 62%, 0% 44%)',
  },
  {
    rotate: 1.8,
    filterId: 'tape-warp-1',
    torn: 'polygon(0% 14%, 10% 2%, 24% 10%, 40% 1%, 58% 11%, 74% 3%, 90% 13%, 100% 6%, 96% 26%, 100% 46%, 95% 64%, 100% 82%, 90% 96%, 74% 89%, 58% 98%, 40% 90%, 22% 99%, 8% 88%, 2% 68%, 6% 48%, 0% 30%)',
  },
  {
    rotate: -1.2,
    filterId: 'tape-warp-2',
    torn: 'polygon(4% 6%, 16% 16%, 30% 3%, 46% 13%, 62% 2%, 78% 12%, 92% 1%, 100% 20%, 94% 40%, 100% 60%, 93% 78%, 97% 95%, 80% 100%, 64% 90%, 48% 99%, 32% 89%, 16% 97%, 2% 85%, 6% 66%, 0% 46%, 5% 24%)',
  },
  {
    rotate: 2.6,
    filterId: 'tape-warp-3',
    torn: 'polygon(1% 20%, 9% 3%, 22% 14%, 38% 2%, 54% 12%, 70% 0%, 86% 11%, 99% 4%, 100% 24%, 95% 42%, 100% 62%, 94% 80%, 99% 94%, 84% 100%, 68% 92%, 50% 100%, 33% 91%, 17% 100%, 5% 87%, 9% 66%, 0% 48%)',
  },
  {
    rotate: -3.1,
    filterId: 'tape-warp-4',
    torn: 'polygon(3% 3%, 14% 15%, 28% 2%, 44% 12%, 60% 1%, 76% 13%, 92% 0%, 100% 22%, 93% 40%, 100% 58%, 92% 76%, 96% 92%, 78% 100%, 62% 89%, 44% 99%, 26% 88%, 10% 96%, 0% 82%, 6% 62%, 2% 42%, 8% 20%)',
  },
  {
    rotate: 1.4,
    filterId: 'tape-warp-5',
    torn: 'polygon(0% 26%, 8% 6%, 20% 16%, 36% 3%, 52% 14%, 68% 1%, 84% 12%, 96% 2%, 100% 20%, 94% 36%, 100% 56%, 93% 74%, 98% 88%, 82% 100%, 64% 90%, 46% 100%, 28% 91%, 12% 100%, 2% 84%, 7% 64%, 0% 46%)',
  },
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
        e.currentTarget.style.transform = `rotate(0deg) scale(1.02)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = `rotate(${v.rotate}deg) scale(1)`
      }}
    >
      {/* Tape backing — torn shape + grain + slight displacement warp */}
      <span
        style={{
          position: 'absolute',
          inset: '-14px -20px',
          background: `
            repeating-linear-gradient(
              78deg,
              rgba(255,255,255,0.10) 0px,
              rgba(255,255,255,0.10) 1px,
              transparent 1px,
              transparent 3px
            ),
            linear-gradient(100deg, rgba(230,218,194,0.92), rgba(214,200,172,0.88) 40%, rgba(232,220,196,0.92))
          `,
          clipPath: v.torn,
          filter: `url(#${v.filterId})`,
          boxShadow: '0 3px 8px rgba(16,15,13,0.18), inset 0 0 14px rgba(255,255,255,0.25), inset 0 0 3px rgba(16,15,13,0.15)',
          zIndex: 0,
        }}
      />
      {/* Grain overlay on top of the tape */}
      <span
        style={{
          position: 'absolute',
          inset: '-14px -20px',
          clipPath: v.torn,
          filter: 'url(#tape-grain)',
          opacity: 0.5,
          mixBlendMode: 'multiply' as const,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {/* Text — subtly warped by the same displacement filter */}
      <span
        style={{
          position: 'relative',
          zIndex: 2,
          fontFamily: "'Permanent Marker', cursive",
          fontSize: 'inherit',
          color: '#100F0D',
          padding: '4px 10px',
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap' as const,
          display: 'inline-block',
          filter: `url(#${v.filterId})`,
          opacity: 0.88,
        }}
      >
        {text}
      </span>
    </span>
  )
}
