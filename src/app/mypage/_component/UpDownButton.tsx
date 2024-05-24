'use client'
import up from '../../../../public/up.png'
import down from '../../../../public/down.png'
import Image from 'next/image'

export default function UpDownButton() {
  const ClickUp = () => {
    console.log('up')
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 부드럽게 스크롤
    })
  }
  const ClickDown = () => {
    console.log('down')
    window.scrollTo({
      top: window.scrollY + window.innerHeight,
      behavior: 'smooth', // 부드럽게 스크롤
    })
  }
  return (
    <div className="fixed flex flex-col top-[12rem] right-[3rem] space-y-[25rem] z-30">
      <Image src={up} alt="up" width={40} height={10} onClick={ClickUp} />
      <Image src={down} alt="down" width={40} height={10} onClick={ClickDown} />
    </div>
  )
}
