import React,{useState} from 'react'
import {auth} from "./config"
import { useNavigate } from "react-router-dom";

import {signInWithEmailAndPassword } from "firebase/auth"

export default function SignIn({setUserAuth}) {
  const navigate =useNavigate()

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const [error,setError]=useState(null)
  const [success, setSuccess] = useState(null)
  const [loading,setLoading] = useState(null)

  
  const handleSubmit = async (e)=>{
      e.preventDefault()

      let response = await signInWithEmailAndPassword(auth,email,password)
      console.log("🚀 ~ handleSubmit ~ response:", response.user)
      navigate("/")
    setUserAuth(response.user)
    
  }
  return (
    <div>
      
      <form action="" onSubmit={handleSubmit}>
            <div>

            <label htmlFor="">Email</label>
            <input type="text" onChange = {e=>setEmail(e.target.value)}/>
            </div>
            <div>

            <label htmlFor="">Password</label>
            <input type="text" onChange = {e=>setPassword(e.target.value)}/>
            </div>
         <button>Log In</button>
         {loading && <h5>loading</h5>}
      {success && <h5 style={{color:"green"}}>log in is succesful</h5>}
      {error && <h5 style={{color:"red"}}>{error} </h5>}
        </form>
    </div>
  )
}
