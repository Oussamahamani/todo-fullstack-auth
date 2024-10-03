import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    // make initial request to backend on first render
    async function test() {
      const response = await fetch('http://localhost:8080/todos')
      const data = await response.json()
      console.log(data)
      setTodos(data)
    }
    test()
  }, [])

  return (
    <>
      Hello (from Client)!
    </>
  )
}

export default App
