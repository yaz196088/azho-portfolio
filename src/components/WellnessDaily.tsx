'use client'

import WellnessDailyBar from './WellnessDailyBar'
import WellnessDailyRack from './WellnessDailyRack'

/* ─── Main section ─── */
export default function WellnessDaily() {
  const pillars = [
    'Nutrition', 'Recovery', 'Movement',
    'Longevity', 'Mental Clarity', 'Sleep', 'Supplementation',
  ]

  const swatches = [
    { bg: '#DDD0B8', label: 'Linen', border: '1px solid rgba(92,107,40,0.2)' },
    { bg: '#5C6B28', label: 'Olive', border: 'none' },
    { bg: '#A86820', label: 'Amber', border: 'none' },
  ]

  return (
    <section id="wellness-daily-section" className="rv" style={{ background: '#DDD0B8', overflow: 'hidden' }}>

      {/* Top label row */}
      <div style={{
        padding: '80px 56px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div className="sec-label" style={{ color: 'rgba(92,107,40,0.55)' }}>
          Wellness Daily · Brand &amp; Content Direction
        </div>
        <span style={{
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase' as const,
          color: '#5C6B28',
          opacity: 0.4,
        }}>
          Est. 2024 · Cairo
        </span>
      </div>

      {/* Hero row */}
      <div className="rv rv-d1" style={{
        padding: '48px 56px 0',
        display: 'grid',
        gridTemplateColumns: '3fr 2fr',
        gap: '64px',
        alignItems: 'start',
      }}>
        {/* Left — brand name + description */}
        <div
          onMouseEnter={e => {
            const heading = e.currentTarget.querySelector<HTMLElement>('[data-brand-heading]')
            if (heading) heading.style.letterSpacing = '-0.01em'
          }}
          onMouseLeave={e => {
            const heading = e.currentTarget.querySelector<HTMLElement>('[data-brand-heading]')
            if (heading) heading.style.letterSpacing = '-0.03em'
          }}
        >
          <div
            data-brand-heading
            style={{
              fontFamily: "'Big Shoulders Display', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(64px, 10vw, 130px)',
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase' as const,
              transition: 'letter-spacing 0.5s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <span style={{ display: 'block', color: '#5C6B28' }}>Wellness</span>
            <span style={{ display: 'block', color: '#A86820' }}>Daily</span>
          </div>

          <div style={{
            height: '1px',
            background: '#5C6B28',
            opacity: 0.2,
            margin: '28px 0',
          }} />

          <p style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontStyle: 'italic',
            fontSize: '22px',
            color: '#A86820',
            marginBottom: '24px',
            lineHeight: 1.4,
          }}>
            Longevity is the new luxury
          </p>

          <p style={{
            fontSize: '15px',
            color: '#5C6B28',
            opacity: 0.7,
            lineHeight: 1.9,
            maxWidth: '480px',
            fontWeight: 300,
          }}>
            A journalistic wellness and longevity media brand built from
            scratch. Covering fitness, nutrition, and health through a
            minimalist editorial lens — reporting facts, citing data,
            never giving advice. Built for an audience that treats
            longevity as a lifestyle, not a trend.
          </p>
        </div>

        {/* Right — brand identity */}
        <div style={{ paddingTop: '8px' }}>
          <div className="sec-label" style={{ color: 'rgba(92,107,40,0.55)', marginBottom: '20px' }}>
            Brand Identity
          </div>

          {/* Color swatches */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
            {swatches.map(s => (
              <div
                key={s.label}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'translateY(-4px)'
                  el.style.filter = 'drop-shadow(0 8px 20px rgba(92,107,40,0.15))'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'none'
                  el.style.filter = 'none'
                }}
                style={{
                  transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), filter 0.4s',
                  cursor: 'default',
                }}
              >
                <div style={{
                  width: '72px',
                  height: '48px',
                  background: s.bg,
                  border: s.border,
                  borderRadius: '2px',
                  marginBottom: '6px',
                }} />
                <span style={{
                  fontSize: '9px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase' as const,
                  color: '#5C6B28',
                  opacity: 0.6,
                }}>{s.label}</span>
              </div>
            ))}
          </div>

          <div style={{ height: '1px', background: '#5C6B28', opacity: 0.1, marginBottom: '20px' }} />

          {/* Identity details */}
          {[
            { label: 'Typography', value: 'Cormorant Garamond' },
            { label: 'Format',     value: '1080 × 1920px · TikTok / Instagram' },
            { label: 'Voice',      value: 'Journalistic. Minimal. Facts-first.' },
            { label: 'Audience',   value: 'Gen Z · Millennials · 20–35 · Cairo + Global' },
          ].map(row => (
            <div key={row.label} style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '12px',
              alignItems: 'baseline',
            }}>
              <span style={{
                fontSize: '9px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase' as const,
                color: '#5C6B28',
                opacity: 0.4,
                minWidth: '80px',
                flexShrink: 0,
              }}>{row.label}</span>
              <span style={{
                fontSize: '12px',
                color: '#5C6B28',
                opacity: 0.75,
                fontFamily: row.label === 'Typography'
                  ? 'Cormorant Garamond, Georgia, serif'
                  : 'inherit',
                fontStyle: row.label === 'Typography' ? 'italic' : 'normal',
              }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content pillars */}
      <div className="rv rv-d2" style={{ padding: '56px 56px 0' }}>
        <div className="sec-label" style={{ color: 'rgba(92,107,40,0.55)', marginBottom: '20px' }}>
          Content Pillars
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '10px' }}>
          {pillars.map(p => (
            <span
              key={p}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLSpanElement
                el.style.borderColor = '#5C6B28'
                el.style.color = '#5C6B28'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLSpanElement
                el.style.borderColor = 'rgba(92,107,40,0.25)'
                el.style.color = 'rgba(92,107,40,0.6)'
                el.style.transform = 'none'
              }}
              style={{
                padding: '8px 18px',
                border: '1px solid rgba(92,107,40,0.25)',
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase' as const,
                color: 'rgba(92,107,40,0.6)',
                transition: 'border-color 0.3s, color 0.3s, transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                cursor: 'default',
                display: 'inline-block',
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* 3D Rack gallery */}
      <div className="rv rv-d3" style={{ marginTop: '64px' }}>
        <WellnessDailyRack />
      </div>

      {/* Bottom bar */}
      <WellnessDailyBar />
    </section>
  )
}
