import { create } from 'zustand'

interface RightState {
  bookStroy: string
  updateRightState: (newBookStroy: string) => void
}

const useRightStory = create<RightState>((set) => ({
  // imageUrl, content를 이 곳에서 가져왔다.
  bookStroy: '',
  updateRightState: (newBookStroy: string) =>
    set({
      bookStroy: newBookStroy,
    }),
}))

export default useRightStory
