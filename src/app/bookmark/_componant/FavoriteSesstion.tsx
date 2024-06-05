import Image from 'next/image'
import Star from '@/../public/star.png'
export default function FavoriteSession() {
  return (
    <div className="flex flex-col justify-center items-center border w-[650px] h-10 border-white rounded-2xl bg-white bg-opacity-10 ">
      <p className="text-2xl text-green-400">Favorite</p>
      <Image className="absolute h-5 w-[30rem]" src={Star} alt="star" />
    </div>
  )
}
