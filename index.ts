import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { MessageResolver } from './resolvers/message'
import cors from 'cors'
import { createConnection } from 'typeorm'

const main = async () => {
  const connection = await createConnection()

  // await conn.runMigrations();
  const app = express()
  app.set('trust proxy', 1)
  app.use(cors())

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MessageResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  })

  apolloServer.applyMiddleware({
    app,
    cors: false,
  })

  app.listen(4000, () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((err) => {
  console.error(err)
})
