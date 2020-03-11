import getIgClient from "./igClient"

export default async function getStories(username) {
  if (!username) {
    throw new Error("No username provided")
  }

  const ig = await getIgClient()

  const targetUser = await ig.user.searchExact(username)

  const reelsFeed = ig.feed.reelsMedia({
    userIds: [targetUser.pk]
  })

  const storyItems = await reelsFeed.items()

  return storyItems.length === 0 ? [] : storyItems
}
