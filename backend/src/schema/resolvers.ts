import { IResolvers } from '@graphql-tools/utils'
import VoteModel from '../models/vote'
import UserModel from '../models/user'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const resolvers: IResolvers = {
  Query: {
    health: () => 'ok',
    voteTally: async (_:any, { galleryId }: any) => {
      const doc = await VoteModel.findOne({ galleryId }) || { yes:0, no:0 }
      return { yes: doc.yes || 0, no: doc.no || 0 }
    },
  },
  Mutation: {
    vote: async (_:any, { galleryId, choice }: any) => {
      const doc = await VoteModel.findOneAndUpdate(
        { galleryId },
        { $inc: choice === 'yes' ? { yes: 1 } : { no: 1 } },
        { upsert: true, new: true }
      )
      return { yes: doc.yes, no: doc.no }
    },
    register: async (_:any, { email, password, name }: any) => {
      const existing = await UserModel.findOne({ email })
      if (existing) throw new Error('User exists')
      const hash = await bcrypt.hash(password, 10)
      const u = await UserModel.create({ email, password: hash, name })
      const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' })
      return token
    },
    login: async (_:any, { email, password }: any) => {
      const user = await UserModel.findOne({ email })
      if (!user) throw new Error('Invalid')
      const ok = await bcrypt.compare(password, user.password)
      if (!ok) throw new Error('Invalid')
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' })
    }
  }
}
