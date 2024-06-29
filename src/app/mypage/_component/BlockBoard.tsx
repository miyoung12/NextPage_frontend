'use client'
import Plus from './Plus'
import Block from './Block'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface BlockProps {
  content: string
  imageUrl: string
}

export default function BlockBoard() {
  const [data, setData] = useState<BlockProps[]>([])
  const [page, setPage] = useState(1) //스크롤이 닿았을 때 새롭게 데이터 페이지를 바꿀 state
  const [hasMore, setHasMore] = useState(true) //더 가져올 데이터가 있는지? 데이터가 다 로드된 후 무한 스크롤이 멈추도록
  const [isLoading, setIsLoading] = useState(false) // 데이터 로딩 중인지 여부를 나타내는 상태
  // const loader = useRef<HTMLDivElement | null>(null) //무한 스크롤을 트리거하는 요소에 대한 참조

  const fetchData = async (page: number) => {
    const token = localStorage.getItem('a')
    setIsLoading(true)
    try {
      const response = await fetch(`api/v2/mypage/mystories?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const newData = await response.json()
      if (newData.data.length === 0) {
        setHasMore(false) // 더 이상 데이터가 없으면 hasMore를 false로 설정
      } else {
        setData((prevData) => [...prevData, ...newData.data])
        // setIsLoading(true)
      }
    } catch (error) {
      console.error('Error:', error) // 에러 처리
      setHasMore(false) // 에러 발생 시 hasMore를 false로 설정
    } finally {
      setIsLoading(false) // 데이터 로드가 끝난 후 로딩 상태 해제
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [page]) //이게 없으면 무한히 안됨

  const { ref } = useInView({
    threshold: 1.0,
    onChange: (inView) => {
      if (inView && hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1)
      }
    },
  })

  return (
    <div className="flex flex-col items-center border rounded-[10px] w-[960px] h-[576px] overflow-auto border-white">
      <div className="grid grid-cols-5">
        {data.map((item, index) => (
          <Block
            key={index}
            content={item.content}
            imageUrl={item.imageUrl}
            priority={index === 0}
          />
        ))}
        <Plus />
      </div>
      {hasMore && !isLoading && <div ref={ref} />}
    </div>
  )
}
