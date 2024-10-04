// bring in express for our server setup
import express from 'express'

// allows us to make our own environment variables
import 'dotenv/config'

// bring in cors to help us reach backend routes from frontend
import cors from 'cors'

// bring in the function that will make the connection to the database
import connectDB from './config.js'

// bring in our todo model to interact with database
import Todo from './models/todoModel.js'

import admin from "firebase-admin"

import serviceAccount from "./firebase-admin-key.js"
// create our express app
const app = express()

// setup a cors middleware for our express app
app.use(cors())

// data from client stored in request.body and formatted as json
app.use(express.json())

//to get the key object go to firebase -> settings -> service Accounts -> generate new private key
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
//connect our server with firebase 
// choosing a port 
const PORT = 8080

// at least one basic route for testing purposes
app.get('/test', (req, res) => {
    res.json('Hello (from Server)!')
})

const checkIfAuthenticated= async(req,res,next)=>{
  // do you want to be available to any user
  //do you want to be availnle to only logged in users
  //do you want to be available to only the user who owns the document
  //it returns user auth info, and checks if they are loggedin 
  try {
    let token = req.headers.authorization.split(" ")[1]

      let response=  await admin.auth().verifyIdToken(token)
      console.log(response)
    //   console.log(req.locals)
      req.userId = response.uid
      next()
  } catch (error) {
    //if there is an erorr, means token not valid, means user not logged in
    console.log("error",error)

    res.status(403).json({authError:"you need to be loggedin"})
  }

}
// a route that gets all todos and sends it to client (READ)
app.get('/todos/',checkIfAuthenticated ,async (req, res) => {
  

  try {
        // console.log("🚀 ~ app.get ~ response:", response)
        // use find method on the model to retrieve all documents from the todos collection
        const todos = await Todo.find()
        console.log('GET /todos')
        // send those documents to the client
        res.status(200).json(todos)
    } catch(e) {
        console.log(e)
        res.status(400).json(e)
    }
})

// a route that creates and adds a todo document to the database
app.post('/todos', async (req, res) => {
    try {
        console.log(req.body)
        const newTodo = await Todo.create(req.body)
        res.status(201).json(newTodo)
        console.log('POST /todos')
    } catch(e) {
        console.log(e)
        res.status(400).json(e)
    }  
})

// a route for deleting a todo document from the database
app.delete('/todos/:id', checkIfAuthenticated,async (req, res) => {
    try {
        // use the id from the params to find and delete the document

        //check if the user who's trying to delete is the one who owns it 
        let document = await Todo.findById(req.params.id)
        if(document.userId !==  req.userId){
        throw new Error("you don't have access to delete this document")
        }
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id)
        console.log(deletedTodo)
        console.log('DELETE /todos/:id')
        res.status(200).json(deletedTodo)
    } catch(e) {
        console.log(e)
        res.status(404).json(e)
    }
})

// a route for updating a todo document from the database
app.put('/todos/:id', checkIfAuthenticated,async (req, res) => {
    try {
        // use the model to find the document and replace it with the updated one (req.body)
        // we can add { new: true } to the options object to get the updated version of the document in our response
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
        console.log('PUT /todos/:id')
        res.status(200).json(updatedTodo)
    } catch(e) {
        console.log(e)
        res.status(400).json(e)
    }
})

// setup our server to listen on a specific port
app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
    connectDB()
})