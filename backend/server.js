// bring in express for our server setup
import express from 'express'

// bring in cors to help us reach backend routes from frontend
import cors from 'cors'

// create our express app
const app = express()

// setup a cors middleware for our express app
app.use(cors())

// choosing a port 
const PORT = 8080

// at least one basic route for testing purposes
app.get('/test', (req, res) => {
    res.json('Hello (from Server)!')
})

// setup our server to listen on a specific port
app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
})