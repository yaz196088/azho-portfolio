import HeroClient from '../components/HeroClient'
import PosterRack from '../components/PosterRack'
import PosterWorkRow from '../components/PosterWorkRow'
import PageEffects from '../components/PageEffects'
import ScrollReveal from '../components/ScrollReveal'
import StatCounters from '../components/StatCounters'

const MARQUEE_ITEMS = [
  'Architecture','Interior Design','UI / UX','Photography','Graphic Design',
  '3D Visualisation','FF&E','Typography','Concept Design','Cairo','Berlin',
  'Rhino 3D','Figma','Corona Render',
]

export default function Home() {
  return (
    <>
      {/* Client-side effects: cursor, scroll reveal, stat counters, page interactions */}
      <PageEffects />
      <ScrollReveal />
      <StatCounters />

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
      <HeroClient />

      {/* ─── MARQUEE ─── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="marquee-item">
              <span className="dot"></span>{item}
            </span>
          ))}
        </div>
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
          <PosterWorkRow />
        </div>
      </section>

      {/* ─── POSTER RACK ─── */}
      <PosterRack />

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
          <a href="mailto:youssefazhari60@gmail.com" className="clink">
            youssefazhari60@gmail.com <span className="arr">→</span>
          </a>
          <a href="https://www.instagram.com/yazhari.86" target="_blank" rel="noopener noreferrer" className="clink">
            Instagram — @yazhari.86 <span className="arr">→</span>
          </a>
          <a href="https://linkedin.com/in/youssef-azhari" target="_blank" rel="noopener noreferrer" className="clink">
            LinkedIn <span className="arr">→</span>
          </a>
          <a href="tel:+201094697699" className="clink">
            +20 109 469 7699 <span className="arr">→</span>
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
