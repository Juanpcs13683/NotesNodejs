// this is for route handlers
const notesRouter = require('express').Router()
const Note = require('../models/note')

/*notesRouter.get('/',  (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})*/
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})


//note with promises
/*notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})*/

//note without promises async/await
notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

//1
/*notesRouter.post('/', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})*/

//2 status(201)
/*notesRouter.post('/', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save()
    .then(savedNote => {
      response.status(201).json(savedNote)
    })
    .catch(error => next(error))
})*/

//3 async/await
/*notesRouter.post('/',async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  const savedNote = await note.save()
  response.status(201).json(savedNote)

})*/

//4 try catch
/*notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })
  try{
    const savedNote = await note.save()
    response.status(201).json(savedNote)
  } catch(exception) {
    next(exception)
  }
})*/

//adding the library to delete try/catch
notesRouter.post('/',async (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    response.status(400).send({ error: 'content missing'})
  } else {

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  //we wait unting the note will be saved
  const savedNote = await note.save()
  response.status(201).json(savedNote) }
})



notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter