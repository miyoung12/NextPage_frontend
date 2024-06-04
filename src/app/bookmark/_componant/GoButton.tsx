'use client'
import { useRouter } from 'next/navigation'

export default function GoButton() {
  const router = useRouter()
  const handleClickView = () => {
    console.log('go')
    router.push('/main')
  }
  return (
    <button
      className="w-[100px] text-center pt-[1px] bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[18px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600"
      onClick={handleClickView}
    >
      GO!
    </button>
  )
}
