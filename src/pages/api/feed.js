import getFeed from "../../instagram/getFeed"

export default async (req, res) => {
  const username = req.query.username

  if (!username) {
    res.status(400).json({
      code: "no_username"
    })
    return
  }

  const posts = await getFeed(username, req.query.nextMaxId)

  res.json({
    posts
  })
}
