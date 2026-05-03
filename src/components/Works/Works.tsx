"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/lib/data";

export default function Works() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="works" ref={ref} className="px-6 md:px-12 py-24 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">

        <motion.p
          className="text-xs uppercase tracking-[0.2em] pt-2"
          style={{ color: 'var(--muted)' }}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          03 / Works
        </motion.p>

        <div className="divide-y" style={{ borderColor: 'var(--rule)' }}>
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.url ?? "#"}
              target={project.url ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="block py-8 relative"
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <h3
                    className="text-2xl transition-colors duration-200"
                    style={{
                      color: hovered === project.id ? 'var(--red)' : 'var(--ink)',
                      fontFamily: "'Big Shoulders Display', sans-serif",
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--muted)' }}>
                    {project.description}
                  </p>
                  {project.tags && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-widest px-2 py-0.5"
                          style={{ border: '1px solid var(--rule)', color: 'var(--muted)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <motion.span
                  className="flex-shrink-0 text-xl mt-1"
                  style={{ color: 'var(--muted)' }}
                  animate={{ x: hovered === project.id ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ↗
                </motion.span>
              </div>

              <span
                className="text-xs absolute top-8 right-0 md:right-8"
                style={{ color: 'var(--muted)', opacity: 0.4 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
