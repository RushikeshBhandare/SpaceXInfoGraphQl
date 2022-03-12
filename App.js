import React, { Component } from 'react'
import { ApolloClient } from '@apollo/client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'

import HomeScreen from './src/Screens/HomeScreen'


const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache()
})

export class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <HomeScreen />
      </ApolloProvider>
    )
  }
}

export default App