import { ReactNode } from 'react'
import React from 'react'

type Props = { children: ReactNode }
export default function MainLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
