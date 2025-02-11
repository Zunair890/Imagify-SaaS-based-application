import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';  // Optional: for prop type validation
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext= createContext();


 export const AppContextProvider=(props)=>{
    const [user,setUser]= useState(null);
    const [showlogin,setShowLogin]=useState(false)
    const [token,setToken]= useState(localStorage.getItem('token'))
    const[credit,setCredit]= useState(false)
     
   const navigate= useNavigate()

   const backendUrl= import.meta.env.VITE_BACKEND_URL
   const loadCreditsData= async()=>{
    try{
        const {data}= await axios.get(backendUrl +"/api/user/credits",{headers:{token}})
        if(data.success){
            setCredit(data.credits)
            setUser(data.user)
        }
    }
    catch(error){
        console.log(error)
        toast.error(error.message)
    }
   }
   // load credits when there is a token

   useEffect(()=>{
    if(token){
        loadCreditsData()
    }
   },[token])

     //logout function 
     const logout=()=>{
        localStorage.removeItem('token');
        setToken("")
        setUser(null)
     }
     // generate image through a prompt

     const generateImage= async(prompt)=>{
        try {
           const {data}= await axios.post(backendUrl +"/api/image/generate-image",{prompt},{headers:{token}})
            if(data.success){
                loadCreditsData()
                return data.resultImage

            }
            else{
                toast.error(data.message)
                loadCreditsData();
                if(data.creditBalance===0){
                    navigate("/buy")
                }
            }
        } catch (error) {
             toast.error(error.message)
        }
     }


    const value={
        user,setUser,
        showlogin,setShowLogin,
        token,setToken,
        credit,setCredit,
        backendUrl,
        loadCreditsData,
        logout,
        generateImage
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
// Optional: PropTypes validation
AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}