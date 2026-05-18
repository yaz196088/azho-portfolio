'use client'

import { useEffect, useRef, useState } from 'react'

const POSTERS = [
  { src: '/images/posters/constructivism.png', title: 'OBSERVE SUBJECTIVELY' },
  { src: '/images/posters/escape.png', title: 'ESCAPE' },
  { src: '/images/posters/Momento_Mori_.png', title: 'MOMENTO MORI' },
  { src: '/images/posters/crash_poster_.png', title: 'PARALLEL PARKING GONE WRONG' },
]

export default function PosterRack() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [displayedIndex, setDisplayedIndex] = useState(0)
  const [titleVisible, setTitleVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const posterSectionRef = useRef<HTMLDivElement>(null)
  const mounted = useRef(false)
  const touchStartX = useRef(0)

  /* ── Initial: title reveal + mobile detection ── */
  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 120)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  /* ── Title animation whenever selectedIndex changes ── */
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    setTitleVisible(false)
    const t = setTimeout(() => {
      setDisplayedIndex(selectedIndex)
      setTitleVisible(true)
    }, 380)
    return () => clearTimeout(t)
  }, [selectedIndex])

  /* ── Poster interaction: trackpad wheel + mobile touch swipe ── */
  useEffect(() => {
    const el = posterSectionRef.current
    if (!el) return

    let swipeLocked = false

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      if (Math.abs(e.deltaX) < 15) return
      e.preventDefault()
      if (swipeLocked) return
      swipeLocked = true
      if (e.deltaX > 0) {
        setSelectedIndex(prev => Math.min(prev + 1, 3))
      } else {
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      }
      setTimeout(() => { swipeLocked = false }, 600)
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].screenX
      if (Math.abs(diff) < 50) return
      if (diff > 0) {
        setSelectedIndex(prev => Math.min(prev + 1, 3))
      } else {
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      }
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('wheel', handleWheel)
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <div
      id="poster-series"
      ref={posterSectionRef}
      className="poster-rack-section"
      style={{ width: '100vw', position: 'relative' }}
      onWheel={(e: React.WheelEvent) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.preventDefault()
        }
      }}
      onMouseMove={(e) => {
        const dot = document.getElementById('poster-cursor')
        if (dot) { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px' }
      }}
      onMouseEnter={() => {
        const dot = document.getElementById('poster-cursor')
        if (dot) dot.style.opacity = '1'
        document.body.classList.add('cur-hidden')
      }}
      onMouseLeave={() => {
        const dot = document.getElementById('poster-cursor')
        if (dot) dot.style.opacity = '0'
        document.body.classList.remove('cur-hidden')
      }}
    >
      <div id="poster-cursor" />
      <div className="rack-top-label">Subconscious · Poster Series</div>
      <div
        className="rack-scene"
        style={{
          perspective: isMobile ? '700px' : '1000px',
          touchAction: 'none',
        }}
      >
        <div
          className="rack-container"
          style={{
            perspective: '1400px',
            perspectiveOrigin: '50% 50%',
            position: 'relative',
            width: '100%',
            height: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {POSTERS.map((p, index) => {
            const offset = index - selectedIndex
            const rotateY = offset === 0 ? 0 : offset > 0 ? 75 : -75
            const translateX = offset * (isMobile ? 180 : 280)
            const translateZ = offset === 0 ? 0 : -150
            const cardW = isMobile ? 180 : 280
            return (
              <div
                key={p.src}
                className="rack-card"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                  transformStyle: 'preserve-3d',
                  opacity: Math.abs(offset) > 1 ? 0.3 : 1,
                  transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  width: `${cardW}px`,
                  aspectRatio: '2/3',
                  top: '50%',
                  left: '50%',
                  marginLeft: `${-cardW / 2}px`,
                  marginTop: `${-(cardW * 1.5) / 2}px`,
                  boxShadow: offset === 0 ? '0 40px 100px rgba(0,0,0,0.5)' : 'none',
                }}
              >
                <img
                  src={p.src}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className="rack-title-wrap">
        <div className={`rack-title-text${titleVisible ? ' visible' : ''}`}>
          {POSTERS[displayedIndex].title}
        </div>
      </div>
      <div className="rack-dots">
        {POSTERS.map((_, i) => (
          <div key={i} className={`rack-dot${i === selectedIndex ? ' active' : ''}`} />
        ))}
      </div>
      <div className="rack-meta">
        <span>{String(displayedIndex + 1).padStart(2, '0')} / {String(POSTERS.length).padStart(2, '0')}</span>
        <span>Poster Series</span>
        <span>2023</span>
      </div>
    </div>
  )
}
