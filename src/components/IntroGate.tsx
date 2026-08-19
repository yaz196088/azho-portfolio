'use client'
import { useState } from 'react'
import DockIntro from './DockIntro'

export default function IntroGate({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <>
      {showIntro && <DockIntro onDismiss={() => setShowIntro(false)} />}
      {children}
    </>
  )
}
