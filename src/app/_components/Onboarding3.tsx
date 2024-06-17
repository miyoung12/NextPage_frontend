import React from 'react'
// import d3 from '../../../public/d3.svg'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Onboarding3 = () => {
  const style = {
    width: '100vw',
    height: '960px',
    overflow: 'hidden',
  }

  return (
    <div
      className="flex justify-center items-center relative p-[50px] text-center whitespace-nowrap font-['NextPage'] text-white"
      style={style}
    >
      <div className="relative w-[1000px] min-w-[1000px] h-[600px] m-[50ox] text-[45px]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
          }}
        >
          <span className="text-left absolute top-0 left-[-40px] z-10 animate-scale-up-ver-top">
            직접 만드는
            <br />
            나만의 <span className="text-[#7AFF8F]">멀티버스</span>
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 70, y: -30 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
            delay: 0.4,
          }}
        >
          <Image
            className="absolute top-[-360px] left-[440px] w-[1000px] h-auto animate-slide-bl object-contain filter drop-shadow-[0 0 14px rgba(255, 255, 255, 0.424)]"
            // className="absolute top-[calc(50%-360px)] left-[calc(50%-440px)] w-[1000px] h-auto animate-slide-bl object-contain filter drop-shadow-[0 0 14px rgba(255, 255, 255, 0.424)]"
            style={{
              filter: 'drop-shadow(0 0 14px rgba(255, 255, 255, 0.424))',
              height: 'auto', // height를 auto로 설정
            }}
            src="/d3.svg"
            alt="d3"
            width={1000}
            height={1000}
          />
        </motion.div>
      </div>
    </div>
  )
}
export default Onboarding3
