import { assets } from "../assets/assets"


function Footer() {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
        <img src={assets.logo} width={150} alt="" />
        <p className="flex border-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">Copyright @Imagify.dev | All right reserved.</p>
        <div className="flex gap-2.5">
            <img src={assets.facebook_icon} alt="" width={35}  className="hover:scale-105 cursor-pointer "/>
            <img src={assets.twitter_icon} alt="" width={35} className="hover:scale-105 cursor-pointer " />
            <img src={assets.instagram_icon} alt="" width={35} className="hover:scale-105 cursor-pointer " />
        </div>
    </div>
  )
}

export default Footer