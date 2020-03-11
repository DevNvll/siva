import getHighlights from "../../instagram/getHighlights"

export default async (req, res) => {
  const username = req.query.username
  const id = req.query.id

  if (!username) {
    res.status(400).json({
      code: "no_username"
    })
    return
  }

  const stories = await getHighlights(username, id)

  res.json(stories)
}
