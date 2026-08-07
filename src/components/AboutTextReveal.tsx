'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

export default function AboutTextReveal({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'start 0.25'],
  })

  const words = text.split(' ')

  return (
    <p
      ref={containerRef}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        rowGap: '0.2em',
      }}
    >
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
          />
        )
      })}
    </p>
  )
}

function Word({
  word,
  progress,
  range,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0, 1])
  const x = useTransform(progress, range, [40, 0])
  const skewX = useTransform(progress, range, [-8, 0])

  return (
    <motion.span
      style={{
        opacity,
        x,
        skewX,
        display: 'inline-block',
        marginRight: '0.28em',
        willChange: 'transform, opacity',
      }}
    >
      {word}
    </motion.span>
  )
}
