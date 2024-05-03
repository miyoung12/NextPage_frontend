'use client'
import { useEffect, useState } from 'react'
import Background from '../_components/Background'
import Navbar from '../_components/Navbar'
import Image from 'next/image'
import Star from '../../../public/star.png'

export default function Mypage() {
  const [nickname, setNickname] = useState('')
  useEffect(() => {
    const localStorageUsertoken = localStorage.getItem('nickname-storage')
    if (localStorageUsertoken !== null) {
      const storedData = JSON.parse(localStorageUsertoken)
      const nickname = storedData.state.nickname.match(/^[^#]*/)[0]
      setNickname(nickname)
    } else {
      console.log('No nickname')
    }
  }, [])
  return (
    <div>
      <div className="fixed">
        <Background />
      </div>
      <div className="flex w-[100vw] h-[100vh] flex-col justify-center items-center absolute top-1/2 left-1/2 z-1 bg-transparent -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col w-full h-full gap-[33px]">
          <Navbar />
          <div className="flex flex-col items-center h-full">
            <div className="text-center text-white">
              {nickname}
              {`'s page`}
            </div>
            <div className="flex flex-col justify-center items-center border w-[60rem] h-[4rem] m-6 border-white rounded-2xl bg-white bg-opacity-10 ">
              <div className=" text-green-400 text-4xl ">My Story</div>
              <Image
                className="absolute h-[2rem] w-[45rem]"
                src={Star}
                alt="star"
              />
            </div>
            <div className="flex flex-col justify-center items-center border w-[60rem] h-full border-white rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
