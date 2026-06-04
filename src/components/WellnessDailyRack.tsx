'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

const IMAGES = [
  { src: '/images/wellness-daily/wd-sleep.png',     alt: 'Sleep Maxxing' },
  { src: '/images/wellness-daily/wd-recovery.png',  alt: 'Recovery' },
  { src: '/images/wellness-daily/wd-protein.png',   alt: 'Protein' },
  { src: '/images/wellness-daily/wd-creatine.png',  alt: 'Creatine' },
  { src: '/images/wellness-daily/wd-sauna.png',     alt: 'Sauna' },
  { src: '/images/wellness-daily/wd-athx.png',      alt: 'ATHX Games' },
  { src: '/images/wellness-daily/wd-aesthetic.png', alt: 'Aesthetic' },
]

export default function WellnessDailyRack() {
  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % IMAGES.length)
    }, 3000)
  }, [])

  useEffect(() => {
    startTimer()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [startTimer])

  const handleClick = (i: number) => {
    setActive(i)
    startTimer()
  }

  return (
    <div style={{
      padding: '0 56px 56px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    }}>
      {/* Label row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div className="sec-label" style={{ color: 'rgba(92,107,40,0.55)', marginBottom: 0 }}>
          Selected Carousels
        </div>
        <span style={{
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase' as const,
          color: '#5C6B28',
          opacity: 0.4,
        }}>
          {active + 1} / {IMAGES.length}
        </span>
      </div>

      {/* 3D Rack */}
      <div style={{
        position: 'relative',
        height: '420px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
      }}>
        {IMAGES.map((img, i) => {
          const offset = i - active
          const rotateY = offset === 0 ? 0 : offset > 0 ? 75 : -75
          const translateX = offset * 220
          const translateZ = offset === 0 ? 0 : -100
          const opacity = Math.abs(offset) > 2 ? 0 : Math.abs(offset) === 0 ? 1 : 0.6

          return (
            <div
              key={i}
              onClick={() => handleClick(i)}
              style={{
                position: 'absolute',
                width: '200px',
                aspectRatio: '9/16',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                opacity,
                transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.7s cubic-bezier(0.16,1,0.3,1)',
                transformStyle: 'preserve-3d',
                boxShadow: offset === 0
                  ? '0 0 0 1px rgba(255,255,255,0.5), 0 0 0 2px rgba(92,107,40,0.15), inset 0 1px 0 rgba(255,255,255,0.8), 0 24px 64px rgba(92,107,40,0.25)'
                  : '0 0 0 1px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover' as const,
                  display: 'block',
                  borderRadius: '16px',
                }}
              />
              {/* Glass shine overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 40%, transparent 60%)',
                pointerEvents: 'none',
                border: '1px solid rgba(255,255,255,0.25)',
              }} />
            </div>
          )
        })}
      </div>

      {/* Dot indicators */}
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        paddingTop: '8px',
      }}>
        {IMAGES.map((_, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: i === active ? '20px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === active ? '#5C6B28' : 'rgba(92,107,40,0.3)',
              transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      {/* Active image name */}
      <div style={{
        textAlign: 'center',
        fontSize: '11px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase' as const,
        color: '#5C6B28',
        opacity: 0.5,
      }}>
        {IMAGES[active].alt}
      </div>
    </div>
  )
}
