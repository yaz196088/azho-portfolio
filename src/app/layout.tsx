import type { Metadata } from 'next'
import './globals.css'
import CursorClient from '../components/CursorClient'

export const metadata: Metadata = {
  title: 'Youssef El Azhari — Architecture & Design',
  description: 'Architect-in-training, designer, and creator.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@300;400;600;800;900&family=Bricolage+Grotesque:opsz,wght@12..96,300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,900;1,9..144,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CursorClient />
        {children}
      </body>
    </html>
  )
}
