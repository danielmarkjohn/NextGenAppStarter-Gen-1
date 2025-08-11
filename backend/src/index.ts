import express from 'express'
import http from 'http'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './schema/typeDefs'
import { resolvers } from './schema/resolvers'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Basic REST example
app.get('/health', (_, res) => res.json({ status: 'ok', env: process.env.NODE_ENV || 'dev' }))

// Swagger setup (auto docs)
const swaggerSpec = swaggerJsdoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: { title: 'NextGenApp API', version: '0.1.0' },
  },
  apis: ['./src/controllers/*.ts'],
})
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

async function start() {
  const httpServer = http.createServer(app)
  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()
  server.applyMiddleware({ app, path: '/graphql' })

  const mongo = process.env.MONGO_URI || 'mongodb://localhost:27017/nextgenapp'
  await mongoose.connect(mongo)
  console.log('Mongo connected')

  const port = process.env.PORT || 4000
  await new Promise<void>((res) => httpServer.listen({ port }, res as any))
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
