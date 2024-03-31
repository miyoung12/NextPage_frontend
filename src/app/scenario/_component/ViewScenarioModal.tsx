import React from 'react'
import axios from 'axios'
import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigator } from 'react-router-dom'
import { motion } from 'framer-motion'

interface ViewScenarioModalProps {
  isOpen: boolean
  closeStory: () => void
  storyId: number
}

const ViewScenarioModal: React.FC<ViewScenarioModalProps> = ({
  isOpen,
  closeStory,
  storyId,
}) => {
  //   const navigate = useNavigate()
  const [story, setStory] = useState<{
    // userNickname: string
    // content: string
    // image_url: string
    // childContent: string[]
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
  const [isAnimationComplete1, setIsAnimationComplete1] = useState(false)
  const [isAnimationComplete2, setIsAnimationComplete2] = useState(false)

  const handleBackgroundClick = (e: MouseEvent) => {
    // 모달 외부를 클릭했을 때 모달을 닫도록 하는 이벤트 처리
    if (
      modalRefs.every(
        (modalRef) => !modalRef.current?.contains(e.target as Node),
      )
    ) {
      closeStory()
    }
  }

  useEffect(() => {
    const ShowRootScenario = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v2/stories/details/${storyId}`,
        )
        if (response.status === 200) {
          console.log('단일 시나리오 조회')
          setStory({
            // userNickname: response.data.data.userNickname,
            // content: response.data.data.content,
            // image_url: response.data.data.image_url,
            // childContent: response.data.data.childContent,
            id: response.data.data.id,
            content: response.data.data.content,
            imageUrl: response.data.data.imageUrl,
            userNickname: response.data.data.userNickname,
            parentId: response.data.data.parentId,
            childId: response.data.data.childId,
            childContent: response.data.data.childContent,
          })
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (isOpen) {
      // isOpen이 true이고 storyId가 존재할 때에만 API 호출
      ShowRootScenario()
    }
  }, [])

  const handleOkButtonClick = () => {
    // const rootId = storyId
    // navigator(`/scenario`)
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
  }, [isOpen])

  return (
    <div
      className={`flex justify-center items-center fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-50 ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className="flex gap-[110px] z-10">
        <motion.div
          ref={modalRefs[0]}
          className={`flex flex-col w-[420px] h-[670px] z-1`}
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
          <div className="relative flex gap-[15px] w-full h-[55px] justify-center items-center pt-[8px] bg-blue-800 border-2 border-b-0 border-gray-400 text-green-400 text-[33px] font-Minecraft">
            <span>SCENARIO</span>
            <div className="text-gray-400 text-[14px] absolute bottom-[8px] right-[32px]">
              @ {story?.userNickname ? `${story.userNickname}` : 'LOADING...'}
            </div>
          </div>
          <div className="flex flex-col w-full h-[615px] justify-center items-center gap-[16px] bg-[#000000ae] text-white border-2 border-gray-400 ">
            <img
              className="block w-[350px] bg-gray-500"
              style={{
                filter: 'drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.615))',
              }}
              src={story?.imageUrl ? `${story.imageUrl}` : ''}
              alt="Image"
            />
            <div className="flex flex-col items-center w-[330px] gap-[10px]">
              <div className="w-[350px] h-[155px] p-[10px] border-dashed border-2 border-gray-500 bg-black ">
                {story?.content ? `${story.content}` : 'LOADING...'}
              </div>
            </div>
            <button
              onClick={handleOkButtonClick}
              className="flex w-[70px] h-[35px] justify-center items-center bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[20px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600"
            >
              <p className="pt-[4px]">GO !</p>
            </button>
          </div>
        </motion.div>
        <div className="flex flex-col justify-center gap-[80px] z-1">
          {/* NEXT Story Modal1 */}
          {story?.childContent && story.childContent[0] && (
            <motion.div
              className={`flex gap-[40px]`}
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{
                opacity: isAnimationComplete1 ? 1 : 0,
                scale: isAnimationComplete1 ? 1 : 1.2,
              }}
              // whileHover={{ scale: 1.1, transition: { duration: 0.4 } }}
              transition={{ duration: 0.6 }}
              onAnimationComplete={() => {
                setIsAnimationComplete1(true)
              }}
            >
              {/* <img className="w-[60px] h-[60px]" src="/asset/hand.svg" alt="" /> */}
              <div
                ref={modalRefs[1]}
                className="flex flex-col w-[370px] h-[235px] z-1"
              >
                <div className="flex gap-[15px] w-full h-[40px] justify-center items-center pt-[8px] bg-blue-800 border-2 border-b-0 border-gray-400 text-green-400 text-[23px] font-Minecraft">
                  PREVIEW
                </div>
                <div className="flex flex-col w-full h-[220px] justify-center items-center bg-[#000000ae] text-white border-2 border-gray-400 ">
                  <div className="w-[330px] h-[155px] p-[10px] border-dashed border-2 border-gray-500 bg-black">
                    {story?.childContent && story.childContent[0] ? (
                      <p>{story.childContent[0]}</p>
                    ) : (
                      <span className="flex justify-center pt-[40px] text-center text-gray-400 hover:text-white hover:scale-110">
                        GO ! 버튼을 클릭해
                        <br />
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
            className={`flex gap-[40px]`}
            style={{
              opacity: isOpen ? 0 : 1,
            }}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{
              opacity: isAnimationComplete2 ? 1 : 0,
              scale: isAnimationComplete2 ? 1 : 1.2,
            }}
            // whileHover={{ scale: 1.1, transition: { duration: 0.4 } }}
            transition={{ duration: 0.6 }}
            onAnimationComplete={() => {
              setIsAnimationComplete2(true)
            }}
          >
            {/* <img className="w-[60px] h-[60px]" src="/asset/hand.svg" alt="" /> */}
            <div
              ref={modalRefs[2]}
              className="flex flex-col w-[370px] h-[235px] z-1"
            >
              <div className="flex gap-[15px] w-full h-[40px] justify-center items-center pt-[8px] bg-blue-800 border-2 border-b-0 border-gray-400 text-green-400 text-[23px] font-Minecraft">
                PREVIEW
              </div>
              <div className="flex flex-col w-full h-[220px] justify-center items-center bg-[#000000ae] text-white border-2 border-gray-400 ">
                <div className="w-[330px] h-[155px] p-[10px] border-dashed border-2 border-gray-500 bg-black hover:text-white ">
                  {story?.childContent && story.childContent[1] ? (
                    <p>{story.childContent[1]}</p>
                  ) : (
                    <span className="flex justify-center pt-[40px] text-center text-gray-400">
                      GO ! 버튼을 클릭해
                      <br />
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

export default ViewScenarioModal
