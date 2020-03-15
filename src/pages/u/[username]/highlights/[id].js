import getHighlights from "../../../../instagram/getHighlights"
import StoriesList from "../../../../components/profile/StoriesList"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Highlights({ stories }) {
  const router = useRouter()
  useEffect(() => {
    router.prefetch("/u/" + router.query.username)
  }, [])

  return (
    <div className="p-4 h-screen">
      <style>{`body {
        background-color: #240c3d;
      }`}</style>
      <a
        className="text-white font-bold text-5xl mb-10"
        href={"#"}
        onClick={() => {
          router.push("/u/" + router.query.username)
        }}
      >
        {"<"} Back{" "}
      </a>
      <div className="mx-auto">
        <StoriesList stories={stories} />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const username = context.query.username
  const id = context.query.id

  const stories = await getHighlights(username, "highlight:" + id)
  return {
    props: {
      stories
    }
  }
}