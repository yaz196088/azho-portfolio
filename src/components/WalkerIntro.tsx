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

  /* ── Walk cycle ── */
  const phase = progress * Math.PI * 20
  const hipL = Math.sin(phase) * 28
  const kneeL = Math.max(0, -Math.sin(phase + 0.5)) * 45
  const hipR = Math.sin(phase + Math.PI) * 28
  const kneeR = Math.max(0, -Math.sin(phase + Math.PI + 0.5)) * 45
  const shoulderL = Math.sin(phase + Math.PI) * 22
  const elbowL = Math.max(0, Math.sin(phase + Math.PI)) * 30
  const shoulderR = Math.sin(phase) * 22
  const elbowR = Math.max(0, Math.sin(phase)) * 30

  const COLS = isMobile ? 5 : 9
  const ROWS = isMobile ? 8 : 6
  const TILE_COUNT = COLS * ROWS

  /* Oval cut-out tracking the figure. The grid hides inside it; the blur layer
     shows only inside it. */
  const OVAL = `ellipse ${isMobile ? 70 : 90}px ${isMobile ? 100 : 130}px at ${figureX}% ${figureY}%`
  const HOLE = `radial-gradient(${OVAL}, transparent 55%, black 85%)`
  const HOLE_INV = `radial-gradient(${OVAL}, black 55%, transparent 85%)`

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
            const influence = Math.max(0, 1 - distance / 16)
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

        {/* Jointed walking figure — forward kinematics via nested transforms */}
        <svg
          viewBox="0 0 100 220"
          style={{
            position: 'absolute',
            top: `${figureY}%`,
            left: `${figureX}%`,
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '70px' : '90px',
            height: isMobile ? '155px' : '200px',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <g fill="var(--ink)">
            {/* head */}
            <circle cx="50" cy="20" r="14" />
            {/* torso */}
            <rect x="42" y="34" width="16" height="70" rx="8" />

            {/* left leg — thigh then shin, shin rotates relative to thigh */}
            <g transform={`translate(46 104) rotate(${hipL})`}>
              <rect x="-6" y="0" width="12" height="38" rx="5" />
              <g transform={`translate(0 38) rotate(${kneeL})`}>
                <rect x="-5" y="0" width="10" height="38" rx="5" />
              </g>
            </g>

            {/* right leg */}
            <g transform={`translate(54 104) rotate(${hipR})`}>
              <rect x="-6" y="0" width="12" height="38" rx="5" />
              <g transform={`translate(0 38) rotate(${kneeR})`}>
                <rect x="-5" y="0" width="10" height="38" rx="5" />
              </g>
            </g>

            {/* left arm — upper arm then forearm */}
            <g transform={`translate(44 42) rotate(${shoulderL})`}>
              <rect x="-4" y="0" width="8" height="28" rx="4" />
              <g transform={`translate(0 28) rotate(${elbowL})`}>
                <rect x="-3.5" y="0" width="7" height="26" rx="3.5" />
              </g>
            </g>

            {/* right arm */}
            <g transform={`translate(56 42) rotate(${shoulderR})`}>
              <rect x="-4" y="0" width="8" height="28" rx="4" />
              <g transform={`translate(0 28) rotate(${elbowR})`}>
                <rect x="-3.5" y="0" width="7" height="26" rx="3.5" />
              </g>
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
