import { useContext } from "react"
import { assets } from "../assets/assets"
import {motion} from "framer-motion"
import { AppContext } from "../context/AppContext";
import {useNavigate} from "react-router-dom"

function Header() {
  const {user,setShowLogin}= useContext(AppContext)
  const navigate= useNavigate()
  const onClickHandler=()=>{
    if(user){
      navigate("/result")
    }
    else{
      setShowLogin(true)
    }
  }

  return (
    <motion.div 
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className="flex flex-col justify-center items-center text-center my-16">

     <motion.div
     initial={{opacity:0,y:-20}}
     animate={{opacity:1,y:0}}
     transition={{delay:0.2,duration:0.8}}
     
     className="text-stone-500 justify-center items-center inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500 w-72">
        <p>Best text to image generator</p>
        <img className="h-5" src={assets.star_icon} alt="" />
     </motion.div>

     <motion.h1 
     initial={{opacity:0}}
     transition={{delay:0.4, duration:2}}
     animate={{opacity:1}}
    
     className="text-4xl max-w-[300px] sm:text-5xl sm:max-w-[570px] xl:max-w-[800px] mx-auto mt-10 text-center sm:whitespace-normal sm:block">
  Turn text to 
  <span 
  
  className="text-blue-600">image</span>, in seconds
</motion.h1>
   <motion.p 
    initial={{opacity:0,y:20}}
    transition={{delay:0.6, duration:0.8}}
    animate={{opacity:1,y:0}}
   className="text-center max-w-xl mx-auto mt-5 opacity-80">Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, watch the magic happen!</motion.p>
   <motion.button
   onClick={onClickHandler}

   whileHover={{scale:1.01}}
   initial={{opacity:0}}
   animate={{opacity:1}}
   transition={{default:{duration:0.5},opacity:{delay:0.8,duration:1}}}
   className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full">
    Generate Images
    <img src={assets.star_group} className="h-6" alt="" />
   </motion.button>

   <motion.div 
   initial={{opacity:0}}
   transition={{delay:1, duration:1}}
   animate={{opacity:1}}
   className="flex flex-wrap justify-center mt-16 gap-3">
    {Array(6).fill('').map((item,index)=>(
      <motion.img 
      whileHover={{scale:1.05,duration:0.1}}
      className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10" 
      src={index %2==0 ? assets.sample_img_1: assets.sample_img_2} 
      key={index} width={70} />
    ))}

   </motion.div>
  <motion.p
  initial={{opacity:0}}
  transition={{delay:1.2, duration:0.8}}
  animate={{opacity:1}}
  className="mt-2 text-neutral-600">Generated images from Imagify</motion.p>



    </motion.div>
  )
}

export default Header