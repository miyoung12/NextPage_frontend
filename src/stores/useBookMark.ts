import { create } from 'zustand'

interface BookMarkState {
  favImageUrl: string
  favStoryId: number
  updateBookMark: (favImageUrl: string, favStoryId: number) => void
}

const useBookMark = create<BookMarkState>((set) => ({
  favImageUrl: '',
  favContent: '',
  favStoryId: -2, // 초기값을 -2로 설정
  updateBookMark: (imageUrl: string, storyId: number) =>
    set({
      favImageUrl: imageUrl,
      favStoryId: storyId,
    }),
}))

export default useBookMark
