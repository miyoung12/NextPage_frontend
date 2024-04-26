'use client'

import React from 'react'
import Image from 'next/image'
// import google from '../../../public/google.png'
// import naver from '../../../public/naver.png'
import Link from 'next/link'

const SignupModal: React.FC = () => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 $
      }`}
    >
      <div className="flex flex-col w-[600px] h-[350px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 overflow-hidden">
        <div className="flex w-full h-[8vh] justify-center items-center pt-[8px] bg-blue-800 border-2 border-white text-green-400 text-[33px] font-Minecraft">
          WELCOME
        </div>
        <div className="flex flex-col w-full h-[90vh] justify-center items-center gap-[30px] bg-black border-2 text-white">
          <Link href="http://localhost:8080/oauth2/authorization/google">
            <button className="flex text-4xl w-[30rem] h-[60px] justify-center items-center text-center text-white font-Minecraft border-2 border-white">
              <Image
                src="/google.png"
                alt="google"
                className="mr-10"
                width={50}
                height={50}
              />
              Login with Google
            </button>
          </Link>
          <Link href="http://localhost:8080/oauth2/authorization/naver">
            <button className="flex text-4xl w-[30rem] h-[60px] justify-center items-center text-center text-white font-Minecraft border-2 border-white">
              <Image
                src="/naver.png"
                alt="naver"
                className="mr-10"
                width={50}
                height={50}
              />
              Login with Naver
            </button>
          </Link>
          {/* <button className="flex w-[40px] justify-center items-center bg-zinc-300 border-2 border-gray-500 font-Minecraft font-bold text-black text-[20px] hover:bg-blue-600 hover:text-green-400 hover:shadow-blue-600">
            x
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default SignupModal
