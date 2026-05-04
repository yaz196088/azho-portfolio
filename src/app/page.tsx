'use client'

import { useEffect, useState } from 'react'

const POSTERS = [
  { src: '/images/posters/constructivism.png', title: 'OBSERVE SUBJECTIVELY' },
  { src: '/images/posters/escape.png', title: 'ESCAPE' },
  { src: '/images/posters/Momento_Mori_.png', title: 'MOMENTO MORI' },
  { src: '/images/posters/crash_poster_.png', title: 'PARALLEL PARKING GONE WRONG' },
]

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [displayedIndex, setDisplayedIndex] = useState(0)
  const [titleVisible, setTitleVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 120)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  function handlePosterClick(i: number) {
    if (i === selectedIndex) return
    setTitleVisible(false)
    setSelectedIndex(i)
    setTimeout(() => {
      setDisplayedIndex(i)
      setTitleVisible(true)
    }, 380)
  }

  useEffect(() => {
    /* ── DATA ── */
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

    /* ── CHAR REVEAL HERO ── */
    function charSplit(el: HTMLElement | null, text: string, baseDelay: number) {
      if (!el) return
      el.innerHTML = ''
      text.split('').forEach((ch, i) => {
        const s = document.createElement('span')
        s.className = 'char'
        s.textContent = ch === ' ' ? ' ' : ch
        s.style.animationDelay = (baseDelay + i * 0.045) + 's'
        el.appendChild(s)
      })
    }
    charSplit(document.getElementById('l1'), 'Youssef', 0.1)
    charSplit(document.getElementById('l2'), 'El Azhari', 0.5)
    charSplit(document.getElementById('l3'), 'Azho', 0.92)

    /* ── MARQUEE ── */
    const ITEMS = ['Architecture','Interior Design','UI / UX','Photography','Graphic Design','3D Visualisation','FF&E','Typography','Concept Design','Cairo','Berlin','Rhino 3D','Figma','Corona Render']
    const track = document.getElementById('marquee-track')
    if (track) {
      const doubled = [...ITEMS, ...ITEMS]
      doubled.forEach(t => {
        const d = document.createElement('span')
        d.className = 'marquee-item'
        d.innerHTML = `<span class="dot"></span>${t}`
        track.appendChild(d)
      })
    }

    /* ── CURSOR ── */
    const dot = document.getElementById('c-dot')
    const ring = document.getElementById('c-ring')
    let mx = 0, my = 0, rx = 0, ry = 0
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px' }
    }
    document.addEventListener('mousemove', onMouseMove)

    function followRing() {
      rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px' }
      rafId = requestAnimationFrame(followRing)
    }
    rafId = requestAnimationFrame(followRing)

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

    /* ── SCROLL REVEAL ── */
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') })
    }, { threshold: 0.12 })
    document.querySelectorAll('.rv').forEach(el => ro.observe(el))

    /* ── STAT COUNTER ── */
    const counterObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        const el = e.target as HTMLElement
        const target = +(el.dataset.target || 0)
        let start = 0
        const step = () => {
          start++
          el.textContent = String(start)
          if (start < target) setTimeout(step, 80)
        }
        step()
        counterObs.unobserve(el)
      })
    }, { threshold: 0.5 })
    document.querySelectorAll('.stat-n[data-target]').forEach(el => counterObs.observe(el))

    /* ── WORK ROW PREVIEW LABEL ── */
    const preview = document.getElementById('work-preview')
    document.querySelectorAll<HTMLElement>('.work-row').forEach(row => {
      row.addEventListener('mouseenter', () => {
        if (preview) { preview.textContent = row.dataset.label || ''; preview.classList.add('show') }
        document.body.classList.add('cur-h')
      })
      row.addEventListener('mouseleave', () => {
        preview?.classList.remove('show')
        document.body.classList.remove('cur-h')
      })
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
    if (bgLines) {
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
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', onScrollHint)
      window.removeEventListener('scroll', onScrollParallax)
      ro.disconnect()
      counterObs.disconnect()
    }
  }, [])

  return (
    <>
      {/* Custom cursor */}
      <div id="c-dot"></div>
      <div id="c-ring"></div>

      {/* Scroll hint */}
      <div className="scroll-hint" id="sh">
        <div className="sh-line"></div>
        <span className="sh-label">Scroll</span>
      </div>

      {/* Work row preview label */}
      <div id="work-preview"></div>

      {/* ─── PORTAL OVERLAY ─── */}
      <div id="portal-overlay">
        <div className="po-bg-lines" id="po-bg-lines"></div>
        <button className="po-close" id="po-close">✕</button>
        <div className="po-inner" id="po-inner"></div>
      </div>

      {/* ─── NAV ─── */}
      <nav>
        <a href="#" className="nav-logo">Azho</a>
        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#works">Work</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <span className="nav-loc">Berlin — Cairo</span>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="grid-bg">
          <span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span>
        </div>
        <div className="hero-geo-circle"></div>
        <div className="hero-geo-circle2"></div>
        <div className="hero-geo-rect"></div>

        <div className="hero-eyebrow">
          <div className="eyebrow-desc">
            Architecture &amp; Design<br />
            TU Berlin — SS 2026<br />
            Cairo &rarr; Berlin
          </div>
          <div className="eyebrow-count">01 / 05</div>
        </div>

        <div className="hero-body">
          <h1 className="hero-name" id="hero-name">
            <span className="l1" id="l1"></span>
            <span className="l2" id="l2"></span>
            <span className="l3" id="l3"></span>
          </h1>
          <div className="hero-foot">
            <div className="hero-intro">
              <p>Architect-in-training, designer, and creator. Exploring the space where structure meets sensation — from Cairo&apos;s ancient grid to Berlin&apos;s modernist blocks.</p>
            </div>
            <div className="hero-tags">
              <div className="htag">Architecture</div>
              <div className="htag">Interior Design</div>
              <div className="htag">UI / UX</div>
              <div className="htag">Photography</div>
              <div className="htag">Graphic Design</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="marquee-wrap">
        <div className="marquee-track" id="marquee-track"></div>
      </div>

      {/* ─── ABOUT ─── */}
      <section className="about" id="about">
        <div className="about-text rv">
          <div className="sec-label">About</div>
          <h2>Architecture<br />Meets Intention</h2>
          <p>Currently at TU Berlin, I came up through the AUC architecture programme before pivoting to Germany. My internship background spans FF&amp;E, 3D visualisation, and front-end development — three disciplines that share the same obsession: making form purposeful.</p>
          <p>I believe great spaces — physical or digital — begin with honest observation and purposeful constraint. I&apos;m trilingual (Arabic, English, German) and build in both Rhino and Figma.</p>
        </div>
        <div className="stats rv rv-d2">
          <div className="stat">
            <div className="stat-n" data-target="3">0</div>
            <div className="stat-l">Architecture internships</div>
          </div>
          <div className="stat">
            <div className="stat-n" data-target="3">0</div>
            <div className="stat-l">Languages — fluent</div>
          </div>
          <div className="stat">
            <div className="stat-n" data-target="6">0</div>
            <div className="stat-l">Design disciplines</div>
          </div>
          <div className="stat">
            <div className="stat-n" data-target="2">0</div>
            <div className="stat-l">Cities, one eye</div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <div className="skills-strip rv">
        <div className="sec-label" style={{width:'100%',marginBottom:'20px'}}>Tools &amp; Skills</div>
        <span className="skill-chip">Rhino 3D</span>
        <span className="skill-chip">Autodesk Revit</span>
        <span className="skill-chip">AutoCAD</span>
        <span className="skill-chip">3ds Max</span>
        <span className="skill-chip">Corona Render</span>
        <span className="skill-chip">Adobe Photoshop</span>
        <span className="skill-chip">Adobe Illustrator</span>
        <span className="skill-chip">Figma</span>
        <span className="skill-chip">UI / UX Design</span>
        <span className="skill-chip">Photography</span>
        <span className="skill-chip">Front-end Dev</span>
        <span className="skill-chip">Logo Design</span>
      </div>

      <hr />

      {/* ─── EXPERIENCE PORTALS ─── */}
      <section className="intern-section">
        <div className="sec-label rv">Experience — click to explore</div>
        <div className="intern-grid">

          <div className="portal-tile rv" data-portal="hsi">
            <div className="pt-num">01</div>
            <div className="pt-name">Hany Saad Innovations</div>
            <div className="pt-meta">3D Department · Post Production · FF&amp;E<br />3 months, Cairo</div>
            <div className="pt-tag">Interior + Visualisation</div>
            <div className="pt-cta">Open portal <span className="arr">→</span></div>
          </div>

          <div className="portal-tile rv rv-d1" data-portal="fr">
            <div className="pt-num">02</div>
            <div className="pt-name">FR Partnership</div>
            <div className="pt-meta">Ahmad Fayyad · FF&amp;E · 3D Renders<br />2 months, Cairo</div>
            <div className="pt-tag">Architecture + Renders</div>
            <div className="pt-cta">Open portal <span className="arr">→</span></div>
          </div>

          <div className="portal-tile rv rv-d2" data-portal="siemens">
            <div className="pt-num">03</div>
            <div className="pt-name">Siemens</div>
            <div className="pt-meta">Cross-sector exposure<br />1 month, Cairo</div>
            <div className="pt-tag">Engineering + Strategy</div>
            <div className="pt-cta">Open portal <span className="arr">→</span></div>
          </div>

        </div>
      </section>

      <hr />

      {/* ─── WORKS ─── */}
      <section className="works" id="works">
        <div className="works-head rv">
          <div>
            <div className="sec-label">Selected Works</div>
            <h2>Projects</h2>
          </div>
          <a href="#contact" className="view-all">Get in touch</a>
        </div>

        <div className="work-list">
          <div className="work-row rv" data-label="Architecture">
            <span className="w-num">01</span>
            <div>
              <div className="w-title">Egypt Pavilion — Biennale 2024</div>
              <div className="w-cat">Architecture · Concept Design · Rhino</div>
            </div>
            <span className="w-type">Architecture</span>
            <span className="w-year">2024</span>
          </div>
          <div className="work-row rv rv-d1" data-label="Interior">
            <span className="w-num">02</span>
            <div>
              <div className="w-title">North Coast Bedroom Interior</div>
              <div className="w-cat">Interior Design · 3D Visualisation · Corona</div>
            </div>
            <span className="w-type">Interior</span>
            <span className="w-year">2023</span>
          </div>
          <div className="work-row rv rv-d2" data-label="Digital">
            <span className="w-num">03</span>
            <div>
              <div className="w-title">Aada — Islamic Habit Tracker</div>
              <div className="w-cat">UI / UX · Front-end Development · Figma</div>
            </div>
            <span className="w-type">Digital</span>
            <span className="w-year">2024</span>
          </div>
          <div className="work-row rv rv-d3" data-label="Photography">
            <span className="w-num">04</span>
            <div>
              <div className="w-title">Downtown Cairo — Photo Series</div>
              <div className="w-cat">Photography · Architectural Documentation</div>
            </div>
            <span className="w-type">Photography</span>
            <span className="w-year">2023</span>
          </div>
          <div className="work-row rv rv-d4" data-label="Graphic">
            <span className="w-num">05</span>
            <div>
              <div className="w-title">Subconscious — Poster Series</div>
              <div className="w-cat">Graphic Design · Typography · Editorial</div>
            </div>
            <span className="w-type">Graphic</span>
            <span className="w-year">2023</span>
          </div>
        </div>
      </section>

      {/* ─── POSTER RACK ─── */}
      <div
        className="poster-rack-section"
        onMouseMove={(e) => {
          const dot = document.getElementById('poster-cursor')
          if (dot) { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px' }
        }}
        onMouseEnter={() => {
          const dot = document.getElementById('poster-cursor')
          if (dot) dot.style.opacity = '1'
          document.body.classList.add('cur-hidden')
        }}
        onMouseLeave={() => {
          const dot = document.getElementById('poster-cursor')
          if (dot) dot.style.opacity = '0'
          document.body.classList.remove('cur-hidden')
        }}
      >
        <div id="poster-cursor" />
        <div className="rack-top-label">Subconscious · Poster Series</div>
        <div className="rack-scene" style={{ touchAction: 'none' }}>
          <div className="rack-container">
            {POSTERS.map((p, i) => {
              const offset = i - selectedIndex
              const rotateY = offset === 0 ? 0 : offset > 0 ? 75 : -75
              const translateZ = offset === 0 ? 0 : -80
              const translateXPx = isMobile ? 120 : 160
              const cardTransform = `translateX(${offset * translateXPx}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`
              return (
                <div
                  key={p.src}
                  className={`rack-card ${i === selectedIndex ? 'selected' : 'unselected'}`}
                  style={{ transform: cardTransform }}
                  onClick={() => handlePosterClick(i)}
                  onTouchEnd={() => handlePosterClick(i)}
                >
                  <img src={p.src} alt={p.title} />
                </div>
              )
            })}
          </div>
        </div>
        <div className="rack-title-wrap">
          <div className={`rack-title-text${titleVisible ? ' visible' : ''}`}>
            {POSTERS[displayedIndex].title}
          </div>
        </div>
        <div className="rack-nav">
          {POSTERS.map((_, i) => (
            <div
              key={i}
              className={`rack-nav-dot${i === selectedIndex ? ' active' : ''}`}
              onClick={() => handlePosterClick(i)}
            />
          ))}
        </div>
        <div className="rack-meta">
          <span>{String(displayedIndex + 1).padStart(2, '0')} / {String(POSTERS.length).padStart(2, '0')}</span>
          <span>Poster Series</span>
          <span>2023</span>
        </div>
      </div>

      <hr />

      {/* ─── QUOTE ─── */}
      <section className="quote-section">
        <div className="quote-num rv">→</div>
        <div className="rv rv-d1">
          <div className="sec-label">On Architecture</div>
          <blockquote>
            &ldquo;Buildings like these could fuse modern day architecture with old heritage — used as community buildings, libraries, or rental offices.&rdquo;
            <cite>— Youssef El Azhari, on Downtown Cairo</cite>
          </blockquote>
        </div>
      </section>

      <hr />

      {/* ─── CONTACT ─── */}
      <section className="contact" id="contact">
        <div className="rv">
          <div className="sec-label">Get in Touch</div>
          <div className="contact-left">
            <h2>Let&apos;s<br /><span>Build.</span></h2>
          </div>
        </div>
        <div className="contact-links rv rv-d2">
          <a href="mailto:yussuf.magdi.azhari@gmail.com" className="clink">
            Email <span className="arr">→</span>
          </a>
          <a href="https://www.instagram.com/yazhari.86" target="_blank" rel="noopener noreferrer" className="clink">
            Instagram — @yazhari.86 <span className="arr">→</span>
          </a>
          <a href="https://linkedin.com/in/youssef-azhari" target="_blank" rel="noopener noreferrer" className="clink">
            LinkedIn <span className="arr">→</span>
          </a>
          <a href="tel:+201023230709" className="clink">
            +20 102 323 0709 <span className="arr">→</span>
          </a>
        </div>
      </section>

      <footer>
        <p>Youssef El Azhari &copy; 2025</p>
        <div className="footer-dot"></div>
        <p>Architecture &amp; Design</p>
        <div className="footer-dot"></div>
        <p>Berlin — Cairo</p>
      </footer>
    </>
  )
}
