import type { Metadata } from 'next'
import './globals.css'

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
      </head>
      <body>{children}</body>
    </html>
  )
}
