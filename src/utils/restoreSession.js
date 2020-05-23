export default function restoreSession() {
  return JSON.parse(process.env.SESSION_FILE)
}
