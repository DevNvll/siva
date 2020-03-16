import getHighlights from "../../../../instagram/getHighlights"
import StoriesList from "../../../../components/profile/StoriesList"
import { useRouter } from "next/router"
import Head from "next/head"
import Navbar from "../../../../components/Navbar"
import Link from "next/link"

export default function Highlights({ stories }) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{router.query.username} - Siva</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar search={router.query.username} />
      <div className="p-4 h-screen pt-16">
        <style>{`body {
        background-color: #240c3d;
      }`}</style>
        <Link href={"/u/" + router.query.username}>
          <a className="text-white font-bold text-5xl mb-10">{"<"} Back </a>
        </Link>
        <div className="mx-auto mb-4">
          <StoriesList stories={stories} />
        </div>
      </div>
    </>
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
