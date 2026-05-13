'use client'

import { useEffect } from 'react'

const PORTALS: Record<string, {
  company: string; duration: string; role: string; desc: string;
  project: { label: string; href: string } | null;
}> = {
  hsi: {
    company: 'Hany Saad Innovations',
    duration: '3 months',
    role: '3D Dept · Post Production · FF&E',
    desc: 'Developed luxury interior 3D visualisations using 3ds Max and Corona Render. Produced post-production composites and managed FF&E specifications for high-end residential projects across Cairo and the North Coast.',
    project: { label: 'Related project — North Coast Bedroom Interior ↓', href: '#works' }
  },
  fr: {
    company: 'FR Partnership — Ahmad Fayyad',
    duration: '2 months',
    role: 'FF&E · Architectural 3D Renders',
    desc: 'Produced architectural 3D renders for residential and hospitality projects. Coordinated FF&E documentation with procurement teams and managed material libraries and supplier contacts.',
    project: null
  },
  siemens: {
    company: 'Siemens',
    duration: '1 month',
    role: 'Cross-sector exposure',
    desc: 'Embedded with a global engineering firm to observe large-scale project management, industrial design pipelines, and the intersection of engineering rigour with architectural thinking.',
    project: null
  }
}

export default function PageEffects() {
  useEffect(() => {
    /* ── CURSOR HOVER STATE ── */
    document.querySelectorAll('a, .skill-chip, .work-row, .portal-tile, .po-close').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cur-h'))
      el.addEventListener('mouseleave', () => document.body.classList.remove('cur-h'))
    })

    /* ── SCROLL HINT ── */
    const sh = document.getElementById('sh')
    const onScrollHint = () => sh?.classList.toggle('gone', window.scrollY > 80)
    window.addEventListener('scroll', onScrollHint, { passive: true })

    /* ── HERO PARALLAX ── */
    const heroName = document.getElementById('hero-name')
    const onScrollParallax = () => {
      if (heroName && window.scrollY < window.innerHeight)
        heroName.style.transform = `translateY(${window.scrollY * 0.14}px)`
    }
    window.addEventListener('scroll', onScrollParallax, { passive: true })

    /* ── WORK ROW PREVIEW LABEL ── */
    const preview = document.getElementById('work-preview')
    document.querySelectorAll<HTMLElement>('.work-row').forEach(row => {
      row.addEventListener('mouseenter', () => {
        if (preview) { preview.textContent = row.dataset.label || ''; preview.classList.add('show') }
      })
      row.addEventListener('mouseleave', () => { preview?.classList.remove('show') })
      row.addEventListener('mousemove', (e: MouseEvent) => {
        if (preview) { preview.style.left = (e.clientX + 18) + 'px'; preview.style.top = (e.clientY - 18) + 'px' }
      })
    })

    /* ── MAGNETIC WORK ROWS ── */
    document.querySelectorAll<HTMLElement>('.work-row').forEach(row => {
      row.addEventListener('mousemove', (e: MouseEvent) => {
        const r = row.getBoundingClientRect()
        const x = ((e.clientX - r.left) / r.width  - 0.5) * 7
        const y = ((e.clientY - r.top)  / r.height - 0.5) * 3
        row.style.transform = `translate(${x}px, ${y}px)`
      })
      row.addEventListener('mouseleave', () => { row.style.transform = '' })
    })

    /* ── PORTAL GRID LINES ── */
    const bgLines = document.getElementById('po-bg-lines')
    if (bgLines && !bgLines.dataset.built) {
      bgLines.dataset.built = 'done'
      for (let i = 0; i < 12; i++) {
        const l = document.createElement('div')
        l.className = 'po-bg-line'
        l.style.left = (i / 12 * 100) + '%'
        bgLines.appendChild(l)
      }
    }

    /* ── PORTAL OPEN / CLOSE ── */
    const overlay  = document.getElementById('portal-overlay')
    const inner    = document.getElementById('po-inner')
    const closeBtn = document.getElementById('po-close')

    function openPortal(key: string) {
      const d = PORTALS[key]
      if (!d || !overlay || !inner) return
      document.body.classList.add('cur-p')
      document.body.style.overflow = 'hidden'
      inner.innerHTML = `
        <div class="po-label">Experience — ${d.duration}</div>
        <div class="po-company">${d.company}</div>
        <div class="po-grid">
          <div>
            <div class="po-col-label">Role</div>
            <div class="po-col-val">${d.role}</div>
          </div>
          <div>
            <div class="po-col-label">Duration</div>
            <div class="po-col-val">${d.duration} · Cairo</div>
          </div>
          <div>
            <div class="po-col-label">What I did</div>
            <div class="po-col-val">${d.desc}</div>
          </div>
        </div>
        ${d.project ? `<a href="${d.project.href}" class="po-project-link" id="po-proj-link">${d.project.label} <span class="arr">→</span></a>` : ''}
      `
      overlay.classList.add('open')
      if (d.project) {
        document.getElementById('po-proj-link')?.addEventListener('click', closePortal)
      }
    }

    function closePortal() {
      overlay?.classList.remove('open')
      document.body.style.overflow = ''
      document.body.classList.remove('cur-p')
    }

    document.querySelectorAll<HTMLElement>('.portal-tile').forEach(tile => {
      tile.addEventListener('click', () => openPortal(tile.dataset.portal || ''))
    })
    closeBtn?.addEventListener('click', closePortal)

    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') closePortal() }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('scroll', onScrollHint)
      window.removeEventListener('scroll', onScrollParallax)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <>
      {/* Scroll hint */}
      <div className="scroll-hint" id="sh">
        <div className="sh-line"></div>
        <span className="sh-label">Scroll</span>
      </div>

      {/* Work row preview label */}
      <div id="work-preview"></div>

      {/* Portal overlay */}
      <div id="portal-overlay">
        <div className="po-bg-lines" id="po-bg-lines"></div>
        <button className="po-close" id="po-close">✕</button>
        <div className="po-inner" id="po-inner"></div>
      </div>
    </>
  )
}
