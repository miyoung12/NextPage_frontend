import Background from '@/app/_components/Background'
import SignupModal from '../_components/SignupModal'
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
