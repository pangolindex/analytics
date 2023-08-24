import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { SUBGRAPH_HOST, SUBGRAPH_NAME_PANGOLIN, SUBGRAPH_NAME_BLOCKS } from '../constants'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: `${SUBGRAPH_HOST}/subgraphs/name/${SUBGRAPH_NAME_PANGOLIN}`,
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const blockClient = new ApolloClient({
  link: new HttpLink({
    uri: `${SUBGRAPH_HOST}/subgraphs/name/${SUBGRAPH_NAME_BLOCKS}`,
  }),
  cache: new InMemoryCache(),
})
