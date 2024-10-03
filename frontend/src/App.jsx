import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

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

  function handleChange(e) {
    setInput(e.target.value)
  }

  async function handleSubmit(e) {
    // stop the default behavior of page refresh
    e.preventDefault()

    // format our data on the frontend to match the schema
    const todo = {
      text: input
    }

    // make the request
    const response = await fetch('http://localhost:8080/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // format the new todo that now has the id and completed property
    const newTodo = await response.json()

    // keep the state in sync with our data
    setTodos([...todos, newTodo])

    console.log(newTodo)

  }

  return (
    <>
      <h1>Todos:</h1>
      <ul>
        {todos.map(todo => <li key={todo._id}>{todo.text}</li>)}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleChange} />
        <button>Add</button>
      </form>
    </>
  )
}

export default App
