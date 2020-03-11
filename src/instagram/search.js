import getIgClient from "./igClient"

export default async function search(username) {
  const ig = await getIgClient()

  const users = await ig.search.users(username)

  return users
}
