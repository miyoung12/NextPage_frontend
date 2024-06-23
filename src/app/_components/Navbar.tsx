'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import jwt from 'jsonwebtoken'
import { useUserStore } from '@/stores/useUserStore'
import { IoBookmarkOutline } from 'react-icons/io5'
import { IoMdBook } from 'react-icons/io'

const Navbar = () => {
  const router = useRouter()
  const [decodedUserToken, setDecodedUserToken] = useState<{
    name: string
  } | null>(null)
  const { nickname } = useUserStore()
  const modifiedNickname = nickname.split('#')[0]
  const [onLogOut, setOnLogOut] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleNavigate = () => {
    // '/landingpage'로 페이지 이동
    router.push('/')
  }

  const handleLogOutModal = () => {
    setOnLogOut(true)
  }

  const handleClickLogOut = () => {
    localStorage.clear()
    router.push('/')
  }

  const handleClickMyPage = () => {
    router.push('/mypage')
  }

  const handleClickBookMark = () => {
    router.push('/bookmark')
  }

  useEffect(() => {
    const localStorageUsertoken = localStorage.getItem('a')
    const decodedUserToken = jwt.decode(localStorageUsertoken ?? '') as {
      name: string
    } | null
    setDecodedUserToken(decodedUserToken)
  }, [])

  return (
    <div className="flex w-full h-[60px] px-[30px] my-[9px] justify-between items-center">
      <button
        className="text-[25px] font-Minecraft text-white"
        onClick={handleNavigate}
      >
        <span>
          <span className="text-blue-600">N</span>ext-
          <span className="text-green-400">P</span>age
        </span>
      </button>
      <div className="text-white cursor-pointer">
        {decodedUserToken ? (
          <div className="relative">
            <span className="text-white">
              <span
                onClick={handleLogOutModal}
                className="text-green-400 hover:text-blue-600"
              >
                {modifiedNickname}
              </span>
              님 환영합니다!
            </span>
            {onLogOut && (
              <div
                ref={modalRef}
                className="flex flex-col items-first gap-[5px] absolute left-0 top-[30px] p-[5px] bg-white text-black z-10 "
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.324))',
                }}
              >
                <div className="flex gap-[5px] hover:text-blue-600">
                  <svg
                    className="w-[10px] "
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
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                  <div onClick={handleClickLogOut} className="text-[10px]">
                    Log Out
                  </div>
                </div>
                <div className="flex gap-[5px] hover:text-blue-600">
                  <svg
                    className="w-[10px] "
                    data-slot="icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 22 22"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 3H13V4H14V5H15V9H14V10H13V11H9V10H8V9H7V5H8V4H9V3ZM10 8V9H12V8H13V6H12V5H10V6H9V8H10ZM7 12H15V13H17V14H18V15H19V19H3V15H4V14H5V13H7V12ZM6 16H5V17H17V16H16V15H14V14H8V15H6V16Z"
                      fill="black"
                    />
                  </svg>
                  <div onClick={handleClickMyPage} className="text-[10px]">
                    My page
                  </div>
                </div>
                <div className="flex gap-[5px] hover:text-blue-600">
                  <IoBookmarkOutline className="w-3 h-3" />
                  <div onClick={handleClickBookMark} className="text-[10px]">
                    Bookmark
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <span
            onClick={handleNavigate}
            className="text-gray-400 hover:text-gray-100"
          >
            Log In
          </span>
        )}
      </div>
    </div>
  )
}

export default Navbar
