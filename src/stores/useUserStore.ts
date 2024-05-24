// import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

// interface MyState {
//   nickname: string
//   setNickname: (nickname: string) => void
// }

// export const useUserStore = create<MyState>()(
//   persist(
//     (set) => ({
//       nickname: '',
//       setNickname: (newNickname: string) =>
//         set(() => ({ nickname: newNickname })),
//     }),
//     {
//       name: 'nickname-storage',
//       storage: createJSONStorage(() => localStorage),
//     },
//   ),
// )
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
      setNickname: (newNickname: string) => {
        // const modifiedNickname = newNickname.split('#')[0] // 해시(#) 이전의 부분만 추출합니다.
        // set(() => ({ nickname: modifiedNickname }))
        set(() => ({ nickname: newNickname }))
      },
    }),
    {
      name: 'nickname-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
