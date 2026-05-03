"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  "Rhino 3D", "Autodesk Revit", "AutoCAD", "3ds Max",
  "Corona Render", "Adobe Photoshop", "Figma", "UI / UX Design",
  "Photography", "Front-end Dev", "Logo Design",
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section id="about" ref={ref} className="px-6 md:px-12 py-24 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">

        <motion.p
          className="text-xs uppercase tracking-[0.2em] pt-2"
          style={{ color: 'var(--muted)' }}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          01 / About
        </motion.p>

        <div className="space-y-8">
          <motion.h2
            className="text-[clamp(2rem,5vw,4rem)] leading-tight text-ink"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Architecture<br />Meets Intention
          </motion.h2>

          <motion.p
            className="text-base leading-relaxed max-w-prose"
            style={{ color: 'var(--muted)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Currently at TU Berlin, I came up through the AUC architecture programme before pivoting to Germany. My internship background spans FF&amp;E, 3D visualisation, and front-end development — three disciplines that share the same obsession: making form purposeful.
          </motion.p>

          <motion.p
            className="text-base leading-relaxed max-w-prose"
            style={{ color: 'var(--muted)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18 }}
          >
            I believe great spaces — physical or digital — begin with honest observation and purposeful constraint. Trilingual: Arabic, English, German.
          </motion.p>

          <motion.ul
            className="flex flex-wrap gap-2 pt-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {skills.map((skill) => (
              <li
                key={skill}
                className="px-3 py-1 text-xs uppercase tracking-widest"
                style={{ border: '1px solid var(--rule)', color: 'var(--muted)' }}
              >
                {skill}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
