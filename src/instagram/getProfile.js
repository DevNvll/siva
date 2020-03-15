import getIgClient from "./igClient"

export default async function getProfile(username) {
  if (!username) {
    throw new Error("No username provided")
  }
  const ig = await getIgClient()

  const targetUser = await ig.user.getIdByUsername(username)
  const profile = await ig.user.info(targetUser)

  return {
    profile,
    isPrivate: profile.is_private
  }
}
