'use client'
import Plus from '@/app/bookmark/_componant/Plus'
import { useEffect, useState } from 'react'
import MarkBlock from './MarkBlock'
import Pagination from './Pagination'

const ITEMS_PER_PAGE = 6

interface favprops {
  imageUrl: string
  content: string
  storyId: number
}

export default function FavoritBlock() {
  const [data, setData] = useState<favprops[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const token = localStorage.getItem('a')
    fetch('api/v2/mypage/bookmarks', {
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
      .then((data) => {
        setData(data.data)
        // console.log(data.data)
        setTotalPages(Math.ceil(data.data.length / ITEMS_PER_PAGE))
      })
      .catch((error) => {
        console.error('Error:', error) // 에러 처리
      })
  })

  const handleChangePage = (newPage: number) => {
    setPage(newPage)
  }

  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const selectedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border border-white">
        <div className="grid grid-cols-3">
          {selectedData.map((item, index) => (
            <MarkBlock
              key={index}
              imageUrl={item.imageUrl}
              storyId={item.storyId}
            />
          ))}
          {selectedData.length < ITEMS_PER_PAGE &&
            Array.from(
              { length: ITEMS_PER_PAGE - selectedData.length },
              (_, index) => <Plus key={index} />,
            )}
        </div>
      </div>
      <Pagination
        onChangePage={handleChangePage}
        totalPages={totalPages}
        page={page}
      />
    </div>
  )
}
