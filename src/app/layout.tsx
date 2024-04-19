import type { Metadata } from 'next'
import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'

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
  auth,
}: Readonly<{
  children: React.ReactNode
  auth: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {auth}
        <div id="modal-root" />
      </body>
    </html>
  )
}
