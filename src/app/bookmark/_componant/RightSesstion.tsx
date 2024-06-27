'use client'
import React, { useState } from 'react'
import useRightStory from '@/stores/useRightStory'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function RightSesstion({}) {
  const { bookStroy } = useRightStory()
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  const handleClickStory = (index: number) => () => {
    router.push(`/scenario?rootId=${bookStroy[0].id}`)
  }

  // 초기값이나 타입을 확인하여 기본적으로 빈 배열로 설정
  const visibleImages = Array.isArray(bookStroy)
    ? bookStroy.slice((currentPage - 1) * 4, currentPage * 4)
    : []

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === Math.ceil(bookStroy.length / 4)

  return (
    <div className="gap-5 flex flex-col items-center h-auto justify-between">
      {bookStroy && (
        <Image
          src="/up.png"
          alt="위"
          height={10}
          width={40}
          onClick={() => {
            if (!isFirstPage) setCurrentPage(currentPage - 1)
          }}
          style={{
            opacity: isFirstPage ? 0.5 : 1,
            cursor: isFirstPage ? 'not-allowed' : 'pointer',
          }}
        />
      )}
      {visibleImages.map((item: any, index: number) => (
        <div
          key={index}
          onClick={handleClickStory((currentPage - 1) * 4 + index)}
        >
          <Image src={item.imageUrl} alt="이미지" width={80} height={80} />
        </div>
      ))}

      {bookStroy && (
        <Image
          src="/down.png"
          alt="아래"
          height={10}
          width={40}
          onClick={() => {
            if (!isLastPage) setCurrentPage(currentPage + 1)
          }}
          style={{
            opacity: isLastPage ? 0.5 : 1,
            cursor: isLastPage ? 'not-allowed' : 'pointer',
          }}
        />
      )}
    </div>
  )
}
