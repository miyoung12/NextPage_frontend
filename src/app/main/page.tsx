'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import ScenarioSlide from './_component/ScenarioSlide'
import axios from 'axios'
import PostScenarioModal from '../scenario/_component/PostScenarioModal'
import Navbar from '../_components/Navbar'
import Background from '../_components/Background'

const Main = () => {
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
        const stories = response.data.data.stories
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
    <>
      <Background />
      <div className="flex w-[100vw] h-[100vh] flex-col justify-center items-center absolute top-1/2 left-1/2 z-1 bg-transparent -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col w-full h-full gap-[33px]">
          <Navbar />
          <div className="flex flex-col items-center h-[145px]">
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
          </div>
          <div className="z-1 flex justify-center">
            <ScenarioSlide
              stories={stories}
              modalOpen={modalOpen}
              onSlideClick={handleSwiper}
            />
          </div>
          <div className="absolute bottom-12 right-14 z-10">
            <Image
              className="hover:scale-125 hover:opacity-35 drop-shadow"
              style={{
                filter: 'drop-shadow(7px 1px 8px rgba(255, 255, 255, 0.7))',
                position: 'relative',
              }}
              onClick={openModal}
              src="/write.svg"
              alt="글버튼"
              width={50}
              height={50}
              priority={true}
            />
            <div className="w-max flex gap-1 text-gray-400 text-[14px] absolute right-[60px] bottom-0 z-1">
              <svg
                className="w-[15px]"
                data-slot="icon"
                fill="none"
                strokeWidth={2.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
              </svg>
              <span>나만의 시나리오를 작성해보세요!</span>
            </div>
          </div>
          {modalOpen && (
            <PostScenarioModal
              isOpen={modalOpen}
              closeModal={() => {
                closeModal()
              }}
              handleUpdate={() => {
                handleUpdate()
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}
export default Main
