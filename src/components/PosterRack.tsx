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
    const SWIPE_THRESHOLD = 50
    let touchStartX = 0

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return
      if (Math.abs(e.deltaX) < 30) return
      e.preventDefault()
      if (swipeLocked) return
      swipeLocked = true
      if (e.deltaX > 0) setSelectedIndex(prev => Math.min(prev + 1, POSTERS.length - 1))
      else setSelectedIndex(prev => Math.max(prev - 1, 0))
      setTimeout(() => { swipeLocked = false }, 800)
    }
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX
    }
    const onTouchEnd = (e: TouchEvent) => {
      const diff = touchStartX - e.changedTouches[0].screenX
      if (Math.abs(diff) > SWIPE_THRESHOLD) {
        if (diff > 0) setSelectedIndex(prev => Math.min(prev + 1, POSTERS.length - 1))
        else setSelectedIndex(prev => Math.max(prev - 1, 0))
      }
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('wheel', handleWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <div
      id="poster-series"
      ref={posterSectionRef}
      className="poster-rack-section"
      style={{ width: '100vw', position: 'relative' }}
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
        <div className="rack-container">
          {POSTERS.map((p, i) => {
            const offset = i - selectedIndex
            const rotateY = offset === 0 ? 0 : offset > 0 ? 75 : -75
            const translateX = offset * (isMobile ? 180 : 260)
            const translateZ = offset === 0 ? 0 : -120
            const cardW = isMobile ? 180 : 280
            return (
              <div
                key={p.src}
                className="rack-card"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
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
