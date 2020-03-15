import getHighlights from "../../../../instagram/getHighlights"
import StoriesList from "../../../../components/profile/StoriesList"
import { useRouter } from "next/router"

export default function Highlights({ stories }) {
  const router = useRouter()

  return (
    <div className="p-4 h-screen">
      <style>{`body {
        background-color: #240c3d;
      }`}</style>
      <a
        className="text-white font-bold text-5xl mb-10"
        href={"#"}
        onClick={() => {
          router.back()
        }}
      >
        {"<"} Back{" "}
      </a>
      <div className="m-4">
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
