import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface MyState {
  nickname: string
  setNickname: (nickname: string) => void
}

export const useUserStore = create<MyState>()(
  persist(
    (set) => ({
      nickname: '',
      setNickname: (newNickname: string) =>
        set(() => ({ nickname: newNickname })),
    }),
    {
      name: 'nickname-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
