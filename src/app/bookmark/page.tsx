import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../_components/Navbar'
import ViewSession from './_componant/ViewSession'
import FavoriteSession from './_componant/FavoriteSesstion'
import Nicknameheader from '../mypage/_component/Nicknameheader'
import RightSesstion from './_componant/RightSesstion'

export default function bookmark() {
  return (
    <div className="fixed h-screen w-screen">
      <Navbar />
      <div className="mt-10">
        <Nicknameheader />
        <div className="flex justify-center gap-16 px-10 my-2">
          <FavoriteSession />
          <ViewSession />
          <div className="flex flex-col items-center text-white">
            <p className="text-center mb-4">스토리 목록</p>
            <RightSesstion />
          </div>
        </div>
        <Link
          href="/main"
          className="flex justify-center text-white hover:underline"
        >
          스토리 작성하러 가기
        </Link>
      </div>
    </div>
  )
}
