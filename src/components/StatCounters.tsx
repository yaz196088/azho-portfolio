'use client'

import { useEffect } from 'react'
import { toRoman } from '@/lib/roman'

export default function StatCounters() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          const target = +(el.dataset.target || 0)
          el.textContent = toRoman(target)
          el.style.opacity = '0'
          el.style.transform = 'translateY(8px)'
          requestAnimationFrame(() => {
            el.style.transition =
              'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)'
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          })
          obs.unobserve(el)
        })
      },
      { threshold: 0.5 }
    )
    document.querySelectorAll('.stat-n[data-target]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return null
}
