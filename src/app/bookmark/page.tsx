import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../_components/Navbar'
import ViewSession from './_componant/ViewSession'
import FavoriteSession from './_componant/FavoriteSesstion'
import Nicknameheader from '../mypage/_component/Nicknameheader'

export default function bookmark() {
  return (
    <div className="fixed w-screen">
      <Navbar />
      <Nicknameheader />
      <div className="flex w-full h-[500px] justify-between px-10 my-2">
        <FavoriteSession />
        <ViewSession />
        <div className="flex flex-col items-center h-56 text-white">
          <p className="text-center mb-4">스토리 목록</p>
          <div className="flex flex-col items-center h-52 justify-between">
            <Image src="/up.png" alt="up" height={10} width={40} />
            <Image src="/down.png" alt="down" height={10} width={40} />
          </div>
        </div>
      </div>
      <Link
        href="/main"
        className="flex justify-center text-white hover:underline"
      >
        스토리 작성하러 가기
      </Link>
    </div>
  )
}