import { IgApiClient } from "instagram-private-api"

export default async function getIgClient() {
  const ig = new IgApiClient()
  ig.state.generateDevice("delta")

  console.log(process.env.SESSION_FILE)

  await ig.state.deserialize(JSON.parse(process.env.SESSION_FILE))

  return ig
}
