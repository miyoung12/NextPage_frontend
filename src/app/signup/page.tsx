import Background from '../_components/Background'
import SignupModal from '../_components/SignupModal'
import React from 'react'
export default function page() {
  return (
    <div>
      <div className="fixed">
        <Background />
      </div>
      <SignupModal />
    </div>
  )
}
