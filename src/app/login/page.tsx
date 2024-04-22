import Background from '../_components/Background'
import LoginModal from '../_components/LoginModal'
import React from 'react'
export default function page() {
  return (
    <div>
      <div className="fixed">
        <Background />
      </div>
      <LoginModal />
    </div>
  )
}
