import getStories from "../../instagram/getStories"

export default async (req, res) => {
  const username = req.query.username

  if (!username) {
    res.status(400).json({
      code: "no_username"
    })
    return
  }

  const stories = await getStories(username)

  res.json(stories)
}
