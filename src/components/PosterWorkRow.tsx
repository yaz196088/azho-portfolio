'use client'

import TapeLabel from './TapeLabel'

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
      <span className="w-num">05</span>
      <div>
        <div className="w-title">
          <TapeLabel text="Subconscious — Poster Series" variant={4} />
        </div>
        <div className="w-cat">Graphic Design · Typography · Editorial</div>
      </div>
      <span className="w-type">Graphic</span>
      <span className="w-year">2023</span>
      <span className="w-arrow">→</span>
    </div>
  )
}
