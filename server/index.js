
// importing express into project
const express = require('express')

const bodyParser = require('body-parser')

//import path module 
const path = require('path');
const { linkSync } = require('fs');



// define a PORT for our server to run
const PORT = 8000

// initialize an express application 
const app = express();


require("dotenv").config()

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST || "localhost",
    database: process.env.DATABASE_NAME || "favlinks",
    password: process.env.DATABASE_PASS,
    port: process.env.DATABASE_PORT || 5432,
})

const getLinks = (request, response) => {
    pool.query('SELECT * FROM links ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getLinkById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM links WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createLink = (request, response) => {
    const { name, url } = request.body

    pool.query('INSERT INTO links (name, url) VALUES ($1, $2) RETURNING *', [name, url], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Link added with ID: ${results.rows[0].id}`)
    })
  }

  const updateLink = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, url } = request.body

    pool.query(
      'UPDATE links SET name = $1, url = $2 WHERE id = $3',
      [name, url, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Link modified with ID: ${id}`)
      }
    )
  }

  const deleteLink = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM links WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Link deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getLinks,
    getLinkById,
    createLink,
    updateLink,
    deleteLink,
  }



app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


//host react app as static files
app.use(express.static(path.resolve(__dirname,'../client/build')))




// define routes, give client ability to interact with server
app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})



app.get('/links', getLinks)
app.get('/links/:id', getLinkById)
app.post('/links', createLink)
app.put('/links/:id', updateLink)
app.delete('/links/:id', deleteLink)


console.log(getLinks)


// start app at port
app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT ${PORT}`)
})