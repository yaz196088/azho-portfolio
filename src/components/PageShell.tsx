'use client'
import { useCallback, useState, type ReactNode } from 'react'
import WalkerIntro from './WalkerIntro'

/**
 * Holds the intro's completion state so the hero can act as a fixed backdrop
 * during the walk (visible through the mask cut-out) and then settle into
 * normal document flow once the walk finishes.
 */
export default function PageShell({
  hero,
  children,
}: {
  hero: ReactNode
  children: ReactNode
}) {
  const [introDone, setIntroDone] = useState(false)
  const handleDone = useCallback((v: boolean) => setIntroDone(v), [])

  return (
    <>
      <WalkerIntro onDone={handleDone} />

      <div
        style={
          introDone
            ? { position: 'relative' }
            : { position: 'fixed', inset: 0, zIndex: 1, overflow: 'hidden' }
        }
      >
        {hero}
      </div>

      {children}
    </>
  )
}
