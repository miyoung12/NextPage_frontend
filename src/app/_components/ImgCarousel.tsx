import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface CarouselProps {
  images: string[]
  onCurrentIndexChange: (index: number) => void
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  onCurrentIndexChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  // const [countImages, setCountImages] = useState(0); // 추가

  // useEffect를 사용하여 images가 업데이트될 때마다 currentIndex를 0으로 설정
  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(images.length - 1)
    }
  }, [images])

  useEffect(() => {
    onCurrentIndexChange(currentIndex)
  }, [currentIndex, onCurrentIndexChange, images])

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    // console.log(currentIndex + 1);
  }
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    )
  }

  return (
    <div
      className="relative w-[350px] h-[350px]"
      style={{ filter: 'drop-shadow(0px 6px 17px rgba(255, 255, 255, 0.3))' }}
    >
      {images.map((image, index) => (
        <div key={index}>
          {image ? (
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              width={500} // 이미지의 폭을 설정합니다.
              height={300} // 이미지의 높이를 설정합니다.
              // layout="responsive" // 반응형 이미지 레이아웃을 설정합니다.
              className={`transition-transform duration-300 transform ${index === currentIndex ? '' : 'hidden'}`}
            />
          ) : (
            <p>Image</p>
          )}
        </div>
      ))}
      {images.length > 1 && (
        <>
          <button
            className="absolute z-10 top-1/2 left-[-2rem] transform -translate-y-1/2 text-white text-6xl"
            onClick={prevImage}
          >
            &#8249;
          </button>
          <div className="absolute z-10 text-white"></div>
          <button
            className="absolute z-10 top-1/2 right-[-2rem] transform -translate-y-1/2 text-white text-6xl"
            onClick={nextImage}
          >
            &#8250;
          </button>
        </>
      )}
    </div>
  )
}

export default Carousel
