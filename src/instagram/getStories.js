import getIgClient from "./igClient"

export default async function getStories(id) {
  if (!id) {
    throw new Error("No username provided")
  }

  const ig = await getIgClient()

  const reelsFeed = ig.feed.reelsMedia({
    userIds: [id]
  })

  const storyItems = await reelsFeed.items()

  return storyItems.length === 0 ? [] : storyItems
}
