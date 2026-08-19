'use client'
import { useEffect, useMemo, useState } from 'react'

const TOTAL_IMAGES = 43
const IMAGES = Array.from({ length: TOTAL_IMAGES }, (_, i) =>
  `/images/loading/loading-${String(i + 1).padStart(2, '0')}.webp`
)

export default function DockIntro({ onDismiss }: { onDismiss: () => void }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [dissolving, setDissolving] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [closingCollage, setClosingCollage] = useState(false)
  const [collageReady, setCollageReady] = useState(false)
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

  /* Cards mount at scale(0.4)/opacity 0, then flip on the next frame — a
     transition needs a changed value to animate from, so rendering straight
     to the final state would show no entry animation at all. */
  useEffect(() => {
    if (expandedIndex === null) { setCollageReady(false); return }
    setCollageReady(false)
    let r1 = 0, r2 = 0
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setCollageReady(true))
    })
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2) }
  }, [expandedIndex])

  /* 43 tiles across a phone is ~9px each — unusable. Show every third image
     on mobile so each tile is wide enough to see and touch. Each tile keeps
     its index into IMAGES so the collage resolves the right source photos. */
  const tiles = useMemo(
    () => IMAGES.map((src, srcIndex) => ({ src, srcIndex }))
                .filter((_, i) => (isMobile ? i % 3 === 0 : true)),
    [isMobile]
  )

  /* Scattered collage built from the clicked image plus 4-6 neighbours.
     Seeded off the index so the layout is varied but stable across renders. */
  const collageLayout = useMemo(() => {
    if (expandedIndex === null) return []
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }
    const neighborCount = 4 + Math.floor(seededRandom(expandedIndex) * 3) // 4-6
    const indices = [expandedIndex]
    for (let i = 1; i <= neighborCount; i++) {
      const offset = i % 2 === 0 ? i / 2 : -(Math.ceil(i / 2))
      const idx = (expandedIndex + offset + IMAGES.length) % IMAGES.length
      if (!indices.includes(idx)) indices.push(idx)
    }
    return indices.map((idx, pos) => {
      const seed = expandedIndex * 100 + pos
      return {
        src: IMAGES[idx],
        isMain: idx === expandedIndex,
        top: 12 + seededRandom(seed) * 66,
        left: 8 + seededRandom(seed + 1) * 74,
        width: pos === 0 ? 280 : 120 + seededRandom(seed + 2) * 70,
        rotate: (seededRandom(seed + 3) - 0.5) * 24,
        zIndex: pos === 0 ? 50 : Math.floor(seededRandom(seed + 4) * 40),
      }
    })
  }, [expandedIndex])

  const closeCollage = () => {
    setClosingCollage(true)
    setTimeout(() => {
      setExpandedIndex(null)
      setClosingCollage(false)
    }, 400)
  }

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
          height: '110px',
          width: '100vw',
          overflow: 'visible',
          padding: '0',
        }}
      >
        {tiles.map((tile, i) => (
          <div
            key={tile.src}
            onMouseEnter={() => setHoverIndex(i)}
            onTouchStart={() => setHoverIndex(i)}
            onClick={() => setExpandedIndex(tile.srcIndex)}
            style={{
              flex: '1 1 0',
              height: '100%',
              position: 'relative',
              transform: `scale(${getScale(i)})`,
              transformOrigin: 'center center',
              zIndex: getZIndex(i),
              transition: 'transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)',
              boxShadow: hoverIndex === i
                ? '0 30px 60px rgba(31,24,192,0.3)'
                : '0 2px 8px rgba(31,24,192,0.08)',
            }}
          >
            <img
              src={tile.src}
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

      {expandedIndex !== null && (
        <div
          onClick={closeCollage}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 200,
            cursor: 'pointer',
          }}
        >
          {collageLayout.map((item, i) => {
            const hidden = closingCollage || !collageReady
            return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: `${item.top}%`,
                left: `${item.left}%`,
                width: `${item.width}px`,
                aspectRatio: '3/4',
                transform: `translate(-50%, -50%) rotate(${item.rotate}deg) scale(${hidden ? 0.4 : 1})`,
                transformOrigin: 'center center',
                zIndex: item.zIndex,
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: item.isMain
                  ? '0 24px 50px rgba(31,24,192,0.18)'
                  : '0 10px 24px rgba(31,24,192,0.1)',
                opacity: hidden ? 0 : 1,
                transition: `transform 0.5s cubic-bezier(0.16,1,0.3,1) ${closingCollage ? '0s' : i * 0.04 + 's'}, opacity 0.4s ease ${closingCollage ? '0s' : i * 0.04 + 's'}`,
              }}
            >
              <img
                src={item.src}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            )
          })}
        </div>
      )}

      <button
        onClick={handleDismiss}
        aria-label="Enter site"
        style={{
          position: 'absolute',
          bottom: '48px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 300,
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
