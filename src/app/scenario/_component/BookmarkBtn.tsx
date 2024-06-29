'use client'
import useRightStory from '@/stores/useRightStory'
import { useState, useEffect } from 'react'
import { GoBookmark, GoBookmarkFill } from 'react-icons/go'

interface BookmarkBtnProps {
  id: number
}

const BookmarkBtn: React.FC<BookmarkBtnProps> = ({ id }) => {
  const [bookmark, setBookmark] = useState(false)
  const { bookStroy } = useRightStory()
  const token = localStorage.getItem('a')
  const handleClickBookmarkOnOff = () => {
    setBookmark(!bookmark)
    if (bookmark) {
      console.log('delete', bookStroy)
      fetch(`api/v2/mypage/bookmarks/${bookStroy}`, {
        method: 'DELETE',
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
          console.log(data)
        })
        .catch((error) => {
          console.error('Error:', error) // 에러 처리
        })
    } else {
      console.log('delete', bookStroy)
      fetch(`api/v2/mypage/bookmarks/${bookStroy}`, {
        method: 'POST',
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
          console.log(data)
        })
        .catch((error) => {
          console.error('Error:', error) // 에러 처리
        })
    }
  }
  useEffect(() => {
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
        console.log('북마크카크', data.data)
        console.log('스토리아이디 : ', id)
        console.log('크기: ', data.data.length)
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].storyId === id) {
            console.log('완료 : ', bookmark)
            setBookmark(!bookmark)
          }
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  return (
    <div onClick={handleClickBookmarkOnOff}>
      <div className="absolute bottom-[8px] left-[24px]  text-white">
        {bookmark ? <GoBookmarkFill /> : <GoBookmark />}
      </div>
    </div>
  )
}

export default BookmarkBtn
