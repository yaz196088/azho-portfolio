"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "Architecture",
  "Interior Design",
  "UI / UX",
  "Photography",
  "Graphic Design",
  "3D Visualisation",
  "Rhino 3D",
  "Figma",
  "Cairo",
  "Berlin",
];

function Track({ reverse = false }: { reverse?: boolean }) {
  const duplicated = [...ITEMS, ...ITEMS];
  return (
    <div className="flex overflow-hidden select-none">
      <motion.div
        className="flex shrink-0 gap-8 items-center"
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, repeatType: "loop", duration: 28, ease: "linear" }}
      >
        {duplicated.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap uppercase tracking-tight text-[clamp(1.2rem,3vw,2.2rem)]"
            style={{
              fontFamily: "'Big Shoulders Display', sans-serif",
              fontWeight: 600,
              color: 'var(--muted)',
            }}
          >
            <span style={{ color: 'var(--red)', marginRight: '1.5rem' }}>·</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="py-4 overflow-hidden space-y-2" style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
      <Track />
      <Track reverse />
    </section>
  );
}
