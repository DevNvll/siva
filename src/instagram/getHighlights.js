import getIgClient from "./igClient"

export default async function getHighlights(userId, id) {
  if (!userId) {
    throw new Error("No username provided")
  }

  const ig = await getIgClient()

  if (id) {
    const hightlights = await ig.feed.reelsMedia({ userIds: [id] }).items()
    return hightlights
  } else {
    const tray = await ig.highlights.highlightsTray(userId)
    return tray.tray
  }
}
