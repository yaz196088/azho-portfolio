"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const links = [
  { label: "Email",     href: "mailto:yussuf.magdi.azhari@gmail.com", display: "yussuf.magdi.azhari@gmail.com" },
  { label: "Instagram", href: "https://www.instagram.com/yazhari.86",  display: "@yazhari.86" },
  { label: "LinkedIn",  href: "https://linkedin.com/in/youssef-azhari", display: "linkedin.com/in/youssef-azhari" },
  { label: "Phone",     href: "tel:+201023230709",                      display: "+20 102 323 0709" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="contact" ref={ref} className="px-6 md:px-12 py-24 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">

        <motion.p
          className="text-xs uppercase tracking-[0.2em] pt-2"
          style={{ color: 'var(--muted)' }}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          04 / Contact
        </motion.p>

        <div className="space-y-12">
          <motion.h2
            className="text-[clamp(2.5rem,6vw,5rem)] leading-tight text-ink"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Let&apos;s<br />
            <span style={{ color: 'var(--red)' }}>Build.</span>
          </motion.h2>

          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center justify-between py-4 text-sm uppercase tracking-widest transition-all duration-200"
                style={{ borderBottom: '1px solid var(--rule)', color: 'var(--muted)', opacity: 0.7 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--red)'; (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; (e.currentTarget as HTMLElement).style.opacity = '0.7'; }}
              >
                <span>{link.label}</span>
                <span>{link.display} →</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="mt-24 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        style={{ borderTop: '1px solid var(--rule)' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted)', opacity: 0.5 }}>
          Youssef El Azhari © {new Date().getFullYear()}
        </span>
        <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted)', opacity: 0.3 }}>
          Architecture &amp; Design · Berlin — Cairo
        </span>
      </motion.div>
    </section>
  );
}
