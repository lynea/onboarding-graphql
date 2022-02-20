import { createServer } from '@graphql-yoga/node'
import { loadSchema } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

import { Resolvers } from './graphql/types/generated'

const boot = async () => {
  const typeDefs = await loadSchema('./src/graphql/schema.graphql', {
    loaders: [new GraphQLFileLoader()],
  })

  const resolvers: Resolvers = {
    Query: {
      users: () => [{ email: 'some noob.nl', id: '1', username: 'henk' }],
    },
  }

  const server = createServer({
    schema: {
      typeDefs,
      resolvers,
    },
  })

  server.start()
}

boot()
