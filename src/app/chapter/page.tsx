'use client'
import { useState, useEffect, useCallback } from 'react'
import Background from '@/app/_components/Background'
import Navbar from '@/app/_components/Navbar'
import CarouselContainer from './_component/3dCarousel'

const Chapter = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [stories, setStories] = useState<
    Array<{
      id: number
      userNickname: string
      content: string
      imageUrl: string
    }>
  >([])

  //시나리오 모달 관련 함수
  const closeModal = () => {
    setModalOpen(false)
    setStories(stories)
  }
  const openModal = () => {
    //     if (user.user_id) {
    //       // 로그인 상태일 때만 시나리오 생성하게 하기
    setModalOpen(true)
    //     } else {
    //       alert('로그인 후 생성이 가능합니다.')
    //     }
  }

  const handleUpdate = useCallback(() => {
    if (stories !== null) {
      RootStory()
    }
    setStories(stories) //한 번 테스트해보기
  }, [])

  const RootStory = async () => {
    try {
      const response = await fetch(`api/v2/stories`)
      if (response.ok) {
        const data = await response.json()
        const stories = data.data
        console.log(data.data) //전체 루트 스토리 조회
        // const stories = response.data
        setStories(stories)
        console.log(stories)
      } else {
        console.error('루트 스토리 조회 중 에러 발생: ', response.statusText)
      }
    } catch (error) {
      console.error('루트 스토리 조회 중 에러 발생', error)
    }
  }

  const handleSwiper = (index: number) => {
    setCurrentStoryIndex(index)
  }

  const handleClickBack = () => {
    window.history.back()
  }

  useEffect(() => {
    RootStory()
  }, [])
  return (
    <div>
      <Background />
      <div className="flex flex-col w-[100vw] h-[100vh] justify-center items-center absolute top-1/2 left-1/2 z-1 bg-transparent -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col w-full h-full items-center gap-[33px]">
          <Navbar />
          <CarouselContainer />
        </div>
        <div className="flex w-screen h-[100px] justify-center items-end">
          <img className="w-screen h-[200px]" src="./grid.png" alt="" />
        </div>
      </div>
      <div
        onClick={handleClickBack}
        className="w-[50px] h-[50px] text-white absolute left-8 bottom-8"
      >
        <svg
          className="hover:scale-125 hover:opacity-35 h-full drop-shadow"
          style={{
            filter: 'drop-shadow(7px 1px 8px rgba(255, 255, 255, 0.7))',
          }}
          data-slot="icon"
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default Chapter
