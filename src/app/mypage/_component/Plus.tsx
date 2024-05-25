'use client'
import { useRouter } from 'next/navigation'

export default function Plus() {
  const router = useRouter()
  const HandlePlus = () => {
    router.push('/main')
  }
  return (
    <div
      onClick={HandlePlus}
      className="w-[12rem] h-[12rem] border-b-[1px] border-r-[1px] flex justify-center items-center text-white text-4xl"
    >
      +
    </div>
  )
}
