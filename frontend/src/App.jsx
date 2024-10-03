import { useEffect } from 'react'
import './App.css'

function App() {

  useEffect(() => {
    // make initial request to backend on first render
    async function test() {
      const response = await fetch('http://localhost:8080/test')
      const data = await response.json()
      console.log(data)
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
