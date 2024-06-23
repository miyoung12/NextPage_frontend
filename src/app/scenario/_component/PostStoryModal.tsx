import React, { useRef, useEffect, useState, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import Carousel from '../../../app/_components/ImgCarousel'
import Lottie from 'lottie-react'
import lottieData from '../../../../public/lottie.json'

interface PostStoryModalProps {
  // parentStoryID: number
  parentStoryID: number | null
  isOpen: boolean
  closeModal: () => void
  isCreateModalOpen: boolean
  scenarioAPI: () => void
}

const PostStoryModal: React.FC<PostStoryModalProps> = ({
  parentStoryID,
  isOpen,
  closeModal,
  isCreateModalOpen,
  scenarioAPI,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  //   const userId = useRecoilValue(userState).user_id;
  const [parentId, setParentId] = useState()
  const [content, setContentValue] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [characterCount, setCharacterCount] = useState<number>(0)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [isGenerating, setIsGenerating] = useState(false) // Lottie를 트리거
  const [generationCount, setGenerationCount] = useState<number>(0)
  const [isHovered, setIsHovered] = useState(false) // 안내 메시지

  const errorEvent = (error: any) => {
    if (error.request.status >= 500) {
      console.log('status: ', error.request.status)
      alert('네트워크 연결이 불안정합니다.')
      setIsGenerating(false) // Lottie 보여주기 중지
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  // Lottie 애니메이션 완료 시 호출되는 콜백
  const handleLottieComplete = () => {
    setIsGenerating(false) // Lottie 숨기기
  }

  // 모달 외부를 클릭했을 때 모달을 닫도록 하는 이벤트 처리
  const handleBackgroundClick = (e: MouseEvent) => {
    // 배경 클릭 시 모달 닫기\
    if (
      isOpen &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node) &&
      !isGenerating
    )
      if (!isCreateModalOpen) {
        closeModal()
      }
  }

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value

    // 입력을 100글자로 제한
    if (inputValue.length <= 100) {
      setContentValue(inputValue)
      setCharacterCount(inputValue.length)
      // console.log(characterCount);
    }
  }
  const handleClick = () => {
    if (generationCount < 3) {
      CreateScenario() // 이미지 생성 요청
      // setIsGenerating(true); // Lottie 보여주기 시작
      setGenerationCount((count) => count)
    } else {
      alert('이미지 생성 요청은 최대 3회까지 가능합니다.')
    }
  }

  const handleCurrentIndexChange = (index: number) => {
    setCurrentImageIndex(index)
    // currentIndex를 활용한 로직을 추가하세요.
  }
  const CreateScenario = async () => {
    try {
      if (!content.trim()) {
        // content가 공백인 경우 400에러 방지
        console.log('문장을 입력하세요!')
        alert('문장을 입력하세요!')
      } else {
        setIsGenerating(true) // Lottie 보여주기 시작
        const response = await fetch('/api/v2/stories/images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: content }),
        })
        if (response.ok) {
          const data = await response.json()
          const newImageUrl = data.data
          console.log('newImageUrl: ', newImageUrl)

          if (newImageUrl !== undefined) {
            console.log('이미지 조회 성공!')
            // 이전에 생성한 이미지 배열에 추가
            setImages((prevImages) => [...prevImages, newImageUrl])

            setGenerationCount((count) => count + 1) // 횟수 1 감소
            setIsGenerating(false) // Lottie 숨기기

            setContentValue(content)
            setCurrentImageIndex(0)
          } else {
            alert('적절하지 못한 내용입니다. 다시 입력해주세요.')
            setIsGenerating(false) // Lottie 숨기기
          }
        }

        // 응답이 성공적인 경우 상태 업데이트
        setContentValue(content)
        setCurrentImageIndex(0)
      }
    } catch (error) {
      console.error('이미지 생성 요청 중 에러: ', error)
      errorEvent(error)
    }
  }

  const handleClickSave = async () => {
    const selectedImageUrl = images[currentImageIndex] || ''
    // Ok 버튼 클릭 시 /api/v1/stories/ 요청
    setIsGenerating(true) // Lottie 보여주기 시작
    // 토큰 가져오기
    const token = localStorage.getItem('a')
    try {
      console.log(parentStoryID)
      const response = await fetch(`/api/v2/stories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          parentId: parentStoryID,
          imageUrl: selectedImageUrl,
          content: content,
        }),
      })

      // 성공적으로 응답을 받았을 때 처리
      if (response.ok) {
        console.log('스토리 생성 성공')
        closeModal()
        scenarioAPI()
      }
    } catch (error) {
      console.error('스토리 생성 중 에러 발생:', error)
      errorEvent(error)
    } finally {
      setIsGenerating(false) // Lottie 숨기기
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
  }, [isOpen, isGenerating])

  return (
    <div
      className={`flex justify-start items-center fixed top-0 pl-[55px] right-[-50%] w-[100vw] h-[100vh] ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <motion.div
        ref={modalRef}
        className={`z-100 flex flex-col w-[440px] h-[670px]`}
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
          NEXT PAGE
        </div>
        <div className="relative flex flex-col w-full h-full justify-center items-center gap-[17px] bg-[#000000ae] border-2 border-t-0 border-white text-white">
          {isGenerating && (
            <div className="absolute z-50 gap-[10px] p-[70px] bg-gray-500 bg-opacity-50 w-full h-[615px]">
              <Lottie
                animationData={lottieData}
                onComplete={handleLottieComplete}
              />
            </div>
          )}
          <svg
            className="h-[20px] absolute right-[13px] top-[24px] text-white hover:text-green-400"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
          <div
            className="w-[185px] absolute z-20 top-[45px] right-[15px] text-[13px] bg-[#3e4646c0] text-green-400 p-2 text-left"
            style={{ display: isHovered ? 'block' : 'none' }}
          >
            장면을 자세히 묘사하면
            <br />
            그림의 정확도가 올라갑니다!
            <br />
            (인물, 상황, 장소, 기분 등)
          </div>
          <div className="flex flex-col justify-center items-center w-[350px] h-full">
            <div className="flex flex-col gap-1">
              <div className="w-[350px] h-[350px] z-10 bg-[#6f7373]">
                {images && (
                  <Carousel
                    images={images}
                    onCurrentIndexChange={handleCurrentIndexChange}
                  />
                )}
              </div>
              <div className="flex justify-center text-green-400 text-[12px] leading-[20px]">
                {images.length ? currentImageIndex + 1 : 0}
                <span className="text-white">
                  {' '}
                  &nbsp; / &nbsp; {images.length}
                </span>
              </div>
              <div className="flex flex-col gap-1 items-end text-white">
                <textarea
                  placeholder="Write your next page!"
                  className="focus:outline-none font-['DungGeunMo'] w-[350px] h-[140px] p-[7px] border-dashed border-2 border-gray-500 bg-black focus:border-white"
                  value={content}
                  onChange={handleContentChange}
                  maxLength={100}
                  style={{ resize: 'none' }}
                ></textarea>
                <span className="text-[11px]">
                  {characterCount}/{100}
                </span>
              </div>
              <div className="flex justify-between gap-3 w-[350px] h-[30px]">
                <button
                  className="relative w-[250px] text-center text-[18px] bg-green-400 border-2 border-gray-500 text-black hover:bg-blue-600 hover:text-white hover:shadow-blue-600"
                  onClick={handleClick}
                >
                  <span className="pr-[10px]">Create image &nbsp;</span>
                  <span className="absolute bottom-[5px] right-[5px] font-['DungGeunMo'] text-[11px] text-gray-600">
                    ({3 - generationCount}회 남음)
                  </span>
                </button>
                <button
                  className="w-[100px] text-center pt-[1px] bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[18px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600"
                  onClick={handleClickSave}
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
export default PostStoryModal
