'use client'

export default function WellnessDailyBar() {
  return (
    <div style={{
      background: '#5C6B28',
      padding: '20px 56px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '12px',
    }}>
      <a
        href="https://www.tiktok.com/@wellnessdaily_2025"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: 'none',
          color: '#DDD0B8',
          fontFamily: "'Big Shoulders Display', sans-serif",
          fontWeight: 700,
          fontSize: '14px',
          letterSpacing: '0.2em',
          opacity: 0.9,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'opacity 0.3s, letter-spacing 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.opacity = '1'
          e.currentTarget.style.letterSpacing = '0.28em'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.opacity = '0.9'
          e.currentTarget.style.letterSpacing = '0.2em'
        }}
      >
        WELLNESS DAILY ↗
      </a>
      <span style={{
        fontFamily: 'Cormorant Garamond, Georgia, serif',
        fontStyle: 'italic',
        fontSize: '12px',
        color: '#DDD0B8',
        opacity: 0.6,
      }}>
        TikTok · Instagram
      </span>
      <span style={{
        fontFamily: 'Cormorant Garamond, Georgia, serif',
        fontStyle: 'italic',
        fontSize: '12px',
        color: '#DDD0B8',
        opacity: 0.5,
      }}>
        Longevity is the new luxury
      </span>
    </div>
  )
}
