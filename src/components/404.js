import Navbar from "./Navbar"
import Link from "next/link"
import Head from "next/head"

export default function NotFound({ user }) {
  return (
    <>
      <Head>
        <title>Not Found - Siva</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <div className="flex flex-col h-screen w-full justify-center bg-purple-700">
        <div className="mx-auto text-center">
          <h1 className="text-white text-5xl">User Not Found</h1>
          <h2 className="text-white text-2xl mb-4">
            The user <i>@{user}</i> was not found. Maybe a typo?
          </h2>
          <Link href="/">
            <a className="text-purple-200 hover:text-purple-100">
              Return to Home
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
