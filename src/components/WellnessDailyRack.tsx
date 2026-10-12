'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const IMAGES = [
  { src: '/images/wellness-daily/wd-sleep.webp',     alt: 'Sleep Maxxing',  code: '01' },
  { src: '/images/wellness-daily/wd-recovery.webp',  alt: 'Recovery',       code: '02' },
  { src: '/images/wellness-daily/wd-protein.webp',   alt: 'Protein',        code: '03' },
  { src: '/images/wellness-daily/wd-creatine.webp',  alt: 'Creatine',       code: '04' },
  { src: '/images/wellness-daily/wd-sauna.webp',     alt: 'Sauna',          code: '05' },
  { src: '/images/wellness-daily/wd-athx.webp',      alt: 'ATHX Games',     code: '06' },
  { src: '/images/wellness-daily/wd-aesthetic.webp', alt: 'Aesthetic',      code: '07' },
]

export default function WellnessDailyRack() {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false) // desktop during SSR
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => () => { if (resumeRef.current) clearTimeout(resumeRef.current) }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* Phones get a scroll-snap row instead of the hover-expand accordion: seven
     cards at 52px collapsed plus one at 260px need ~608px, which no phone has.
     Auto-rotate drives the scroll position rather than a width animation. */
  useEffect(() => {
    if (!isMobile || expanded !== null) return
    const el = scrollerRef.current
    const card = el?.children[active] as HTMLElement | undefined
    if (!el || !card) return
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' })
  }, [active, isMobile, expanded])

  useEffect(() => {
    if (paused || expanded !== null) return
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % IMAGES.length)
    }, 3500)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [paused, expanded])

  useEffect(() => {
    if (expanded === null) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [expanded])

  const displayIndex = hovered !== null ? hovered : active

  return (
    <div className="wd-pad" style={{ paddingTop: 0, paddingBottom: '56px' }}>
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
          {displayIndex + 1} / {IMAGES.length}
        </span>
      </div>

      <div
        ref={scrollerRef}
        className={isMobile ? 'wd-rack-scroller' : undefined}
        onMouseEnter={() => { if (!isMobile) setPaused(true) }}
        onMouseLeave={() => { if (!isMobile) { setPaused(false); setHovered(null) } }}
        /* Pause while a finger is on the row, resume a few seconds after it
           lifts, so auto-rotate never fights the user mid-scroll. */
        onTouchStart={() => {
          setPaused(true)
          if (resumeRef.current) clearTimeout(resumeRef.current)
        }}
        onTouchEnd={() => {
          if (resumeRef.current) clearTimeout(resumeRef.current)
          resumeRef.current = setTimeout(() => setPaused(false), 5000)
        }}
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: isMobile ? 'flex-start' : 'center',
          gap: '6px',
          height: isMobile ? '300px' : '380px',
        }}
      >
        {IMAGES.map((image, index) => (
          <motion.div
            key={index}
            layoutId={`wd-card-${index}`}
            onMouseEnter={() => { if (!isMobile) setHovered(index) }}
            /* Touch: first tap focuses the card, a second tap on the already
               focused card opens the lightbox. Desktop opens on a single
               click exactly as before. */
            onClick={() => {
              if (!isMobile) { setExpanded(index); return }
              if (active === index) setExpanded(index)
              else setActive(index)
            }}
            initial={isMobile ? false : { width: '40px' }}
            animate={isMobile ? undefined : { width: displayIndex === index ? '260px' : '52px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              cursor: 'pointer',
              overflow: 'hidden',
              borderRadius: '18px',
              flexShrink: 0,
              height: isMobile ? '300px' : '380px',
              width: isMobile ? '168px' : undefined,
              scrollSnapAlign: isMobile ? 'center' : undefined,
              boxShadow: displayIndex === index
                ? '0 0 0 1px rgba(255,255,255,0.5), 0 24px 64px rgba(92,107,40,0.25)'
                : '0 0 0 1px rgba(255,255,255,0.15)',
            }}
          >
            <AnimatePresence>
              {displayIndex === index && (
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
              {displayIndex === index && (
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
                  <p style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(221,208,184,0.7)', marginBottom: '4px' }}>
                    {image.code}
                  </p>
                  <p style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#DDD0B8', textTransform: 'uppercase' as const }}>
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

            <motion.img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' as const, display: 'block' }}
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
        {isMobile ? 'Swipe to browse · Tap twice to expand' : 'Hover to preview · Click to expand'}
      </div>

      <AnimatePresence>
        {expanded !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setExpanded(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9000,
              background: 'rgba(16,15,13,0.55)',
              backdropFilter: isMobile ? 'blur(12px)' : 'blur(24px)',
              WebkitBackdropFilter: isMobile ? 'blur(12px)' : 'blur(24px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <motion.div
              layoutId={`wd-card-${expanded}`}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 'min(360px, 80vw)',
                aspectRatio: '9/16',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={IMAGES[expanded].src}
                alt={IMAGES[expanded].alt}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' as const, display: 'block' }}
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setExpanded(null)}
              style={{
                position: 'absolute',
                top: '32px',
                right: '48px',
                background: 'none',
                border: 'none',
                color: '#DDD0B8',
                fontSize: '28px',
                cursor: 'pointer',
                fontFamily: "'Big Shoulders Display', sans-serif",
                fontWeight: 900,
              }}
            >
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
