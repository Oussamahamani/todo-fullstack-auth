import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from "./SignUP"
import SignIN from "./SignIN"
// import Home from "./Home"
import NavBar from "./NavBar"
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import {signOut} from "firebase/auth"

import {auth} from "./config"
import ToDo from "./ToDo"
function App() {

  const [userAuth,setUserAuth] = useState(null)
  const [isAuthReady,setIsAuthReady] = useState(false)


  useEffect(()=>{
    //log in user automaticly if they are already logged from previous time
   let unsub = auth.onAuthStateChanged((user)=>{
      console.log("authenetication",user)
      setUserAuth(user)
      setIsAuthReady(true)
      unsub()
    })

  },[])
  return (
    <>

  { isAuthReady &&   <BrowserRouter>
    <NavBar userAuth={userAuth} setUserAuth={setUserAuth}/>
    <div className="container">

      <Routes>

        <Route path="/" element={userAuth?<ToDo/>:<Navigate replace={true} to="/signup"/>} />
        <Route path="/signup" element = {userAuth?<Navigate replace={true} to="/"/>:<SignUp setUserAuth={setUserAuth}/>}/>
        <Route path="/signin" element = {userAuth?<Navigate replace={true} to="/"/>:<SignIN setUserAuth={setUserAuth}/>}/>
      </Routes>
      


    </div>
      </BrowserRouter>}
    </>
  )
}

export default App
