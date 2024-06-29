'use client'
import useBookMark from '@/stores/useBookMark'

export default function DeleteButton() {
  const { favStoryId } = useBookMark()
  const handleClickView = () => {
    const token = localStorage.getItem('a')
    console.log('delete', favStoryId)
    fetch(`api/v2/mypage/bookmarks/${favStoryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error('Error:', error) // 에러 처리
      })
  }

  return (
    <button
      className="w-[100px] text-center pt-[1px] bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[18px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600"
      onClick={handleClickView}
    >
      DELETE
    </button>
  )
}
