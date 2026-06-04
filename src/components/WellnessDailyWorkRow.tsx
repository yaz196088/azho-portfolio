'use client'

export default function WellnessDailyWorkRow() {
  return (
    <div
      className="work-row rv rv-d4"
      data-label="Brand"
      onClick={() => {
        const el = document.getElementById('wellness-daily-section')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }}
      style={{ cursor: 'pointer' }}
    >
      <span className="w-num">06</span>
      <div>
        <div className="w-title">Wellness Daily</div>
        <div className="w-cat">Brand Identity · Content Direction · TikTok / Instagram</div>
      </div>
      <span className="w-type">Brand</span>
      <span className="w-year">2024</span>
    </div>
  )
}
