import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
// import img1 from '../../../public/img1.png'
// import img2 from '../../../public/img2.png'
// import img3 from '../../../public/img3.png'
// import img4 from '../../../public/img4.png'
// import img5 from '../../../public/img5.png'
// import img6 from '../../../public/img6.png'
// import img7 from '../../../public/img7.png'
// import img8 from '../../../public/img8.png'
// import img9 from '../../../public/img9.jpeg'
// import img10 from '../../../public/img10.jpeg'
// import img11 from '../../../public/img11.png'
// import img12 from '../../../public/img12.png'
// import img13 from '../../../public/img13.png'
// import img14 from '../../../public/img14.png'
// import img15 from '../../../public/img15.png'
// import img16 from '../../../public/img16.png'
// import img17 from '../../../public/img17.png'
// import img18 from '../../../public/img18.png'

const Onboarding2 = () => {
  const bgstyle = {
    width: '100vw',
    height: '960px',
  }

  const imgStyle = {
    animation: 'imgmove 8s linear infinite',
  }

  const imgStyle2 = {
    animation: 'imgmove2 8s linear infinite',
  }
  return (
    <div
      className="flex justify-between px-[160px] overflow-hidden"
      style={bgstyle}
    >
      <div className="flex items-center gap-[40px]">
        <div
          className="flex text-green-400 text-[130px] font-['Minecraft']"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.424)',
          }}
        >
          {'{'}
        </div>
        <div
          className="flex flex-col flex-nowrap imgmove w-[142px] h-full gap-[15px]"
          style={imgStyle}
        >
          <Image width={142} height={142} src="/img1.png" alt="" />
          <Image width={142} height={142} src="/img5.png" alt="" />
          <Image width={142} height={142} src="/img7.png" alt="" />
          <Image width={142} height={142} src="/img9.jpeg" alt="" />
          <Image width={142} height={142} src="/img11.png" alt="" />
          <Image width={142} height={142} src="/img13.png" alt="" />
          <Image width={142} height={142} src="/img15.png" alt="" />
          <Image width={142} height={142} src="/img18.png" alt="" />
          <Image width={142} height={142} src="/img1.png" alt="" />
          <Image width={142} height={142} src="/img5.png" alt="" />
          <Image width={142} height={142} src="/img7.png" alt="" />
          <Image width={142} height={142} src="/img9.jpeg" alt="" />
          <Image width={142} height={142} src="/img11.png" alt="" />
          <Image width={142} height={142} src="/img13.png" alt="" />
          <Image width={142} height={142} src="/img15.png" alt="" />
          <Image width={142} height={142} src="/img18.png" alt="" />
        </div>
        <div
          className="flex flex-col flex-nowrap imgmove2 w-[142px] h-full gap-[15px]"
          style={imgStyle2}
        >
          <Image width={142} height={142} src="/img2.png" alt="" />
          <Image width={142} height={142} src="/img6.png" alt="" />
          <Image width={142} height={142} src="/img8.png" alt="" />
          <Image width={142} height={142} src="/img10.jpeg" alt="" />
          <Image width={142} height={142} src="/img12.png" alt="" />
          <Image width={142} height={142} src="/img14.png" alt="" />
          <Image width={142} height={142} src="/img16.png" alt="" />
          <Image width={142} height={142} src="/img17.png" alt="" />
          <Image width={142} height={142} src="/img2.png" alt="" />
          <Image width={142} height={142} src="/img6.png" alt="" />
          <Image width={142} height={142} src="/img8.png" alt="" />
          <Image width={142} height={142} src="/img10.jpeg" alt="" />
          <Image width={142} height={142} src="/img12.png" alt="" />
          <Image width={142} height={142} src="/img14.png" alt="" />
          <Image width={142} height={142} src="/img16.png" alt="" />
          <Image width={142} height={142} src="/img17.png" alt="" />
        </div>
        <div
          className="h-[200px] items-center text-green-400 text-[130px] font-['Minecraft']"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.424)',
          }}
        >
          {'}'}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-[100px] text-white text-[35px] font-['DungGeunMo']">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
          }}
        >
          <div className="translate-x-[-100px] transform rotate-[-30deg] hover:text-green-400 hover:scale-110">
            좀비 세상에서 출근해야 한다면?
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 0.1,
          }}
        >
          <div className="transform rotate-[-20deg] hover:text-green-400 hover:scale-110">
            일어나보니 재벌 3세라면?
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 0.2,
          }}
        >
          <div className="translate-x-[60px] transform rotate-[-10deg] hover:text-green-400 hover:scale-110">
            내 애인이 스파이라면?
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 0.3,
          }}
        >
          <div className="translate-x-[70px] hover:text-green-400 hover:scale-110">
            소설 속 주인공이 된다면?
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 0.4,
          }}
        >
          <div className="translate-x-[60px] transform rotate-[10deg] hover:text-green-400 hover:scale-110">
            지구가 내일 폭발한다면?
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 0.5,
          }}
        >
          <div className="transform rotate-[20deg] hover:text-green-400 hover:scale-110">
            자기야 미안해를 했다면?
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 0.6,
          }}
        >
          <div className="translate-x-[-100px] transform rotate-[30deg] hover:text-green-400 hover:scale-110">
            스티브 잡스가 살아있었다면?
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Onboarding2
