'use client'

import { useEffect } from 'react'

export default function HeroClient() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const l1 = document.getElementById('l1')
    const l2 = document.getElementById('l2')
    const l3 = document.getElementById('l3')
    if (!l1 || !l2 || !l3) return
    if (l1.dataset.split === 'done') return
    l1.dataset.split = 'done'
    l2.dataset.split = 'done'
    l3.dataset.split = 'done'

    function charSplit(el: HTMLElement, text: string, baseDelay: number) {
      el.innerHTML = ''
      text.split('').forEach((ch, i) => {
        const s = document.createElement('span')
        s.className = 'char'
        s.textContent = ch === ' ' ? ' ' : ch
        s.style.animationDelay = (baseDelay + i * 0.045) + 's'
        el.appendChild(s)
      })
    }
    charSplit(l1, 'Youssef', 0.1)
    charSplit(l2, 'El Azhari', 0.5)
    charSplit(l3, 'Azho', 0.92)
  }, [])

  return (
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
          <span className="l1" id="l1" suppressHydrationWarning></span>
          <span className="l2" id="l2" suppressHydrationWarning></span>
          <span className="l3" id="l3" suppressHydrationWarning></span>
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
  )
}
