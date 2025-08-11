import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String
}, { timestamps: true })

export default mongoose.model('User', UserSchema)
