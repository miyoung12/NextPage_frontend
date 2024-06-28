import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

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

  const images1 = [
    '/img1.png',
    '/img5.png',
    '/img7.png',
    '/img9.jpeg',
    '/img11.png',
    '/img13.png',
    '/img15.png',
    '/img18.png',
  ]

  const images2 = [
    '/img2.png',
    '/img6.png',
    '/img8.png',
    '/img10.jpeg',
    '/img12.png',
    '/img14.png',
    '/img16.png',
    '/img17.png',
  ]
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
          {images1.map((src, index) => (
            <Image
              key={index}
              width={142}
              height={142}
              src={src}
              alt=""
              priority
            />
          ))}
          {images1.map((src, index) => (
            <Image
              key={index + images1.length}
              width={142}
              height={142}
              src={src}
              alt=""
              priority
            />
          ))}
        </div>
        <div
          className="flex flex-col flex-nowrap imgmove2 w-[142px] h-full gap-[15px]"
          style={imgStyle2}
        >
          {images2.map((src, index) => (
            <Image
              key={index}
              width={142}
              height={142}
              src={src}
              alt=""
              priority
            />
          ))}
          {images2.map((src, index) => (
            <Image
              key={index + images2.length}
              width={142}
              height={142}
              src={src}
              alt=""
              priority
            />
          ))}
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
