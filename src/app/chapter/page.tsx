'use client'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import Background from '@/app/_components/Background'
import Navbar from '@/app/_components/Navbar'
import ScenarioSlide from './_component/ScenarioSlide'
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

  // const handleUpdate = () => {
  //   window.location.reload()
  // }

  const handleUpdate = useCallback(() => {
    if (stories !== null) {
      RootStory()
    }
    setStories(stories) //한 번 테스트해보기
  }, [])

  const RootStory = async () => {
    try {
      const response = await axios.get(`/api/v2/stories`)
      if (response.status === 200) {
        console.log(response.data.message) //전체 루트 스토리 조회
        const stories = response.data.data
        // const stories = response.data
        setStories(stories)
        console.log(stories)
      }
    } catch (error) {
      console.error('루트 스토리 조회 중 에러 발생')
    }
  }

  const handleSwiper = (index: number) => {
    setCurrentStoryIndex(index)
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
          {/* <div className="flex justify-center items-center w-full h-full absolute">
            <img
              style={{
                filter: 'drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.807))',
              }}
              className="w-[60%] "
              src="./circle.svg"
              alt=""
            />
          </div> */}
          {/* <div className="flex flex-col items-center h-[145px]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                ease: 'easeInOut',
                duration: 0.5,
                delay: 0.1,
              }}
            >
              <hr className="border-white w-[600px]" />
              <div className="flex items-center justify-between gap-[50px] px-[30px] py-[10px]">
                <div className="text-[20px] text-white">
                  <span className="text-green-400">
                    {stories[currentStoryIndex]?.userNickname}
                  </span>
                </div>
                <div className="w-[400px] text-[20px] text-white">
                  {stories[currentStoryIndex]?.content}
                </div>
              </div>
              <hr className="border-white w-[600px]" />
            </motion.div>
          </div> */}
          {/* <div className="z-1 flex justify-center">
            <ScenarioSlide
              stories={stories}
              modalOpen={modalOpen}
              onSlideClick={handleSwiper}
            />
          </div> */}
          <CarouselContainer />
        </div>
        <div className="flex w-screen h-[100px] justify-center items-end">
          <img className="w-screen h-[200px]" src="./grid.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Chapter
