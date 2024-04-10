import Background from '@/app/_components/Background'
import LoginModal from '../_components/LoginModal'
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
