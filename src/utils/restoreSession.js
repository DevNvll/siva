export default function restoreSession() {
  try {
    return JSON.stringify(require("../../session/session.json"))
  } catch (err) {
    throw new Error("No session file provided")
  }
}
