'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const IMAGES = [
  { src: '/images/wellness-daily/wd-sleep.png',     alt: 'Sleep Maxxing',  code: '01' },
  { src: '/images/wellness-daily/wd-recovery.png',  alt: 'Recovery',       code: '02' },
  { src: '/images/wellness-daily/wd-protein.png',   alt: 'Protein',        code: '03' },
  { src: '/images/wellness-daily/wd-creatine.png',  alt: 'Creatine',       code: '04' },
  { src: '/images/wellness-daily/wd-sauna.png',     alt: 'Sauna',          code: '05' },
  { src: '/images/wellness-daily/wd-athx.png',      alt: 'ATHX Games',     code: '06' },
  { src: '/images/wellness-daily/wd-aesthetic.png', alt: 'Aesthetic',      code: '07' },
]

export default function WellnessDailyRack() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % IMAGES.length)
    }, 3500)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [paused])

  const handleClick = (index: number) => {
    if (active === index) {
      window.open('https://www.tiktok.com/@wellnessdaily_2025', '_blank')
    } else {
      setActive(index)
    }
  }

  return (
    <div style={{ padding: '0 56px 56px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
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

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          height: '380px',
        }}
      >
        {IMAGES.map((image, index) => (
          <motion.div
            key={index}
            onClick={() => handleClick(index)}
            initial={{ width: '40px' }}
            animate={{ width: active === index ? '260px' : '52px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              cursor: 'pointer',
              overflow: 'hidden',
              borderRadius: '18px',
              flexShrink: 0,
              height: '380px',
              boxShadow: active === index
                ? '0 0 0 1px rgba(255,255,255,0.5), 0 24px 64px rgba(92,107,40,0.25)'
                : '0 0 0 1px rgba(255,255,255,0.15)',
            }}
          >
            <AnimatePresence>
              {active === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(45,74,45,0.5), transparent 50%)',
                    zIndex: 2,
                  }}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {active === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    padding: '16px',
                    zIndex: 3,
                  }}
                >
                  <p style={{
                    fontSize: '9px',
                    letterSpacing: '0.2em',
                    color: 'rgba(221,208,184,0.7)',
                    marginBottom: '4px',
                  }}>
                    {image.code}
                  </p>
                  <p style={{
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    color: '#DDD0B8',
                    textTransform: 'uppercase' as const,
                  }}>
                    {image.alt}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
              zIndex: 4,
              pointerEvents: 'none',
            }} />

            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover' as const,
                objectPosition: 'center 20%',
                display: 'block',
              }}
            />
          </motion.div>
        ))}
      </div>

      <div style={{
        textAlign: 'center' as const,
        fontSize: '10px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase' as const,
        color: '#5C6B28',
        opacity: 0.4,
        marginTop: '16px',
      }}>
        Tap selected · Opens TikTok ↗
      </div>
    </div>
  )
}
