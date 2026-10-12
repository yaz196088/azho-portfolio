'use client'

import { useEffect } from 'react'

const PORTALS: Record<string, {
  company: string; duration: string; role: string; desc: string;
  project: { label: string; href: string } | null;
  galleries?: { label: string; images: string[]; handwritten?: boolean }[];
}> = {
  hsi: {
    company: 'Hany Saad Innovations',
    duration: '3 months',
    role: '3D Dept · Post Production · FF&E',
    desc: 'Developed luxury interior 3D visualisations using 3ds Max and Corona Render. Produced post-production composites and managed FF&E specifications for high-end residential projects across Cairo and the North Coast.',
    project: { label: 'Related project — North Coast Bedroom Interior ↓', href: '#works' },
    galleries: [
      {
        label: 'Selected renders',
        images: [
          '/images/hsi/dresser.webp',
          '/images/hsi/hsi-11.webp',
          '/images/hsi/hsi-tv.webp',
        ]
      }
    ]
  },
  fr: {
    company: 'FR Partnership — Ahmad Fayyad',
    duration: '2 months',
    role: 'FF&E · Architectural 3D Renders',
    desc: 'Produced architectural 3D renders for residential and hospitality projects. Coordinated FF&E documentation with procurement teams and managed material libraries and supplier contacts.',
    project: null,
    galleries: [
      {
        label: 'Jasmeya Farm Retreat — Qatar',
        handwritten: true,
        images: [
          '/images/fr-partnership/jasmeya-sauna.webp',
          '/images/fr-partnership/jasmeya-01.webp',
          '/images/fr-partnership/jasmeya-02.webp',
        ]
      },
      {
        label: 'Omar Fathy',
        handwritten: true,
        images: [
          '/images/fr-partnership/fathy-villa-01.webp',
          '/images/fr-partnership/fathy-villa-02.webp',
          '/images/fr-partnership/fathy-villa-03.webp',
          '/images/fr-partnership/fathy-villa-04.webp',
          '/images/fr-partnership/fathy-villa-05.webp',
          '/images/fr-partnership/fathy-villa-06.webp',
        ]
      },
      {
        label: 'Ramla',
        handwritten: true,
        images: [
          '/images/fr-partnership/ramla-01.webp',
          '/images/fr-partnership/ramla-02.webp',
          '/images/fr-partnership/ramla-03.webp',
          '/images/fr-partnership/ramla-04.webp',
          '/images/fr-partnership/ramla-05.webp',
          '/images/fr-partnership/ramla-06.webp',
          '/images/fr-partnership/ramla-07.webp',
        ]
      }
    ]
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
    document.querySelectorAll('a, .work-row, .portal-tile, .po-close').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cur-h'))
      el.addEventListener('mouseleave', () => document.body.classList.remove('cur-h'))
    })

    /* ── SCROLL HINT ── */
    const sh = document.getElementById('sh')
    const onScrollHint = () => sh?.classList.toggle('gone', window.scrollY > 80)
    window.addEventListener('scroll', onScrollHint, { passive: true })

    /* ── HERO PARALLAX ── */
    const heroName = document.getElementById('hero-name')
    const heroSection = heroName?.closest('.hero') as HTMLElement | null
    /* The handler reads getBoundingClientRect then writes a transform. Doing
       that straight from the scroll event forces a layout on every event —
       several per frame on a phone. Coalescing to one read/write per frame
       keeps it off the scrolling critical path. */
    let parallaxRaf: number | null = null
    const applyParallax = () => {
      parallaxRaf = null
      if (!heroName || !heroSection) return
      // Measure from the hero's own top, not the document's. The walker intro
      // reserves scroll height before the hero, so absolute scrollY would apply
      // a large offset the moment the hero appears and shove the name into the
      // paragraph below it.
      const past = Math.max(0, -heroSection.getBoundingClientRect().top)
      if (past <= window.innerHeight)
        heroName.style.transform = `translateY(${past * 0.14}px)`
    }
    const onScrollParallax = () => {
      if (parallaxRaf === null) parallaxRaf = requestAnimationFrame(applyParallax)
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

    /* ── IMAGE LIGHTBOX ── */
    const lightbox = document.getElementById('image-lightbox')
    const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement | null
    const isLightboxOpen = () => lightbox?.style.display === 'flex'

    function openLightbox(src: string, alt: string) {
      if (!lightbox || !lightboxImg) return
      lightboxImg.src = src
      lightboxImg.alt = alt
      lightbox.style.display = 'flex'
      /* Two frames, not one. The display change and the opacity change can land
         in the same style recalc, which leaves the transition with no starting
         value and the panel snaps in with no fade at all. */
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          lightbox.style.opacity = '1'
          lightboxImg.style.transform = 'scale(1)'
        })
      })
    }

    function closeLightbox() {
      if (!lightbox || !lightboxImg) return
      lightbox.style.opacity = '0'
      lightboxImg.style.transform = 'scale(0.92)'
      setTimeout(() => { lightbox.style.display = 'none' }, 400)
    }

    lightbox?.addEventListener('click', closeLightbox)

    /* ── PORTAL OPEN / CLOSE ── */
    const overlay  = document.getElementById('portal-overlay')
    const inner    = document.getElementById('po-inner')
    const closeBtn = document.getElementById('po-close')

    /* Background scroll lock. Both html and body need locking — body alone
       still lets the document scroll behind the overlay. Previous values are
       captured rather than assumed empty, so the gate's own lock survives. */
    let prevBodyOverflow = ''
    let prevHtmlOverflow = ''

    const updateRowFade = (row: HTMLElement) => {
      const maxScroll = row.scrollWidth - row.clientWidth
      row.classList.toggle('no-fade', maxScroll <= 1 || row.scrollLeft >= maxScroll - 8)
    }

    function openPortal(key: string) {
      const d = PORTALS[key]
      if (!d || !overlay || !inner) return
      document.body.classList.add('cur-p')
      if (!overlay.classList.contains('open')) {
        prevBodyOverflow = document.body.style.overflow
        prevHtmlOverflow = document.documentElement.style.overflow
      }
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      const gallery = d.galleries?.length
        ? d.galleries.map((g, gi) => `
        <div style="margin-top:${gi === 0 ? 32 : 24}px">
          <div class="po-col-label${g.handwritten ? ' po-gallery-label' : ''}" style="margin-bottom:14px">${g.label}</div>
          <div class="po-gallery-row">
            ${g.images.map(img => `
              <div style="aspect-ratio:4/3;border-radius:4px;overflow:hidden;border:1px solid rgba(253,251,212,0.15)">
                <img src="${img}" alt="${g.label} render" loading="lazy" class="po-gal-img"
                     style="width:100%;height:100%;object-fit:cover;display:block" />
              </div>`).join('')}
          </div>
        </div>`).join('')
        : ''

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
        ${gallery}
        ${d.project ? `<a href="${d.project.href}" class="po-project-link" id="po-proj-link">${d.project.label} <span class="arr">→</span></a>` : ''}
      `
      overlay.classList.add('open')

      /* Wired here rather than on mount: the gallery nodes don't exist until
         this innerHTML runs, and each open discards the previous set along with
         its listeners. Every portal's galleries are covered automatically.
         The cursor affordance is the site's own hover ring, not cursor:pointer
         — body sets `cursor: none`, so a native pointer would draw a second
         cursor on top of the custom one. */
      inner.querySelectorAll<HTMLImageElement>('.po-gal-img').forEach(img => {
        img.addEventListener('click', () => openLightbox(img.src, img.alt))
        img.addEventListener('mouseenter', () => document.body.classList.add('cur-h'))
        img.addEventListener('mouseleave', () => document.body.classList.remove('cur-h'))
      })

      /* Each group starts at its first thumbnail, and the right-edge fade is
         dropped once there is nothing further to scroll to. */
      overlay.scrollTop = 0
      inner.querySelectorAll<HTMLElement>('.po-gallery-row').forEach(row => {
        row.scrollLeft = 0
        row.addEventListener('scroll', () => updateRowFade(row), { passive: true })
        updateRowFade(row)
        /* Widths aren't final until layout runs, so a row that does overflow
           can measure as fitting on this first pass. */
        requestAnimationFrame(() => updateRowFade(row))
      })

      if (d.project) {
        document.getElementById('po-proj-link')?.addEventListener('click', closePortal)
      }
    }

    function closePortal() {
      overlay?.classList.remove('open')
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
      document.body.classList.remove('cur-p')
    }

    /* Any element carrying data-portal opens that portal — portal tiles and
       work rows alike, so a project row can point at the internship it came
       from without duplicating the overlay content. */
    document.querySelectorAll<HTMLElement>('[data-portal]').forEach(tile => {
      tile.addEventListener('click', () => openPortal(tile.dataset.portal || ''))
    })
    closeBtn?.addEventListener('click', closePortal)

    /* One listener with precedence rather than two independent ones: the
       lightbox sits above the portal, so Escape dismisses the image first and
       leaves the portal open behind it. Two listeners would collapse both on a
       single press. */
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (isLightboxOpen()) { closeLightbox(); return }
      closePortal()
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('scroll', onScrollHint)
      window.removeEventListener('scroll', onScrollParallax)
      if (parallaxRaf !== null) cancelAnimationFrame(parallaxRaf)
      document.removeEventListener('keydown', onKeyDown)
      lightbox?.removeEventListener('click', closeLightbox)
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

      {/* Image lightbox — sits above the portal overlay (z 5000) so a gallery
          image can expand over an open portal. */}
      <div
        id="image-lightbox"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9500,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(31,24,192,0.55)',
          /* Blur radius lives in CSS (#image-lightbox) so the phone override
             can reduce it — an inline value would outrank any media query. */
          opacity: 0,
          transition: 'opacity 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          id="lightbox-img"
          src=""
          alt=""
          style={{
            maxWidth: '85vw',
            /* svh, not vh: with the iOS toolbars showing, 85vh is measured
               against the *largest* viewport, so the image overflowed the
               visible area. svh uses the smallest. */
            maxHeight: '85svh',
            borderRadius: '4px',
            boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
            transform: 'scale(0.92)',
            transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      </div>
    </>
  )
}
