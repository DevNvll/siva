import { IgApiClient } from "instagram-private-api"

export default async function getIgClient() {
  const ig = new IgApiClient()
  ig.state.generateDevice("delta")

  await ig.state.deserialize(JSON.parse(process.env.SESSION_STRING))

  return ig
}
