import Image from 'next/image'
import GoButton from './GoButton'

export default function ViewSession() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center items-center border w-72 h-10 border-white rounded-2xl bg-white bg-opacity-10">
        <p className="text-2xl text-green-400">PAGE</p>
      </div>
      <Image src="/img13.png" alt="test" height={288} width={288} />
      <div className="text-white text-sm w-72 min-h-24 p-2 border-dashed border-2 border-gray-500 bg-black">
        개발 중 입니다.
      </div>
      <div className="flex justify-center w-72 h-[30px] ">
        <GoButton />
      </div>
    </div>
  )
}
