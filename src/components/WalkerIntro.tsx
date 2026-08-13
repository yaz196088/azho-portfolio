'use client'
import { useEffect, useRef, useState } from 'react'

const IMAGES = Array.from({ length: 18 }, (_, i) =>
  `/images/loading/loading-${String(i + 1).padStart(2, '0')}.webp`
)

export default function WalkerIntro() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0) // 0 to 1
  const [done, setDone] = useState(false)
  const [isMobile, setIsMobile] = useState(false) // desktop during SSR

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    let raf: number
    const handleScroll = () => {
      if (!wrapperRef.current) return
      const rect = wrapperRef.current.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = -rect.top
      const p = Math.min(Math.max(scrolled / total, 0), 1)
      setProgress(p)
      if (p >= 0.999 && !done) setDone(true)
      if (p < 0.999 && done) setDone(false)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(handleScroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [done])

  // Figure x position: 0% (left edge) to 100% (right edge) of viewport width
  const figureX = progress * 100 // percentage

  // Leg swing driven by progress (sine wave for walk cycle)
  const legSwing = Math.sin(progress * Math.PI * 16) * 22 // degrees
  const armSwing = Math.sin(progress * Math.PI * 16 + Math.PI) * 16

  const COLS = isMobile ? 5 : 9
  const ROWS = isMobile ? 8 : 6
  const TILE_COUNT = COLS * ROWS
  // Falloff scales with column width so the push reads the same on both layouts
  const FALLOFF = isMobile ? 16 : 9

  return (
    <div
      ref={wrapperRef}
      style={{
        height: isMobile ? '220vh' : '280vh',
        position: 'relative',
        zIndex: done ? -1 : 50,
        pointerEvents: done ? 'none' : 'auto',
        visibility: done ? 'hidden' : 'visible',
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--ink)',
      }}>
        {/* Grid of images */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          gap: 0,
        }}>
          {Array.from({ length: TILE_COUNT }).map((_, i) => {
            const col = i % COLS
            const tileCenterXPercent = ((col + 0.5) / COLS) * 100
            const distance = Math.abs(tileCenterXPercent - figureX)
            const influence = Math.max(0, 1 - distance / FALLOFF)
            const pushDir = tileCenterXPercent > figureX ? 1 : -1
            const translateX = influence * pushDir * 26
            const opacity = 1 - influence * 0.85
            const scale = 1 - influence * 0.12

            return (
              <div
                key={i}
                style={{
                  overflow: 'hidden',
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  transition: 'none',
                }}
              >
                <img
                  src={IMAGES[i % IMAGES.length]}
                  alt=""
                  loading={i < COLS * 2 ? 'eager' : 'lazy'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Blurred peek window showing hero content beneath, positioned
            at figure location */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: `${figureX}%`,
          transform: 'translateX(-50%)',
          width: '140px',
          height: '100%',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          background: 'rgba(253,251,212,0.18)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />

        {/* Walking silhouette figure, procedural SVG */}
        <svg
          viewBox="0 0 100 220"
          style={{
            position: 'absolute',
            top: '50%',
            left: `${figureX}%`,
            transform: 'translate(-50%, -50%)',
            width: '90px',
            height: '200px',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <g fill="rgba(31,24,192,0.85)">
            {/* head */}
            <circle cx="50" cy="20" r="14" />
            {/* torso */}
            <rect x="42" y="34" width="16" height="70" rx="8" />
            {/* back leg */}
            <g transform={`rotate(${legSwing} 50 104)`}>
              <rect x="43" y="104" width="12" height="70" rx="6" />
            </g>
            {/* front leg */}
            <g transform={`rotate(${-legSwing} 50 104)`}>
              <rect x="45" y="104" width="12" height="70" rx="6" />
            </g>
            {/* back arm */}
            <g transform={`rotate(${armSwing} 50 40)`}>
              <rect x="44" y="40" width="8" height="50" rx="4" />
            </g>
            {/* front arm */}
            <g transform={`rotate(${-armSwing} 50 40)`}>
              <rect x="48" y="40" width="8" height="50" rx="4" />
            </g>
          </g>
        </svg>

        {/* Progress hint text, fades out as figure exits */}
        <div style={{
          position: 'absolute',
          bottom: '48px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '10px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase' as const,
          color: 'rgba(253,251,212,0.5)',
          opacity: 1 - progress,
          zIndex: 4,
        }}>
          Scroll to continue
        </div>
      </div>
    </div>
  )
}
