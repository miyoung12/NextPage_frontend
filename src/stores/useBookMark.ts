import { create } from 'zustand'

interface BookMarkState {
  favImageUrl: string
  favContent: string
  updateBookMark: (imageUrl: string, content: string) => void
}

const useBookMark = create<BookMarkState>((set) => ({
  favImageUrl: '',
  favContent: '',
  updateBookMark: (imageUrl, content) =>
    set({ favImageUrl: imageUrl, favContent: content }),
}))

export default useBookMark
