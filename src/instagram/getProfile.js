import getIgClient from "./igClient"

export default async function getProfile(username) {
  if (!username) {
    throw new Error("No username provided")
  }
  const ig = await getIgClient()
  const targetUser = await ig.user.searchExact(username)
  const profile = await ig.user.info(targetUser.pk)

  return {
    profile,
    isPrivate: targetUser.is_private
  }
}
