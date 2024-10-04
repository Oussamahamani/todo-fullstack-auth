import { useEffect, useState } from 'react'
import './App.css'

export const BASE_URL = import.meta.env.VITE_BASE_URL

function App() {

  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    // make initial request to backend on first render
    async function test() {
      const response = await fetch(`${BASE_URL}/todos`)
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
    const response = await fetch(`${BASE_URL}/todos`, {
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

    // reset the input to an empty string (easier to add todos that way)
    setInput('')

    console.log(newTodo)

  }

  // the id is the _id of the todo document we want to delete
  async function handleDelete(id) {

    try {
      // make the request with the document id in the path (at the end)
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'DELETE'
      })

      // check the response to see if it failed in some way (if its "not okay")
      if (!response.ok) {
        // create our own error and throw it
        throw new Error('Something went wrong. Status: ' + response.status)
      }

      // make a copy of the state but also remove the document with the matching id
      const newTodos = todos.filter(todo => todo._id !== id)

      // update the state with a new array
      setTodos(newTodos)
    } catch(e) {
      console.log('in the catch')
      console.log(e)
    }
  }

  async function handleComplete(id) {
      // find todo with specified id
      const todo = todos.find((todo) => todo._id == id);

      // make the request with the document id in the path
      const response = await fetch(`${BASE_URL}/todos/${todo._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...todo,
          completed: !todo.completed,
        }),
      });

      // format the updated todo
      const updatedTodo = await response.json();

      // make a copy of the state but also replace the document with the matching id
      const updatedTodos = todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo));

      // update the state with a new array
      setTodos(updatedTodos);
  }

  return (
    <>
      <h1>Todos:</h1>
      <ul>
        {todos.map(todo => 
          <li key={todo._id}>
            <input type="checkbox" checked={todo.completed} onChange={() => handleComplete(todo._id)} />
            {todo.text}
            <button onClick={() => handleDelete(todo._id)}>X</button>
          </li>
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleChange} />
        <button>Add</button>
      </form>
    </>
  )
}

export default App
