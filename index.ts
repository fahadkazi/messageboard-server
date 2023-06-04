import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { ChatResolver } from './resolvers/chat'
import { MessageResolver } from './resolvers/message'
import http from 'http'
import cors from 'cors'
import { createConnection } from 'typeorm'

const main = async () => {
  const connection = await createConnection()

  // await conn.runMigrations();
  const app = express()
  const httpServer = http.createServer(app)
  app.set('trust proxy', 1)
  app.use(cors({ origin: 'http://localhost:19006', credentials: true }))

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ChatResolver, MessageResolver],
      validate: false,
    }),
    subscriptions: {
      path: '/messages/subscriptions',
      onConnect: () => {
        console.log('Client connected for subscriptions')
      },
      onDisconnect: () => {
        console.log('Client disconnected from subscriptions')
      },
    },
    context: ({ req, res }) => ({
      req,
      res,
    }),
    playground: {
      tabs: [
        {
          endpoint: '/messages/graphql',
        },
      ],
    },
    introspection: true,
  })

  apolloServer.applyMiddleware({
    app,
    cors: false,
  })
  apolloServer.installSubscriptionHandlers(httpServer)

  httpServer.listen(4000, () => {
    console.log(`Server ready at http://localhost:${4000}${apolloServer.graphqlPath}`)
    console.log(`Subscriptions ready at ws://localhost:${4000}${apolloServer.subscriptionsPath}`)
  })
}

main().catch((err) => {
  console.error(err)
})
