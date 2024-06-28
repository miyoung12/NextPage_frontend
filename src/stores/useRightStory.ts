import { create } from 'zustand'

interface BookStory {
  id: string
  imageUrl: string
  content: string
}

interface RightState {
  bookStroy: BookStory[]
  updateRightState: (newBookStroy: BookStory[]) => void
}

const useRightStory = create<RightState>((set) => ({
  bookStroy: [],
  updateRightState: (newBookStroy: BookStory[]) =>
    set({
      bookStroy: newBookStroy,
    }),
}))

export default useRightStory
