'use client'

import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    const ro = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.rv').forEach(el => ro.observe(el))
    return () => ro.disconnect()
  }, [])

  return null
}
