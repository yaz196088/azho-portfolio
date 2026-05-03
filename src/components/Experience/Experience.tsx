"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { internships } from "@/lib/data";

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="experience"
      ref={ref}
      className="px-6 md:px-12 py-32 max-w-6xl mx-auto"
    >
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        <motion.p
          className="font-mono text-xs text-muted uppercase tracking-[0.2em] pt-2"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          02 / Experience
        </motion.p>

        <div className="space-y-0 divide-y divide-white/5">
          {internships.map((role, i) => (
            <motion.div
              key={role.id}
              className="py-8 grid sm:grid-cols-[auto_1fr] gap-8 group"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="min-w-[7rem]">
                <p className="font-mono text-xs text-muted">{role.period}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {role.title}
                  </h3>
                  <span className="text-muted text-sm">— {role.company}</span>
                </div>
                {role.location && (
                  <p className="font-mono text-xs text-muted/60 uppercase tracking-widest">
                    {role.location}
                  </p>
                )}
                <p className="text-muted leading-relaxed">{role.description}</p>
                {role.tags && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-muted/70 uppercase tracking-widest border border-white/5 px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
