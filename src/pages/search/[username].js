import Head from "next/head"
import Link from "next/link"
import classNames from "classnames"
import search from "../../instagram/search"
import Navbar from "components/Navbar"
import LockIcon from "../../components/icons/Lock"

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
                    <div className="rounded bg-white shadow-md p-4 flex flex-row cursor-pointer hover:bg-purple-100">
                      <img
                        src={r.profile_pic_url}
                        className={classNames("w-20 h-20 rounded-full mr-4", {
                          "border-4 border-solid border-pink-700":
                            r.latest_reel_media
                        })}
                      />

                      <div>
                        <p className="text-xl font-bold flex content-center">
                          @{r.username}
                          {r.is_private && (
                            <small
                              className="text-sm h-full self-center ml-2"
                              alt="Private Profile"
                            >
                              <LockIcon className="w-4 h-4" />
                            </small>
                          )}
                        </p>
                        <p>{r.full_name}</p>
                      </div>
                    </div>
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
