'use client'
import { useUserStore } from '@/stores/useUserStore'

export default function Nicknameheader() {
  const { nickname } = useUserStore()
  const modifiedNickname = nickname.split('#')[0]
  return (
    <div className="text-center text-white">
      {modifiedNickname}
      {`'s Page`}
    </div>
  )
}
