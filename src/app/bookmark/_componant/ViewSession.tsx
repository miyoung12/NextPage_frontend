'use client'
import Image from 'next/image'
import GoButton from './GoButton'
import useBookMark from '@/stores/useBookMark'

export default function ViewSession() {
  const { favImageUrl, favContent } = useBookMark()
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center items-center border w-72 h-10 border-white  bg-white bg-opacity-10">
        <p className="text-2xl text-green-400">PAGE</p>
      </div>
      {favContent && favImageUrl ? (
        <div>
          <Image src={favImageUrl} alt="test" height={288} width={288} />
          <div className="mt-4 text-white text-sm w-72 min-h-24 bg-opacity-20 p-2 border-dashed border-2 border-gray-500 bg-black">
            {favContent}
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-gray-400 w-72 h-72 flex justify-center items-center bg-opacity-20">
            Click on the Left!
          </div>
          <div className="mt-4 text-white text-sm w-72 min-h-24 p-2 border-dashed border-2 bg-opacity-20 border-gray-500 bg-black">
            Favorite 에서 골라주세요!
          </div>
        </div>
      )}
      <div className="flex justify-center w-72 h-[30px] ">
        <GoButton />
      </div>
    </div>
  )
}
