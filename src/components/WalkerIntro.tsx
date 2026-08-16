'use client'
import { useEffect, useRef, useState } from 'react'

const IMAGES = Array.from({ length: 18 }, (_, i) =>
  `/images/loading/loading-${String(i + 1).padStart(2, '0')}.webp`
)

export default function WalkerIntro({ onDone }: { onDone?: (v: boolean) => void }) {
  const [progress, setProgress] = useState(0) // 0 to 1
  const [done, setDone] = useState(false)
  const [isMobile, setIsMobile] = useState(false) // desktop during SSR
  const doneRef = useRef(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  /* Scroll distance the walk consumes. The spacer below reserves exactly this
     much, so when the hero switches to normal flow it starts at document Y ==
     scrollY — landing flush at the top of the viewport with no dead space. */
  const SPACER_VH = isMobile ? 70 : 80

  useEffect(() => {
    let raf: number
    const handleScroll = () => {
      const total = (SPACER_VH / 100) * window.innerHeight
      const p = Math.min(Math.max(window.scrollY / total, 0), 1)
      setProgress(p)
      // Hysteresis: latch at the very end, release only after backing off a
      // little, so the hero's fixed/relative swap can't flap on one wheel tick.
      if (!doneRef.current && p >= 0.995) {
        doneRef.current = true
        setDone(true)
        onDone?.(true)
      } else if (doneRef.current && p < 0.97) {
        doneRef.current = false
        setDone(false)
        onDone?.(false)
      }
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(handleScroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [SPACER_VH, onDone])

  // Figure position, percentage of viewport
  const figureX = progress * 100
  const figureY = 50

  /* ── Sprite sheet walk cycle: 4 x 2 = 8 frames ── */
  const SPRITE_COLS = 4
  const SPRITE_ROWS = 2
  const TOTAL_FRAMES = 8
  // Loop the cycle several times across the walk rather than once
  const CYCLES = 6
  const frameIndex = Math.floor(progress * TOTAL_FRAMES * CYCLES) % TOTAL_FRAMES
  const spriteCol = frameIndex % SPRITE_COLS
  const spriteRow = Math.floor(frameIndex / SPRITE_COLS)

  const COLS = isMobile ? 5 : 9
  const ROWS = isMobile ? 8 : 6
  const TILE_COUNT = COLS * ROWS

  /* Oval cut-out tracking the figure. The grid hides inside it; the blur layer
     shows only inside it. */
  const OVAL = `ellipse ${isMobile ? 110 : 145}px ${isMobile ? 180 : 235}px at ${figureX}% ${figureY}%`
  const HOLE = `radial-gradient(${OVAL}, transparent 70%, black 78%)`
  const HOLE_INV = `radial-gradient(${OVAL}, black 70%, transparent 78%)`

  return (
    <>
      {/* In-flow spacer: the walk's scroll distance */}
      <div style={{ height: `${SPACER_VH}vh` }} aria-hidden />

      {/* Fixed overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
          zIndex: 900,
          pointerEvents: done ? 'none' : 'auto',
          visibility: done ? 'hidden' : 'visible',
          background: 'transparent',
        }}
      >
        {/* Blur layer — sits between the fixed hero and the grid, visible only
            through the oval, so the revealed hero glimpse reads as soft. */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          maskImage: HOLE_INV,
          WebkitMaskImage: HOLE_INV,
          pointerEvents: 'none',
        }} />

        {/* Grid of images, with a real hole punched at the figure */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          gap: 0,
          maskImage: HOLE,
          WebkitMaskImage: HOLE,
        }}>
          {Array.from({ length: TILE_COUNT }).map((_, i) => {
            const col = i % COLS
            const row = Math.floor(i / COLS)
            const tileCenterXPercent = ((col + 0.5) / COLS) * 100
            const tileCenterYPercent = ((row + 0.5) / ROWS) * 100
            const dx = tileCenterXPercent - figureX
            const dy = (tileCenterYPercent - figureY) * 0.6
            const distance = Math.sqrt(dx * dx + dy * dy)
            const influence = Math.max(0, 1 - distance / 12)
            const angle = Math.atan2(dy, dx)
            const pushAmount = influence * 34
            const translateX = Math.cos(angle) * pushAmount
            const translateY = Math.sin(angle) * pushAmount
            const opacity = 1 - influence * 0.9
            const scale = 1 - influence * 0.15

            return (
              <div
                key={i}
                style={{
                  overflow: 'hidden',
                  transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
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

        {/* Sprite-sheet walk animation. Cells are 252x534 (1:2.12), so the
            box keeps that ratio; the artwork faces left, hence scaleX(-1). */}
        <div
          style={{
            position: 'absolute',
            top: `${figureY}%`,
            left: `${figureX}%`,
            transform: 'translate(-50%, -50%) scaleX(-1)',
            width: isMobile ? '140px' : '190px',
            height: isMobile ? '297px' : '403px',
            backgroundImage: 'url(/images/walker/walkers.png)',
            backgroundSize: `${SPRITE_COLS * 100}% ${SPRITE_ROWS * 100}%`,
            backgroundPosition: `${(spriteCol / (SPRITE_COLS - 1)) * 100}% ${(spriteRow / (SPRITE_ROWS - 1)) * 100}%`,
            backgroundRepeat: 'no-repeat',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        {/* Progress hint text, fades out as figure exits */}
        <div style={{
          position: 'absolute',
          bottom: '48px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '10px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase' as const,
          color: 'rgba(253,251,212,0.75)',
          textShadow: '0 1px 10px rgba(0,0,0,0.55)',
          opacity: 1 - progress,
          zIndex: 4,
        }}>
          Scroll to continue
        </div>
      </div>
    </>
  )
}
