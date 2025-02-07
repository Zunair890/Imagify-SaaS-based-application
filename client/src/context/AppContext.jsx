import { createContext, useState } from "react";
import PropTypes from 'prop-types'; // Optional: for prop type validation
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext= createContext();
 export const AppContextProvider=(props)=>{
    const [user,setUser]= useState(null);
    const [showlogin,setShowLogin]=useState(false)
    const value={
        user,setUser,
        showlogin,setShowLogin
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