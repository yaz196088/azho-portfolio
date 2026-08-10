'use client'
import { useState } from 'react'
import { toRoman } from '@/lib/roman'

const STATS = [
  {
    label: 'Architecture Internships',
    detail: 'Three placements across 3D visualisation, FF&E, and engineering-adjacent studios in Cairo.',
  },
  {
    label: 'Languages — Fluent',
    detail: 'Arabic, English, German — moving fluidly between cultures the way I move between mediums.',
  },
  {
    label: 'Design Disciplines',
    detail: 'Architecture, interior design, UI/UX, photography, graphic design, and front-end development.',
  },
  {
    label: 'Two Cities, One Eye',
    detail: 'Originally from Cairo, Egypt, currently based in Berlin — designing in the space between two very different urban languages.',
  },
]

export default function StatAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {STATS.map((stat, i) => (
        <div
          key={i}
          onMouseEnter={() => setOpen(i)}
          onMouseLeave={() => setOpen(null)}
          style={{
            borderTop: '1px solid var(--rule)',
            paddingTop: '18px',
            paddingBottom: open === i ? '18px' : '0px',
            cursor: 'default',
            transition: 'padding-bottom 0.5s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
            <span
              className="roman"
              style={{ fontSize: '28px', flexShrink: 0, minWidth: '40px' }}
            >
              {toRoman(i + 1)}
            </span>
            <span style={{
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              color: 'var(--muted)',
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}>
              {stat.label}
            </span>
          </div>
          <div style={{
            maxHeight: open === i ? '80px' : '0px',
            opacity: open === i ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s cubic-bezier(0.16,1,0.3,1) 0.05s',
          }}>
            <p style={{
              fontSize: '13px',
              lineHeight: 1.7,
              color: 'var(--ink)',
              opacity: 0.75,
              paddingTop: '10px',
              paddingLeft: '54px',
              maxWidth: '360px',
            }}>
              {stat.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
