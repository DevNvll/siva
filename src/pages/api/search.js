import search from "../../instagram/search"

export default async (req, res) => {
  const query = req.query.query

  if (!query) {
    res.status(400).json({
      code: "no_query"
    })
    return
  }

  const users = await search(query)

  res.json(users)
}
