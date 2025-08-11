import React from 'react'
import GalleryVote from '../components/GalleryVote'
import AuthPanel from '../components/AuthPanel'

export default function Home() {
  return (
    <div className="space-y-6">
      <AuthPanel />
      <GalleryVote />
    </div>
  )
}
