import request from 'supertest'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from '../schema/typeDefs'
import { resolvers } from '../schema/resolvers'

test('health and graphql basic', async () => {
  const app = express()
  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()
  server.applyMiddleware({ app })
  const res = await request(app).get('/graphql?query={health}')
  expect(res.status).toBe(200)
})
