import { readFileSync } from "fs"

export default function restoreSession() {
  const file = readFileSync("./session/session.json", "utf-8")

  return JSON.parse(process.env.SESSION_STRING || file)
}
