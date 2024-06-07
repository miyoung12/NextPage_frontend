import Image from 'next/image'

export default function RightSesstion() {
  return (
    <div className="flex flex-col items-center h-52 justify-between">
      <Image src="/up.png" alt="up" height={10} width={40} />
      <Image src="/down.png" alt="down" height={10} width={40} />
    </div>
  )
}
