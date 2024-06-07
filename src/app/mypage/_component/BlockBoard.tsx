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
  const [page, setPage] = useState(1) //스크롤이 닿았을 때 새롭게 데이터 페이지를 바꿀 state
  const [hasMore, setHasMore] = useState(true) //더 가져올 데이터가 있는지? 데이터가 다 로드된 후 무한 스크롤이 멈추도록
  const [isLoading, setIsLoading] = useState(false) // 데이터 로딩 중인지 여부를 나타내는 상태
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
        setIsLoading(false) // 데이터 로드가 끝난 후 로딩 상태 해제
      })
      .catch((error) => {
        console.error('Error:', error) // 에러 처리
        setHasMore(false) // 에러 발생 시 hasMore를 false로 설정
        setIsLoading(false) // 에러 발생 시 isLoading을 false로 설정
      })
  }

  useEffect(() => {
    //loader 요소가 뷰포트에 들어올 때마다 페이지 번호를 증가시킴
    //   fetchData(page)
    // }, [page])
    if (hasMore && !isLoading) {
      fetchData(page)
    }
  }, [page, hasMore, isLoading])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => prevPage + 1)
          // 데이터를 불러오고 화면에 렌더링 되기 전까지 계속 요건을 충족하므로
          // page가 무한대로 증가하는 경우 방지
          // 기존의 target을 unobserve함으로써 page가 한 번만 증가하게끔 함
          //setHasMore(false) //**이게 있냐 없냐에 따라 무한히 스크롤이 되느냐 마느냐가 결정됨
          console.log('hello Observer')
        }
        console.log(entries) //유저의 화면에 들어왔거나 떠난 요소에 대한 정보
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
  }, [hasMore, isLoading])

  return (
    <div className="flex flex-col items-center border rounded-[10px] w-[768px] h-[576px] overflow-auto border-white">
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
      {hasMore && !isLoading && <div ref={loader} className="" />}
    </div>
  )
}
