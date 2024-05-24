'use client'
import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import lottieData from '../../../../public/lottie.json'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface MyStroyModalProps {
  isOpen: boolean
  closeModal: () => void
  imageUrl: string
  content: string
}

const MyStroyModal: React.FC<MyStroyModalProps> = ({
  isOpen,
  closeModal,
  imageUrl,
  content,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false) // Lottie를 트리거
  const router = useRouter()

  const handleClickClose = () => {
    closeModal()
  }

  const handleClickView = () => {
    console.log('view')
    router.push('/scenario')
  }

  // Lottie 애니메이션 완료 시 호출되는 콜백
  const handleLottieComplete = () => {
    setIsGenerating(false) // Lottie 숨기기
  }

  // 모달 외부를 클릭했을 때 모달을 닫도록 하는 이벤트 처리
  useEffect(() => {
    const handleBackgroundClick = (e: MouseEvent) => {
      // 배경 클릭 시 모달 닫기
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        !isGenerating
      ) {
        closeModal()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleBackgroundClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleBackgroundClick)
    }
  }, [isOpen, isGenerating, closeModal])

  return (
    <div
      className={`flex justify-start items-center fixed top-0 pl-[55px] right-[-30%] w-[100vw] h-[100vh] ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <motion.div
        ref={modalRef}
        className={`z-20 flex flex-col w-[440px] h-[670px]`}
        initial={{ opacity: 0, y: 80, rotateY: 500 }}
        animate={{
          opacity: 1,
          y: 0,
          rotateY: 0,
          transition: {
            rotateY: {
              duration: 1,
            },
            y: {
              type: 'spring',
              damping: 3,
              stiffness: 50,
              restDelta: 0.01,
              duration: 0.3,
            },
          },
        }}
      >
        <div className="flex w-full h-[55px] justify-center items-center pt-[8px] bg-blue-800 border-2 border-white text-green-400 text-[33px] font-Minecraft">
          STORY
        </div>
        <div className="relative flex flex-col w-full h-full justify-center items-center gap-[17px] bg-[#000000ae] border-2 border-t-0 border-white text-white">
          {isGenerating && (
            <div className="z-20 gap-[10px] p-[70px] bg-gray-500 bg-opacity-50 w-full h-[615px]">
              <Lottie
                animationData={lottieData}
                onComplete={handleLottieComplete}
              />
            </div>
          )}
          <div className="flex flex-col justify-center items-center w-[350px] h-full">
            <div className="flex flex-col gap-1">
              <Image src={imageUrl} alt="a" width={350} height={350} />
              <div className="flex flex-col pt-2 pb-4 gap-1 items-end text-white">
                <div className="w-[350px] h-[140px] p-[7px] border-dashed border-2 border-gray-500 bg-black focus:border-white">
                  {content}
                </div>
              </div>

              <div className="flex justify-between w-[350px] h-[30px] ">
                <button
                  className="w-[100px] text-center pt-[1px] bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[18px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600"
                  onClick={handleClickView}
                >
                  VIEW
                </button>
                <button
                  className="w-[100px] text-center pt-[1px] bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[18px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600"
                  onClick={handleClickClose}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default MyStroyModal
