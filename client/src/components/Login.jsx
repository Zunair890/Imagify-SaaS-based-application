import { useContext, useEffect, useState } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios"
import { toast } from "react-toastify";

function Login() {
    const [state,setState]=useState("Login");
    const {setShowLogin,backendUrl,setToken,setUser}=useContext(AppContext)
    const [name,setName]= useState("")
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")

    const onSubmitHandler= async(e)=>{
     e.preventDefault();
     try{
        if(state==="Login"){
            const {data}= await axios.post(backendUrl +"/api/user/login",{email,password})
            if(data.success){
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem("token",data.token)
                setShowLogin(false)
            }
            else{
                toast.error(data.message)
                
            }
        }
        else{
            const {data}= await axios.post(backendUrl +"/api/user/register",{name,email,password})
            if(data.success){
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem("token",data.token)
                setShowLogin(false)
            }
            else{
                toast.error(data.message)
                console.log(data)
            } 
        }


     }
     catch (error) {
       toast.error(error.message)
    }
    }

    useEffect(()=>{
        document.body.style.overflow= "hidden";
        return()=>{
            document.body.style.overflow="unset";
        }
    })
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10  bg-black/30 flex justify-center items-center">
       <form
       onSubmit={onSubmitHandler}
       className="relative bg-white p-10 rounded-xl text-slate-500">
        <h1 className="text-2xl text-center text-blue-900 font-medium">{state}</h1>
        <p className="text-sm text-center pt-2">Welcome back! Please sign in to continue</p>
       {state!=="Login" &&
        <div className="border pl-5 py-2 flex items-center gap rounded-full mt-5">
            <img src={assets.profile_icon} alt="" className="h-7 opacity-55 w-7" />
            <input
            value={name}
            onChange={(e)=> setName(e.target.value)}
            type="text" placeholder="Full Name" required className="outline-none text-sm " />
        </div>}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            <img 
            
            src={assets.email_icon} alt="" />
            <input type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            name="email" placeholder="Email ID." required className="outline-none text-sm "/>
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            <img src={assets.lock_icon} alt="" />
            <input 
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            type="password" placeholder="Password" required  className="outline-none text-sm "/>
        </div>
        <p className="text-sm ttext-blue-600 my-4 cursor-pointer">Forgot Password</p>
        <button className="bg-blue-600 w-full text-white py-2 rounded-full ">{state==="Login"? 'Login': "Create an account"}</button>
        {state==="Login" ?
        <p className="mt-5 text-center">Dont have an account? {""}
            <span
            onClick={()=>setState('Sign Up')}
            className="text-blue-600 cursor-pointer">Sign Up</span>
        </p>:
        <p className="mt-5 text-center">Already have an account? {""}
            <span
             onClick={()=>setState('Login')}
            className="text-blue-600 cursor-pointer">Login</span>
        </p>}
          <img 
          onClick={()=>setShowLogin(false)}
          src={assets.cross_icon} alt="" className="absolute top-5 right-5 cursor-pointer" />
        </form> 
    </div>
  )
}

export default Login