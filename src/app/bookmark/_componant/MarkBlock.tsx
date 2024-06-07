'use client'
import Image from 'next/image'
import useBookMark from '@/stores/useBookMark'

interface favprops {
  imageUrl: string
  content: string
}

export default function MarkBlock({ imageUrl, content }: favprops) {
  const { updateBookMark } = useBookMark()
  const handleClick = () => {
    updateBookMark(imageUrl, content)
    console.log('url : ', imageUrl)
    console.log('내용 : ', content)
  }
  return (
    <div className="flex justify-center items-center w-52 h-52 border border-white">
      <Image
        src={imageUrl}
        alt="test"
        width={170}
        height={170}
        onClick={handleClick}
      />
    </div>
  )
}
