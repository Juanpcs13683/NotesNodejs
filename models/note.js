// const mongoose__ = require('mongoose__')
// const url = process.env.MONGODB_URI

// console.log('\n connecting to', url)

// mongoose__.connect(url)
//     .then(result => {
//         console.log('connected to MongoDB')
// })
//     .catch((error) => {
//         console.log('error connecting to MongoDB:', error.message)
//     })

//     //this is how it was before define custom data

//     /*const noteSchemma = new mongoose__.Schema({
//        content: String,
//        date: Date,
//        important: Boolean,
//     })*/

//     const noteSchemma = new mongoose__.Schema({
//         content: {
//             type: String,
//             minLength: 5,
//             required: true
//         },
//         date:{
//             type: Date,
//             required: true
//         },
//         important :Boolean
//     })


//     noteSchemma.set('toJSON', {
//         transform: (document, returnedObject) => {
//             returnedObject.id = returnedObject._id.toString()
//             delete returnedObject._id
//             delete returnedObject.__v
//         }
//     })

//     module.exports = mongoose__.model('Note', noteSchemma)

///___________________________________________________________-
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    red: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)