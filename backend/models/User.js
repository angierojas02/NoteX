import {Schema, model } from 'mongoose'

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: { type: String, enum: ['User', 'Admin', 'Tester'], default: 'User' },
    taskId: [{
      type: Schema.Types.ObjectId,
      ref: 'Task',
      default: []
    }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.password
  }
})

export default model('User', userSchema)