import { motion } from 'framer-motion'
import React from 'react'

const Onboarding1 = () => {
  const bgstyle = {
    width: '100vw',
    height: '960px',
  }

  const typingStyle = {
    white_space: 'nowrap',
    margine: 0,
    position: 'fixed',
    color: 'transparent',
  }
  const cursorStyle = {
    content: 'Imagine What',
    width: '40%',
    color: 'white',
    overflow: 'hidden',
    borderRight: '2px solid white',
    animation: 'typing 4.5s steps(30) infinite',
  }
  const cursorStyle2 = {
    content: 'Make world',
    width: '33%',
    color: 'white',
    overflow: 'hidden',
    borderRight: '2px solid white',
    animation: 'typing 4.5s steps(30) infinite, delay 2s',
  }

  return (
    <div
      className="flex flex-col justify-center gap-[150px] font-['Minecraft']"
      style={bgstyle}
    >
      <div className="relative flex w-full h-[140px] items-center justify-between px-[130px]">
        <div
          className="absolute left-[130px] w-[650px] text-white text-[80px] whitespace-nowrap"
          style={typingStyle && cursorStyle}
        >
          Imagine What
        </div>
        <div
          className="absolute right-[130px] w-[450px] h-[6px] mt-[50px] bg-green-400"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.424)',
          }}
        ></div>
      </div>
      <div
        className="flex justify-center text-white text-[160px] rotating-question-mark"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.424))',
        }}
      >
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
          ?
        </motion.div>
      </div>
      <div className="flex w-full h-[130px] items-center justify-between px-[130px]">
        <div
          className="text-green-400 text-[100px] mx-8"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.424))',
          }}
        >
          {'{'} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          {'}'}
        </div>
        <div
          className="absolute left-[58%] text-white text-[80px] mt-[20px] animate-delay-3s whitespace-nowrap"
          style={typingStyle && cursorStyle2}
        >
          Make World
        </div>
      </div>
    </div>
  )
}

export default Onboarding1
