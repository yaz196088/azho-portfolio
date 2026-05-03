"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { y: 60, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-20 pt-32 overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl"
      >
        <motion.p
          variants={item}
          className="text-xs uppercase tracking-[0.2em] mb-6"
          style={{ color: 'var(--muted)' }}
        >
          Architecture · Design · Cairo → Berlin
        </motion.p>

        <motion.h1
          variants={item}
          className="text-[clamp(3rem,9vw,8rem)] leading-[0.92] tracking-tight text-ink"
          style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.03em' }}
        >
          Youssef<br />
          <span style={{ color: 'var(--red)' }}>El Azhari</span><br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--ink)' }}>Azho</span>
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <a
            href="#works"
            className="inline-flex items-center gap-3 px-6 py-3 text-sm uppercase tracking-widest text-ink border border-ink/20 hover:bg-ink hover:text-cream transition-all duration-300"
          >
            View Work →
          </a>
          <a
            href="#contact"
            className="text-sm uppercase tracking-widest transition-colors duration-200"
            style={{ color: 'var(--muted)' }}
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-12 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] rotate-90 origin-center mb-4" style={{ color: 'var(--muted)' }}>
          Scroll
        </span>
        <motion.div
          className="h-10 w-px bg-ink/20"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
