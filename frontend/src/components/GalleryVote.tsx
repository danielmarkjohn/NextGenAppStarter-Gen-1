import React from 'react'
import useVoting from '../hooks/useVoting'

export default function GalleryVote() {
  const { tally, vote } = useVoting()

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold">Gallery Voting</h2>
      <div className="mt-3 flex items-center gap-2">
        <button onClick={() => vote('yes')} className="px-3 py-1 bg-green-500 text-white rounded">Yes</button>
        <button onClick={() => vote('no')} className="px-3 py-1 bg-red-500 text-white rounded">No</button>
        <div className="ml-auto">Tally: {tally.yes} / {tally.no}</div>
      </div>
    </div>
  )
}
