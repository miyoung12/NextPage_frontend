'use client'

// import { type ElementRef, useEffect, useRef } from 'react'
// import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'

export function Modal({ children }: { children: React.ReactNode }) {
  // const router = useRouter()
  // const dialogRef = useRef<ElementRef<'dialog'>>(null)

  // useEffect(() => {
  //   if (!dialogRef.current?.open) {
  //     dialogRef.current?.showModal()
  //   }
  // }, [])

  // function onDismiss() {
  //   router.back()
  // }

  return createPortal(
    <div
      className={`fixed flex justify-center items-center top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50`}
    >
      {children}
    </div>,
    document.getElementById('modal-root')!, //modal-root에 포탈 만들거야
  )
}
// createPortal
