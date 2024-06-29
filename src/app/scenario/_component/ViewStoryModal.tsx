import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import BookmarkBtn from './BookmarkBtn'

interface StoryModalProps {
  storyID: {
    id: number
    page: number
  }
  isOpen: boolean
  onClose: () => void
  handleClickStory: any
  isCreateModalOpen: boolean
}
const StoryModal: React.FC<StoryModalProps> = ({
  storyID,
  isOpen,
  onClose,
  handleClickStory,
  isCreateModalOpen,
}) => {
  const [story, setStory] = useState<{
    id: number
    content: string
    imageUrl: string
    userNickname: string
    parentId: number
    childId: string[]
    childContent: string[]
  } | null>(null)
  const modalRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]
  // const [storyId, setStoryId] = useState<number>()
  const [isAnimationComplete1, setIsAnimationComplete1] = useState(false)
  const [isAnimationComplete2, setIsAnimationComplete2] = useState(false)
  const [nextModalKey, setNextModalKey] = useState(0)

  const handleBackgroundClick = (e: MouseEvent) => {
    // 모달 외부를 클릭했을 때 모달을 닫도록 하는 이벤트 처리
    if (
      modalRefs.every(
        (modalRef) => !modalRef.current?.contains(e.target as Node),
      ) &&
      isOpen
    ) {
      if (!isCreateModalOpen) {
        onClose()
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 외부 클릭 이벤트 리스너 등록
      document.addEventListener('mousedown', handleBackgroundClick)
    } else {
      // 모달이 닫힐 때 외부 클릭 이벤트 리스너 제거
      document.removeEventListener('mousedown', handleBackgroundClick)
    }
    // 컴포넌트 언마운트 시에 이벤트 리스너 정리
    return () => {
      document.removeEventListener('mousedown', handleBackgroundClick)
    }
  }, [isOpen, isCreateModalOpen])

  useEffect(() => {
    const storyId = storyID.id
    const storyAPI = async () => {
      try {
        const response = await fetch(`api/v2/stories/details/${storyId}`)
        const data = await response.json()
        if (data.data) {
          // 데이터가 존재할 때만 state 업데이트
          setStory({
            ...data.data,
          })
        }
      } catch (error) {
        console.error('Error fetching story data:', error)
      }
    }
    storyAPI()
  }, [storyID, nextModalKey])

  const handleClickChapter = () => {
    const StoryId = storyID.id
    window.location.href = `/chapter/?storyId=${StoryId}`
    console.log(StoryId)
  }
  return (
    <div
      className={`flex justify-center items-center fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-50 ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className="flex gap-[100px] z-20">
        <motion.div
          ref={modalRefs[0]}
          key={`story-modal-${nextModalKey}`}
          className={`flex flex-col w-[420px] h-[670px] z-1`}
          initial={{
            opacity: isCreateModalOpen ? 1 : 0,
            scale: 1,
            y: isCreateModalOpen ? 0 : 80,
            rotateY: isCreateModalOpen ? 0 : 500,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            rotateY: 0,
            transition: isCreateModalOpen
              ? {}
              : {
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
          transition={{ duration: 1 }}
        >
          <div className="relative flex gap-[15px] w-full h-[55px] justify-center items-center pt-[8px] bg-blue-800 border-2 border-b-0 border-gray-400 text-green-400 text-[33px] font-Minecraft">
            {story && <BookmarkBtn id={story.id} />}
            <span>
              PAGE <span className="text-white">{storyID.page}</span>{' '}
            </span>
            <div className="text-gray-400 text-[14px] absolute bottom-[8px] right-[32px]">
              @{' '}
              {story?.userNickname.split('#')[0]
                ? `${story.userNickname.split('#')[0]}`
                : 'LOADING...'}
            </div>
          </div>
          <div className="flex flex-col w-full h-[615px] justify-center items-center gap-[16px] bg-[#000000ae] text-white border-2 border-gray-400 ">
            <Image
              className="block w-[350px] bg-gray-500"
              style={{
                filter: 'drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.615))',
              }}
              src={story?.imageUrl ? `${story.imageUrl}` : ''}
              alt="Image"
              width={350}
              height={350}
            />
            <div className="flex flex-col items-center w-[330px] gap-[10px]">
              <div className="w-[350px] h-[155px] p-[10px] border-dashed border-2 border-gray-500 bg-black">
                {story?.content ? `${story.content}` : 'LOADING...'}
              </div>
            </div>
            <div className="flex justify-between gap-[20px] w-[330px]">
              <button
                onClick={onClose}
                className="flex w-[60px] h-[30px] justify-center items-center bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[20px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600"
              >
                <p className="pt-[4px]">OK</p>
              </button>
              <button
                onClick={handleClickChapter}
                className="flex w-[120px] h-[30px] justify-center items-center bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[20px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600"
              >
                <p className="pt-[4px]">CHAPTER</p>
              </button>
            </div>
          </div>
        </motion.div>
        <div className="flex flex-col justify-center gap-[80px] z-1">
          {/* NEXT Story Modal1 */}
          {/* {story?.childId && story.childId[0] !== -1 && ( */}
          {story?.childId && story.childId[0] && (
            <motion.div
              onClick={() => {
                if (isAnimationComplete1) {
                  // 애니메이션이 완료된 상태에서만 클릭 이벤트 처리
                  setIsAnimationComplete1(false)
                  handleClickStory(
                    story?.childId && story.childId[0]
                      ? Number(story.childId[0])
                      : -1,
                    storyID.page + 1,
                  )
                  setNextModalKey((prevKey) => prevKey + 1)
                }
              }}
              className={`flex gap-[40px]`}
              style={{
                opacity: isCreateModalOpen ? 0 : 1,
              }}
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{
                opacity: isAnimationComplete1 && !isCreateModalOpen ? 1 : 0,
                scale: isAnimationComplete1 ? 1 : 1.2,
              }}
              whileHover={{ scale: 1.1, transition: { duration: 0.4 } }}
              transition={{ duration: 0.6 }}
              onAnimationComplete={() => {
                setIsAnimationComplete1(true)
              }}
            >
              <Image
                className="w-[60px] h-[60px]"
                src="/hand.svg"
                alt="hand"
                width={60}
                height={60}
              />
              <div
                ref={modalRefs[1]}
                className="flex flex-col w-[370px] h-[235px] z-1"
              >
                <div className="flex gap-[15px] w-full h-[40px] justify-center items-center pt-[8px] bg-blue-800 border-2 border-b-0 border-gray-400 text-green-400 hover:bg-green-400 hover:text-blue-800 text-[23px] font-Minecraft">
                  NEXT
                </div>
                <div className="flex flex-col w-full h-[220px] justify-center items-center bg-[#000000ae] text-white border-2 border-gray-400 ">
                  <div className="w-[330px] h-[155px] p-[10px] border-dashed border-2 bg-black border-gray-500">
                    {story?.childContent && story.childContent[0] ? (
                      <p>{story.childContent[0]}</p>
                    ) : (
                      <span className="flex justify-center leading-[8rem] text-gray-400 hover:text-white hover:scale-110">
                        새로운 이야기를 만들어보세요 !
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* NEXT Story Modal2 */}
          <motion.div
            onClick={() => {
              if (isAnimationComplete2) {
                handleClickStory(
                  story?.childId && story.childId[1]
                    ? Number(story.childId[1])
                    : -1,
                  storyID.page + 1,
                )
                setNextModalKey((prevKey) => prevKey + 1)
              }
            }}
            className={`flex gap-[40px]`}
            style={{
              opacity: isCreateModalOpen ? 0 : 1,
            }}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{
              opacity: isAnimationComplete2 && !isCreateModalOpen ? 1 : 0,
              scale: isAnimationComplete2 ? 1 : 1.2,
            }}
            whileHover={{ scale: 1.1, transition: { duration: 0.4 } }}
            transition={{ duration: 0.6 }}
            onAnimationComplete={() => {
              setIsAnimationComplete2(true)
            }}
          >
            <Image
              className="w-[60px] h-[60px]"
              src="/hand.svg"
              alt="hand"
              width={60}
              height={60}
            />
            <div
              ref={modalRefs[2]}
              className="flex flex-col w-[370px] h-[235px] z-1"
            >
              <div className="flex gap-[15px] w-full h-[40px] justify-center items-center pt-[8px] bg-blue-800 border-2 border-b-0 border-gray-400 text-green-400 hover:bg-green-400 hover:text-blue-800 text-[23px] font-Minecraft">
                NEXT
              </div>
              <div className="flex flex-col w-full h-[220px] justify-center items-center bg-[#000000ae] text-white border-2 border-gray-400 ">
                <div className="w-[330px] h-[155px] p-[10px] border-dashed border-2 border-gray-500 bg-black hover:text-white ">
                  {story?.childContent && story.childContent[1] ? (
                    <p>{story.childContent[1]}</p>
                  ) : (
                    <span className="flex justify-center leading-[8rem] text-gray-400 hover:text-white hover:scale-110">
                      새로운 이야기를 만들어보세요 !
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default StoryModal
