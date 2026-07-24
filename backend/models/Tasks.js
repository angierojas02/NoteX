import {Schema, model } from 'mongoose'

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    required: true,
    default: 'Alta',
    enum: ['Alta', 'Baja', 'Media' ]
  },
  status: {
    type: String,
    default: "Pendiente",
    enum: ['Pendiente', 'En proceso', 'Completada']
  },
  userId: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }]
});


taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model('Task', taskSchema)