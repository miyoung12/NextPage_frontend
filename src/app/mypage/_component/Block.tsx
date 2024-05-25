'use client'
import Image from 'next/image'
import MyStroyModal from './MyStroyModal'
import { useState } from 'react'

interface BlockProps {
  content: string
  imageUrl: string
}

export default function Block({ imageUrl, content }: BlockProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const closeModal = () => {
    setModalOpen(false)
    setStories(stories)
  }
  const [stories, setStories] = useState<
    Array<{
      content: string
      imageUrl: string
    }>
  >([])
  const HandleBlock = () => {
    setModalOpen(true)
  }
  return (
    <div className="w-[12rem] h-[12rem] border-b-[1px] border-r-[1px] flex justify-center items-center">
      {modalOpen && (
        <MyStroyModal
          isOpen={modalOpen}
          closeModal={closeModal}
          imageUrl={imageUrl}
          content={content}
        />
      )}
      <Image
        src={imageUrl}
        alt="이미지_설명"
        onClick={HandleBlock}
        className="rounded-lg"
        width={160}
        height={160}
      />
    </div>
  )
}
