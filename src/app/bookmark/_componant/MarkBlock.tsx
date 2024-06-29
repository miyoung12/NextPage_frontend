'use client'
import Image from 'next/image'
import useBookMark from '@/stores/useBookMark'
import axios from 'axios'
import useRightStory from '@/stores/useRightStory'

interface favprops {
  imageUrl: string
  storyId: number
}

export default function MarkBlock({ imageUrl, storyId }: favprops) {
  const { updateRightState } = useRightStory()
  const { updateBookMark } = useBookMark()
  const handleClick = async () => {
    updateBookMark(imageUrl, storyId)
    try {
      const response = await axios.get(`api/v2/stories/branch/${storyId}`)
      updateRightState(response.data.data)
    } catch (error) {
      console.error('Error fetching story data:', error)
    }
  }
  return (
    <div className="flex justify-center items-center w-52 h-52 border border-white">
      <Image
        src={imageUrl}
        alt="bookmark story"
        width={170}
        height={170}
        onClick={handleClick}
      />
    </div>
  )
}
