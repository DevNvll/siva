import { IgApiClient } from "instagram-private-api"
import restoreSession from "../utils/restoreSession"

export default async function getIgClient() {
  const ig = new IgApiClient()
  ig.state.generateDevice("delta")

  await ig.state.deserialize(restoreSession())

  return ig
}
