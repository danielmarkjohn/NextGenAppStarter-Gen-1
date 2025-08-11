import { useState } from 'react'

type Tally = { yes: number; no: number }

export default function useVoting() {
  const [tally, setTally] = useState<Tally>({ yes: 0, no: 0 })

  const vote = (type: 'yes'|'no') => {
    // placeholder: integrate with GraphQL mutation via ApolloClient
    setTally((t) => ({ ...t, [type]: t[type] + 1 }))
  }

  return { tally, vote }
}
