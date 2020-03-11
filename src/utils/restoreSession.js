import session from "../../session/session.json"

export default function restoreSession() {
  return JSON.stringify(session)
}
