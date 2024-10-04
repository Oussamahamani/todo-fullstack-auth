import React from 'react'
import {Link} from "react-router-dom"
import {signOut} from "firebase/auth"
import {auth} from "./config"
import {useNavigate} from "react-router-dom"
export default function NavBar({userAuth,setUserAuth}) {

    const navigate = useNavigate()
    const logout= async ()=>{
        console.log("hello")
        await signOut(auth)
        console.log("log out succesful")
        setUserAuth(null)
        navigate("/signin")
    }
  return (
    <div className="topnav">
   {userAuth && <Link className="active" to="/">Home</Link>}
  {!userAuth &&  <Link to="/signin">sign in</Link>}
 {!userAuth &&  <Link to="/signup">sign up</Link>}
{userAuth && <button  onClick={logout}>Log Out</button>}
    {/* <a href="#about">About</a> */}
  </div>
  
  )
}
