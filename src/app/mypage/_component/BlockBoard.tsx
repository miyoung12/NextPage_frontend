'use client'
import Plus from './Plus'
import Block from './Block'
import { useEffect, useState } from 'react'

interface BlockProps {
  content: string
  imageUrl: string
}

export default function BlockBoard() {
  const [data, setData] = useState<BlockProps[] | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('a')
    fetch('/api/v2/mypage/mystories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        console.log('성공!!!!!')
        return response.json()
      })
      .then((data) => {
        console.log('성공!!!!!')
        console.log(data)
        setData(data.data)
      })
      .catch((error) => {
        console.error('Error:', error) // 에러 처리
      })
  }, [])

  return (
    <div className="fixed flex flex-col justify-center items-center border w-[768px] h-auto border-white">
      <div className="grid grid-cols-4">
        {data &&
          data.map((item, index) => (
            <Block
              key={index}
              content={item.content}
              imageUrl={item.imageUrl}
            />
          ))}
        {data &&
          data.length < 12 &&
          Array.from({ length: 12 - data.length }, (_, index) => (
            <Plus key={index} />
          ))}
      </div>
    </div>
  )
}
