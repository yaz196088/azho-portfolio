'use client'
import { useState } from 'react'

export default function EmailDropdown() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <div
        className="clink"
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer' }}
      >
        Email
        <span style={{
          display: 'inline-block',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          fontSize: '15px',
          opacity: 0.5,
        }}>→</span>
      </div>

      <div style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: 0,
        right: 0,
        background: 'rgba(241, 234, 224, 0.45)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: 'none',
        zIndex: 100,
        overflow: 'hidden',
        maxHeight: open ? '200px' : '0px',
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0px)' : 'translateY(-8px)',
        transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: open ? '0 8px 32px rgba(16,15,13,0.12)' : 'none',
        pointerEvents: open ? 'all' : 'none',
      }}>
        <a
          href="mailto:yussuf.magdi.azhari@gmail.com"
          className="clink"
          style={{
            fontSize: '10px',
            letterSpacing: '0.16em',
            padding: '14px 16px',
            borderBottom: '1px solid rgba(16,15,13,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: 0.6,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
        >
          yussuf.magdi.azhari@gmail.com
          <span style={{ fontSize: '14px' }}>→</span>
        </a>
        <a
          href="mailto:youssefazhari60@gmail.com"
          className="clink"
          style={{
            fontSize: '10px',
            letterSpacing: '0.16em',
            padding: '14px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: 0.6,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
        >
          youssefazhari60@gmail.com
          <span style={{ fontSize: '14px' }}>→</span>
        </a>
      </div>
    </div>
  )
}
