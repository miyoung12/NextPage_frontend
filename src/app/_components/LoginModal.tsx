'use client'
import React, { useState } from 'react'
import Background from './Background'
import jwt from 'jsonwebtoken'
import { useUserStore } from '@/stores/useUserStore'
import { useRouter } from 'next/navigation'

const LoginModal: React.FC = () => {
  const router = useRouter()
  const { nickname, setNickname } = useUserStore()
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value)
  }
  const searchParams = new URLSearchParams(window.location.search)
  const email = searchParams.get('e')
  console.log(email)
  const handleSubmit = () => {
    if (email !== null) {
      localStorage.setItem('e', email)
    }
    setNickname(nickname)
    console.log(email)
    console.log(nickname)
    router.replace('/')

    // POST 요청 보내기
    fetch('http://localhost:8080/api/v2/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname, email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        console.log(data) // POST 요청에 대한 응답 처리
      })
      .catch((error) => {
        console.error('Error:', error) // 에러 처리
      })
  }

  return (
    // <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50`}>
    <>
      <div className="fixed">{/* <Background /> */}</div>
      <div className="flex flex-col w-[600px] h-[350px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 overflow-hidden">
        <div className="flex w-full h-[8vh] justify-center items-center pt-[8px] bg-blue-800 border-2 border-white text-green-400 text-[33px] font-Minecraft">
          WELCOME
        </div>
        <div className="flex flex-col w-full h-[90vh] justify-center items-center gap-[30px] bg-black border-2 text-white">
          <div className="text-2xl text-white">닉네임을 입력하세요</div>
          <input
            type="text"
            className="flex text-xl w-1/2 h-[35px] justify-center items-center text-center text-black font-Minecraft border-2 border-white"
            placeholder="Input Text"
            value={nickname}
            onChange={handleInputChange}
          />
          <button
            className="flex w-[50px] justify-center items-center mt-[20px] bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[20px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600"
            onClick={handleSubmit}
          >
            OK
          </button>
        </div>
      </div>
    </>
    // </div>
  )
}

export default LoginModal
