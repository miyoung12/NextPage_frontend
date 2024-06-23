import Image from 'next/image'
import Background from '../_components/Background'
import Navbar from '../_components/Navbar'
import Star from '../../../public/star.png'
import BlockBorad from './_component/BlockBoard'
import Nicknameheader from './_component/Nicknameheader'

export default function Mypage() {
  return (
    <div>
      <div className="fixed flex flex-col justify-center items-center w-full">
        <Navbar />
        <Nicknameheader />
        <div className="flex flex-col justify-center items-center border rounded-[10px] w-[960px] h-[56px] mt-10 mb-2 border-white rounded2xl bg-white bg-opacity-10 ">
          <p className="text-4xl text-green-400 pt-[5px]">My Story</p>
          <Image
            className="absolute h-[2rem] w-[45rem]"
            src={Star}
            alt="star"
            priority
          />
        </div>
        <div className="flex flex-col w-[100vw] justify-center items-center mt-[10px]">
          {/* <div className="flex flex-col items-center"> */}
          <BlockBorad />
          {/* <div className="h-full absolute overflow-y-aut"></div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}
