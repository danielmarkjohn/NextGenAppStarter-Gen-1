import mongoose from 'mongoose'
import dotenv from 'dotenv'
import VoteModel from '../models/vote'

dotenv.config()

async function seed(){
  const mongo = process.env.MONGO_URI || 'mongodb://localhost:27017/nextgenapp'
  await mongoose.connect(mongo)
  await VoteModel.create({ galleryId: 'demo-gallery', yes: 10, no: 2 })
  console.log('seeded')
  process.exit(0)
}

seed().catch(err=>{ console.error(err); process.exit(1) })
