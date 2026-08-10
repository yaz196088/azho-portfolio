'use client'

import { toRoman } from '@/lib/roman'

export default function PosterWorkRow() {
  return (
    <div
      className="work-row rv rv-d4"
      data-label="Graphic"
      onClick={() => {
        const el = document.getElementById('poster-series')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }}
      style={{ cursor: 'pointer' }}
    >
      <span className="w-num roman">{toRoman(5)}</span>
      <div>
        <div className="w-title hand-title">Subconscious — Poster Series</div>
        <div className="w-cat">Graphic Design · Typography · Editorial</div>
      </div>
      <span className="w-type">Graphic</span>
      <span className="w-year roman">{toRoman(2023)}</span>
      <span className="w-arrow">→</span>
    </div>
  )
}
