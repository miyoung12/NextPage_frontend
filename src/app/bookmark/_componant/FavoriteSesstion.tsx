import Image from 'next/image'
import Star from '@/../public/star.png'
import FavoritBoard from './FavoritBoard'

export default function FavoriteSession() {
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center border w-[624px] h-10 mb-4 border-white bg-white bg-opacity-10 ">
        <p className="absolute text-2xl text-green-400">Favorite</p>
        <Image className="absolute h-5 w-[30rem]" src={Star} alt="star" />
      </div>
      <FavoritBoard />
    </div>
  )
}
