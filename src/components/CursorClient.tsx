'use client'

import { useEffect } from 'react'

export default function CursorClient() {
  useEffect(() => {
    const dot  = document.getElementById('c-dot')
    const ring = document.getElementById('c-ring')
    let mx = 0, my = 0, rx = 0, ry = 0
    let rafId: number
    let rafActive = true

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px' }
    }
    document.addEventListener('mousemove', onMouseMove)

    function followRing() {
      if (!rafActive) return
      rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px' }
      rafId = requestAnimationFrame(followRing)
    }
    rafId = requestAnimationFrame(followRing)

    return () => {
      rafActive = false
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      <div id="c-dot"></div>
      <div id="c-ring"></div>
    </>
  )
}
