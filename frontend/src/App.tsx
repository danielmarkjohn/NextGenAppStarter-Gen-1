import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Home from './pages/Home'

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen p-6">
        <header className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">NextGenApp — Frontend</h1>
        </header>
        <main className="max-w-4xl mx-auto mt-6">
          <Home />
        </main>
      </div>
    </ApolloProvider>
  )
}
