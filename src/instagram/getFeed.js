import getIgClient from "./igClient"

async function getPosts(ig, user, nextMaxId) {
  const feed = await ig.feed.user(user)
  let next
  if (nextMaxId) {
    feed.nextMaxId = nextMaxId
  }
  let results = await feed.items()
  next = feed.nextMaxId
  return { results, nextMaxId: feed.moreAvailable ? next : null }
}

export default async function getFeed(id, nextMaxId) {
  if (!id) {
    throw new Error("No username provided")
  }

  const ig = await getIgClient()

  const posts = await getPosts(ig, id, nextMaxId)

  return posts
}
