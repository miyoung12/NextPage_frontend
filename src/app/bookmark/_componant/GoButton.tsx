import useBookMark from '@/stores/useBookMark'
import { useRouter } from 'next/navigation'

interface BookStory {
  id: string
}

export default function GoButton({ bookStory0 }: { bookStory0: BookStory }) {
  const router = useRouter()
  const handleClickView = () => {
    if (bookStory0) {
      router.push(`/scenario?rootId=${bookStory0.id}`)
    }
  }
  return (
    <div>
      <button
        className="w-[100px] text-center pt-[1px] bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[18px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600"
        onClick={handleClickView}
      >
        GO
      </button>
    </div>
  )
}
