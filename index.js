
// //-----------------------------until 3 step

// //const http = require('http')
// const express = require('express')
// const app = express()
// //const middleware = require('middleware')
// const morgan = require('morgan')
// app.use(express.static('build'))

// //middleware de cros tp let request from all of the origins
// const cors = require('cors')
// app.use(cors())

// //import .env
// require('dotenv').config() //import before model note

// //let's import mongoose 

// //const mongoose = require('mongoose') 

// //let's save the passwerd passed in the loggin to the variable password
// //const password = process.argv[3]

// //let's add the url to the database



// //let's connect moongose
// //mongoose.connect(url).then(response => console.log('connected successfuly to mongoose'))

// //let's define a new schema for the note we'll add further
// // const noteSchemma = new mongoose.Schema({
// //   content:String,
// //   date: Date,
// //   important: Boolean,
// // })

// //let's save in a new variable the schema
// // const Note = mongoose.model('Note', noteSchemma)

// //modifien how the data is returned from the database in the toJSON mmethod
// // noteSchemma.set('toJSON', {
// //   transform: (document, returnedObject) => {
// //     returnedObject.id = returnedObject._id.toString() 
// //     delete returnedObject._id
// //     delete returnedObject.__v //deleting the __v parameter
// //   }
// // }) //id from the response is an object and if we don't modified this it can cause
// //troubles in the future when test so we transform it to string instead now to be safe


// //importing the mongo module
// const Note = require('./models/note')

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2022-05-30T17:30:31.098Z",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2022-05-30T18:39:34.091Z",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2022-05-30T19:20:14.298Z",
//     important: true
//   }
// ]
// //const app = http.createServer((request, response) => {
//  // response.writeHead(200, { 'Content-Type': 'application/json' })
//   //response.end(JSON.stringify(notes))
// //})

// //we're going to create a middleware that are functions to handle request and response objects
// //this middleware will print information about every request sent to the server
// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('-----------------------')
//   next()
// }

// //this yield control to the next middleware

// app.use(express.json()) //to access data easily json-parser get activated by this statement

// //use the middleware
// app.use(requestLogger)


// app.use(morgan('tiny'))

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World This is learning express</h1>')
// })

// //this was how to get the notes before the db
// /*app.get('/api/notes', (request, response) =>{
//   response.json(notes)
// })
// */

// //gettin the data when we have the new database 
//  app.get('/api/notes', (request, response) =>{
//    Note.find({}).then(notes => {
//      response.json(notes)
//    })
//  })

// //get only one resource without db

// // app.get('/api/notes/:id', (request, response) => {
// //   const id =  Number(request.params.id) // convert string to number
// //   //console.log('id', id)
// //   const note = notes.find(note => {
// //     //console.log(note.id, typeof note.id, id, typeof id, note.id === id)
// //     return note.id === id}) //it could be --- const note = notes.find(note => note.id === id)

// //     //handling the event 404 not found
// //     if(note) {
// //       response.json(note)
// //     } else {
// //       response.status(404).end() //end for respond withoud send any data
// //     }  
  
// // })

// //-------------------------------------------------------------------------------
// //getting an expecific id with a database
// // app.get('/api/notes/:id', (request, response) => {
// //   Note.findById(request.params.id).then(note => {
// //     response.json(note)
// //   })
// // })
// //-----------------------------------------------------------------------------

// //getting an id and handling an error with database
// app.get('/api/notes/:id', (request, response, next) => {
//   Note.findById(request.params.id)
//     .then(note => {
//       if (note) {
//         response.json(note)
//       } else {
//         response.status(404).end() 
//       }
//     })
//     .catch(error => next(error))
// })




// //Deleting one resource without database
// /*app.delete('/api/notes/:id', (request, response) => {
//   const id = Number(request.params.id)
//   notes = notes.filter(note => note.id !== id)

//   response.status(204).end() //we just respond with the code of state and don't sent any data
//   // if there is no an existen resource anyway we respond with 204


//   ///handling the error in case that the note requested is not exist
// })*/

// //-------------------------------------------------------------------------

// //Deleting with database
// app.delete('/api/notes/:id', (request, response, next) => {
//   Note.findByIdAndRemove(request.params.id)
//     .then(result => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })



// //generating a new id
// /*const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id))
//     : 0
//   return maxId +1
// }*/

// //custom the token to log in the console
// morgan.token('body', (req) => JSON.stringify(req.body))

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// //adding a new note withoud db

// /*app.post('/api/notes', (request, response) => {
//   //const note = request.body
//   const body = request.body

//   if(!body.content) {
//     return response.status(400).json({
//       error: 'content missing'
//     })
  
//   //defining how to set te properties of the post request

//   //whit would be neccesary if before using mongodb
//   const note = {
//     content: body.content,
//     important: body.important || false, //this make sure that the property exists if not is set to false
//     data: new Date(),
//     id: generateId()
//   }
  
//   notes = notes.concat(note)
  
//   response.json(note)
// })*/

// //_--------------------------------------------------------------

// //creating a new entri with the database
// app.post('/api/notes', (request, response, next) => {
//   const body = request.body

//   /*catching an error this is no longer required
//   since we will modify the Schema in model to require a custom data */
//   // if (body.content === undefined){
//   //   return response.status(400).json({ error: 'content missing'})
//   // }

//   //defining the structure of the object Note and saving in a variable note //// USING THE CONSTRUCTOR FUNCTION OF Note obj
//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//   })

//   //savind the new note
//   note.save().then(savedNote => {
//     response.json(savedNote) //this will send the formated version we've done in note.js
//   })
//   .catch(error => next(error))

// })

// //-----------------------------------------------------------------------------------

// //updating an element before custom data entries
// /*
// app.put('/api/notes/:id', (request, response, next) => {
//   const body = request.body

//   const note={
//     content: body.content,
//     important: body.important,
//   }

//   //this is to call the new document updated instead the original
//   //as it's by default set to call the original document so we need to use
//   // the { new:true } parameter
//   Note.findByIdAndUpdate(request.params.id, note, { new: true })
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .cath(error => next(error))
// })*/

// //---------------------------------------------------------------------------------------------

// //put data before custom data entries
// app.put('/api/notes/:id', (request, response, next) => {
//   const { content, important } = request.body

//   Note.findByIdAndUpdate(
//     request.params.id,
//     { content, important },
//     {new: true, runValidators: true, context: 'query' }
//   )
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
// })

// //-------------------------------------------------------------------------------

// //the next middleware catch the request to the routes that doesn't exist
// //it returns an error in json format
// const unknownEndpoint = (request, response) => {
//   response.status(400).send({ error: 'unknown endpoint'})
// }

// app.use(unknownEndpoint)

// /// ultimo middleware error handling

// //ultimo middleware manejo de errores
// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)

//   //Casting error
//   if(error.name === 'CastError'){
//     return response.status(400).send({ error: 'malformated id'})
//   }
//   //Validation error
//   else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message })
//   }
//   next(error)

  

// }
// app.use(errorHandler)


// //const PORT = process.env.PORT || 3001
// //app.listen(PORT)
// //console.log(`Server running on port ${PORT}`)
// const PORT = process.env.PORT

// app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)})


// // SET fly.io PASSWORD LIKE THIS
// /*
// flyctl secrets set MONGODB_URI="mongodb+srv://admin:4dmin@cluster0.mpathsm.mongodb.net/noteApp?retryWrites=true&w=majority"
// */

//------------------------ step 4 good node.js practices

const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})