'use client'

export default function PosterWorkRow() {
  return (
    <div
      className="work-row rv rv-d4"
      data-label="Graphic"
      onClick={() => document.getElementById('poster-series')?.scrollIntoView({ behavior: 'smooth' })}
      style={{ cursor: 'none' }}
    >
      <span className="w-num">05</span>
      <div>
        <div className="w-title">Subconscious — Poster Series</div>
        <div className="w-cat">Graphic Design · Typography · Editorial</div>
      </div>
      <span className="w-type">Graphic</span>
      <span className="w-year">2023</span>
      <span className="w-arrow">→</span>
    </div>
  )
}
