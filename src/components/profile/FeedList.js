import { useState } from "react"
import fetch from "isomorphic-unfetch"
import MediaCard from "./MediaCard"

export default function FeedList({ initialPosts, nextMaxId: nextId, id }) {
  const [loading, setLoading] = useState(false)
  const [feed, setFeed] = useState(initialPosts)
  const [nextMaxId, setNextMaxId] = useState(nextId)

  async function loadMore() {
    setLoading(true)
    const feedRes = await fetch(
      "/api/feed?id=" + id + "&nextMaxId=" + nextMaxId
    )
    const newPosts = await feedRes.json()
    setNextMaxId(newPosts.posts.nextMaxId)
    setFeed(p => [...p, ...newPosts.posts.results])
    setLoading(false)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {feed.map((p, i) => {
          return <MediaCard media={p} key={i} />
        })}
      </div>
      {(!loading && nextMaxId && (
        <button
          className="disabled:opacity-75 w-full p-2 rounded bg-purple-800 text-white font-bold mt-4 "
          onClick={loadMore}
        >
          Load More...
        </button>
      )) ||
        (nextMaxId && (
          <div className="w-full text-center pt-4 cursor-pointer">
            <p className="text-lg font-bold mx-auto text-purple-400">
              Loading...
            </p>
          </div>
        )) ||
        null}
    </>
  )
}
