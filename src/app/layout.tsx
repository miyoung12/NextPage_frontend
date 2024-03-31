import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import favicon from '../../public/favicon.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextPage',
  description: '"상상을 현실로" 손 끝에서 펼쳐지는 우리만의 세계',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
