import React from 'react'
import {motion} from "framer-motion"
const FloatingBall = ({color,size,opacity,top,left,delay}) => {
  return (
    <motion.div className={` ${color} ${size} rounded-full absolute blur-xl`} style={{opacity,top,left}} 
    animate={{
        y:["0%","100%","0%"],
        x:["0%","100%","0%"],
        rotate : [0,360]
    }}

    transition={{
        duration : "20",
        ease : "linear",
        repeat :"Infinity",
        delay
    }}
    >

    </motion.div>
  )
}

export default FloatingBall