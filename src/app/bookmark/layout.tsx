import { ReactNode } from 'react'
import React from 'react'
import Background from '../_components/Background'

type Props = { children: ReactNode }
export default function MainLayout({ children }: Props) {
  return (
    <div>
      <div className="fixed z-0">
        <Background />
      </div>
      {children}
    </div>
  )
}
