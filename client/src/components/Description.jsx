import { assets } from "../assets/assets"
import {motion} from "framer-motion"

function Description() {
  return (
    <motion.div 
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className="flex flex-col items-center justify-center my-24 p-6 md:px-28">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">Create AI Images</h1>
        <p className="text-gray-500 mb-8">Turn your imagination into visuals</p>
        <div className="flex flex-col h-300 gap-5 md:gap-10 md:flex-row items-center">
            <img src={assets.astrnot} alt="" className="w-80 h-300 xl:w-96 rounded-lg" />
            <div>
                <h2 className="text-3xl font-medium max-w-lg mb-14">Introducing the AI-Powered Text to Image Generator</h2>
                <p className="text-gray-600 mb-4">Easily brings your ideas to life with our free AI image generation. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly. </p>
                <p className="text-gray-600">Simply type in a text-prompt, and or cutting edge AI will genearte high quality images in a seconds. From product visuals to character designs and potraits, even concepts that dont exist yet can be visualized effortlessly.</p>
            </div>
        </div>
    </motion.div>
  )
}

export default Description