'use client'
import Plus from './Plus'
import Block from './Block'
import { useEffect, useState, useRef } from 'react'

interface BlockProps {
  content: string
  imageUrl: string
}

export default function BlockBoard() {
  const [data, setData] = useState<BlockProps[]>([])
  const [page, setPage] = useState(1) //현재 페이지 정보 저장
  const [hasMore, setHasMore] = useState(true) //더 가져올 데이터가 있는지?
  const loader = useRef<HTMLDivElement | null>(null) //무한 스크롤을 트리거하는 요소에 대한 참조

  const fetchData = (page: number) => {
    const token = localStorage.getItem('a')
    fetch(`/api/v2/mypage/mystories?page=${page}`, {
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
        return response.json()
      })
      // .then((newData) => {
      //   setData((prevData) => [...prevData, ...newData.data])
      //   setHasMore(newData.data.length > 0) // 더 이상 데이터가 없는 경우 hasMore를 false로 설정
      // })
      .then((newData) => {
        if (newData.data.length === 0) {
          setHasMore(false) // 더 이상 데이터가 없으면 hasMore를 false로 설정
        } else {
          setData((prevData) => [...prevData, ...newData.data])
        }
      })
      .catch((error) => {
        console.error('Error:', error) // 에러 처리
      })
  }

  useEffect(() => {
    //loader 요소가 뷰포트에 들어올 때마다 페이지 번호를 증가시킴
    //   fetchData(page)
    // }, [page])

    if (hasMore) {
      fetchData(page)
    }
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }

        console.log(entries)
      },
      { threshold: 1.0 },
    )

    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current)
      }
    }
  }, [hasMore])

  return (
    <div className="flex flex-col justify-center items-center border w-[768px] h-[600px] overflow-auto border-white pb-[214px]">
      <div className="grid grid-cols-4">
        {data.map((item, index) => (
          <Block key={index} content={item.content} imageUrl={item.imageUrl} />
        ))}
        {/* {data.length < 12 &&
          Array.from({ length: 12 - data.length }, (_, index) => (
            <Plus key={index} />
          ))} */}
        <Plus />
      </div>
      {hasMore && <div ref={loader} className="h-5" />}
    </div>
  )
}
