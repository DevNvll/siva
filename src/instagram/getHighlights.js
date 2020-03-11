import getIgClient from "./igClient"

export default async function getHighlights(username, id) {
  if (!username) {
    throw new Error("No username provided")
  }

  const ig = await getIgClient()

  const targetUser = await ig.user.searchExact(username)

  if (id) {
    const hightlights = await ig.feed.reelsMedia({ userIds: [id] }).items()
    return hightlights
  } else {
    const tray = await ig.highlights.highlightsTray(targetUser.pk)
    return tray.tray
  }
}
