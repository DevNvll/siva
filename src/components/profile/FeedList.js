import { useState } from "react"
import fetch from "isomorphic-unfetch"
import MediaCard from "./MediaCard"

export default function FeedList({
  initialPosts,
  nextMaxId: nextId,
  id,
  setOpenedImage,
}) {
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
    setFeed((p) => [...p, ...newPosts.posts.results])
    setLoading(false)
  }

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {feed.map((p, i) => {
          return <MediaCard media={p} key={i} setOpenedImage={setOpenedImage} />
        })}
      </div>
      {(!loading && nextMaxId && (
        <button
          className="w-full p-2 mt-4 font-bold text-white bg-purple-800 rounded disabled:opacity-75 "
          onClick={loadMore}
        >
          Load More...
        </button>
      )) ||
        (nextMaxId && (
          <div className="w-full pt-4 text-center cursor-pointer">
            <p className="mx-auto text-lg font-bold text-purple-400">
              Loading...
            </p>
          </div>
        )) ||
        null}
    </>
  )
}
