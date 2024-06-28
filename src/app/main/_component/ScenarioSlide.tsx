'use client'

import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Swiper from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import {
  EffectCoverflow,
  Mousewheel,
  Navigation,
  Pagination,
} from 'swiper/modules'
import ViewScenarioModal from '../../main/_component/ViewScenarioModal'

interface ScenarioSlideProps {
  stories: {
    id: number
    userNickname: string
    content: string
    imageUrl: string
  }[]
  modalOpen: boolean
  onSlideClick: (index: number) => void
}

const ScenarioSlide: React.FC<ScenarioSlideProps> = ({
  stories,
  onSlideClick,
}) => {
  const [rootId, setRootId] = useState<number>(0)
  const [storyOpen, setStoryOpen] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  //스토리 모달 관련 함수
  const closeStory = () => {
    setStoryOpen(false)
  }
  const openStory = () => {
    setStoryOpen(true)
  }

  const handleClickRoot = (story: {
    id: number
    userNickname: string
    content: string
    imageUrl: string
  }) => {
    console.log('story: ', story)
    setRootId(story.id)
    openStory()
    onSlideClick(stories.findIndex((s) => s.id === story.id))
  }

  useEffect(() => {
    const swiper = new Swiper('.Myswiper', {
      loop: true, // 무한 루프 활성화
      loopAdditionalSlides: 1, // 루프 추가 슬라이드 개수
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 3,
      coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      mousewheel: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index, bullet) {
          // index가 빠지면 불렛 중앙 정렬이 해제됨
          return `<div class="${bullet} border-2 bg-transparent border-green-300 rounded-full" style="width: 40px; height: 18px; opacity: 1;"></div>`
        },
      },
      on: {
        slideChange: (swiper) => {
          // 중앙에 위치한 슬라이드의 인덱스를 업데이트
          setCurrentSlideIndex(swiper.realIndex)
          // console.log(currentSlideIndex);
        },
      },
      modules: [EffectCoverflow, Navigation, Mousewheel, Pagination],
    })
    // 각 슬라이드에 클릭 이벤트 추가
    swiper.slides.forEach((slide, index) => {
      slide.addEventListener('click', () => onSlideClick(index))
    })
    return () => {
      // 컴포넌트 언마운트 시에 이벤트 리스너 제거
      swiper.slides.forEach((slide, index) => {
        slide.removeEventListener('click', () => onSlideClick(index))
      })

      swiper.destroy()
    }
  }, [stories])

  useEffect(() => {
    onSlideClick(currentSlideIndex)
  }, [currentSlideIndex])

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
          delay: 0.3,
        }}
      >
        <div className="swiper-container w-[1100px] pb-[80px] Myswiper overflow-hidden block">
          <div className="swiper-wrapper">
            {stories.map((story, index) => (
              <div
                key={index}
                className="swiper-slide w-[400px] flex bg-center object-cover"
                onClick={() => handleClickRoot(story)}
              >
                <Image
                  className="w-full"
                  src={story.imageUrl}
                  // src={test}
                  alt={`슬라이드${index + 1}`}
                  style={{
                    filter:
                      'drop-shadow(7px 1px 8px rgba(255, 252, 234, 0.759))',
                    display: 'block',
                    width: 'full',
                  }}
                  width={400}
                  height={400}
                />
              </div>
            ))}
          </div>
          <div className="swiper-pagination bullet "></div>
        </div>
        {storyOpen && (
          <ViewScenarioModal
            isOpen={storyOpen}
            closeStory={closeStory}
            rootId={rootId}
          />
        )}
      </motion.div>
    </div>
  )
}
export default ScenarioSlide
