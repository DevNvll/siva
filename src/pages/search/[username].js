import Head from "next/head"
import Link from "next/link"

import search from "../../instagram/search"
import Navbar from "components/Navbar"
import UserCard from "../../components/UserCard"

export default function Search({ results, username }) {
  return (
    <>
      <Head>
        <title>Search - Siva</title>
      </Head>
      <style>
        {`
          body {
            background-color: #240c3d;
          }
        `}
      </style>
      <Navbar search={username} />
      <div className="pt-20 pb-4 w-full bg-purple-700 px-2 md:px-4">
        {results.length ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {results.map((r, i) => {
              return (
                <Link href={"/u/" + r.username} key={i}>
                  <a>
                    <UserCard profile={r} />
                  </a>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col w-full text-white justify-center">
            <div className="mx-auto flex flex-col">
              <p className="text-5xl font-bold">
                No results for <i>{username}</i>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const username = context.query.username
  const results = await search(username)

  return {
    props: { results, username }
  }
}
