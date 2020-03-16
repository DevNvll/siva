import getFeed from "../../instagram/getFeed"

export default async (req, res) => {
  const id = req.query.id

  if (!id) {
    res.status(400).json({
      code: "no_id"
    })
    return
  }

  const posts = await getFeed(id, req.query.nextMaxId)

  res.json({
    posts
  })
}
