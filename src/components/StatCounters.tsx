'use client'

import { useEffect } from 'react'

export default function StatCounters() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          const target = +(el.dataset.target || 0)
          let start = 0
          const step = () => {
            start++
            el.textContent = String(start)
            if (start < target) setTimeout(step, 80)
          }
          step()
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
