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
        <span className="arr" style={{
          transition: 'transform 0.3s',
          display: 'inline-block',
          transform: open ? 'rotate(90deg)' : 'rotate(0deg)'
        }}>→</span>
      </div>

      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--cream)',
          border: '1px solid var(--rule)',
          zIndex: 100,
        }}>
          <a
            href="mailto:yussuf.magdi.azhari@gmail.com"
            className="clink"
            style={{
              fontSize: '10px',
              padding: '12px 0',
              borderBottom: '1px solid var(--rule)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            yussuf.magdi.azhari@gmail.com
            <span className="arr">→</span>
          </a>
          <a
            href="mailto:youssefazhari60@gmail.com"
            className="clink"
            style={{
              fontSize: '10px',
              padding: '12px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            youssefazhari60@gmail.com
            <span className="arr">→</span>
          </a>
        </div>
      )}
    </div>
  )
}
