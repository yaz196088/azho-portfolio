'use client'
import { useEffect, useState } from 'react'

const TOTAL_IMAGES = 43
const IMAGES = Array.from({ length: TOTAL_IMAGES }, (_, i) =>
  `/images/loading/loading-${String(i + 1).padStart(2, '0')}.webp`
)

export default function DockIntro({ onDismiss }: { onDismiss: () => void }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [dissolving, setDissolving] = useState(false)
  const [isMobile, setIsMobile] = useState(false) // desktop during SSR

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  /* Lock page scroll while the gate is up, so the site can't be scrolled
     behind the overlay. */
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  /* 43 tiles across a phone is ~9px each — unusable. Show every third image
     on mobile so each tile is wide enough to see and touch. */
  const tiles = isMobile ? IMAGES.filter((_, i) => i % 3 === 0) : IMAGES

  const handleDismiss = () => {
    setDissolving(true)
    setTimeout(onDismiss, 900)
  }

  const getScale = (index: number) => {
    if (hoverIndex === null) return 1
    const distance = Math.abs(index - hoverIndex)
    if (distance === 0) return isMobile ? 1.6 : 1.9
    if (distance === 1) return isMobile ? 1.32 : 1.55
    if (distance === 2) return isMobile ? 1.14 : 1.28
    if (distance === 3) return 1.1
    return 1
  }

  const getZIndex = (index: number) => {
    if (hoverIndex === null) return 1
    const distance = Math.abs(index - hoverIndex)
    return 100 - distance
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: 'rgba(253,251,212,0.35)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: dissolving ? 0 : 1,
        transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: dissolving ? 'none' : 'auto',
      }}
    >
      <div
        onMouseLeave={() => setHoverIndex(null)}
        style={{
          display: 'flex',
          alignItems: 'center',
          height: isMobile ? '130px' : '180px',
          width: '100%',
          overflow: 'visible',
          padding: isMobile ? '0 6vw' : '0 4vw',
        }}
      >
        {tiles.map((src, i) => (
          <div
            key={src}
            onMouseEnter={() => setHoverIndex(i)}
            onTouchStart={() => setHoverIndex(i)}
            style={{
              flex: '1 1 0',
              height: '100%',
              position: 'relative',
              transform: `scale(${getScale(i)})`,
              transformOrigin: 'center center',
              zIndex: getZIndex(i),
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: hoverIndex === i
                ? '0 30px 60px rgba(31,24,192,0.3)'
                : '0 2px 8px rgba(31,24,192,0.08)',
            }}
          >
            <img
              src={src}
              alt=""
              loading={i < 8 ? 'eager' : 'lazy'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleDismiss}
        aria-label="Enter site"
        style={{
          position: 'absolute',
          bottom: '48px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(31,24,192,0.25)',
          transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateX(-50%) scale(1.12)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateX(-50%) scale(1)'
        }}
      >
        <img
          src="/images/elements/home-icon.png"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </button>
    </div>
  )
}
