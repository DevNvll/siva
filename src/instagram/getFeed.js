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

export default async function getFeed(username, nextMaxId) {
  if (!username) {
    throw new Error("No username provided")
  }

  const ig = await getIgClient()

  const targetUser = await ig.user.searchExact(username)

  const posts = await getPosts(ig, targetUser.pk, nextMaxId)

  return posts
}
