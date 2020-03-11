import getProfile from "../../instagram/getProfile"

export default async (req, res) => {
  const username = req.query.username

  if (!username) {
    res.status(400).json({
      code: "no_username"
    })
    return
  }

  const profile = await getProfile(username)

  res.json(profile)
}
