import React, { useRef } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Head from "next/head"
import { useLocalStorage } from "../utils/storageService"
import UserCard from "../components/UserCard"

function scrollLeft(element, change, duration) {
  var start = element.scrollLeft,
    currentTime = 0,
    increment = 20

  console.log(start)

  var animateScroll = function() {
    currentTime += increment
    var val = Math.easeInOutQuad(currentTime, start, change, duration)
    element.scrollLeft = val
    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    }
  }
  animateScroll()
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t + b
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

export default function Index() {
  const router = useRouter()
  const [favorites] = useLocalStorage("favorites", [])

  const favComponent = useRef(null)

  function onSearch(e) {
    e.preventDefault()
    router.push("/search/" + e.target.username.value)
  }

  return (
    <div>
      <Head>
        <title>Siva - Browse Instagram anonymously</title>
      </Head>
      <div className="h-screen w-full flex flex-col content-center justify-center bg-purple-700">
        <div className="mx-auto flex flex-col justify-center content-center text-center p-4 w-full md:w-1/2 md:p-0">
          <h1 className="text-5xl font-bold text-white">SIVA</h1>
          <h2 className="text-2xl text-white">Browse Instagram anonymously</h2>
          <form className="w-full flex flex-col" onSubmit={onSearch}>
            <input
              autoComplete="off"
              name="username"
              placeholder="Search for an Instagram username..."
              className="flex-grow rounded bg-white bg-purple-500 p-4 mt-4 focus:outline-none focus:bg-white transition duration-300 ease-in-out text-purple-300 focus:text-gray-900"
            />
            <button className="md:hidden rounded bg-purple-600 text-white p-2 my-4 flex content-center justify-center focus:outline-none focus:bg-purple-700 ">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
          {Boolean(favorites.length) && (
            <div className="flex flex-row w-full justify-center h-full">
              <button
                onClick={() => {
                  scrollLeft(favComponent.current, -450, 300)
                }}
                className="w-8 bg-white rounded-full h-8 mr-4 -ml-12 z-10 self-center hidden md:block"
              >
                {"<"}
              </button>
              <div
                className="grid grid-col-1 gap-4 md:grid-flow-col md:gap-4 overflow-x-hidden overflow-y-auto md:h-auto w-full my-4"
                style={{ maxHeight: "350px" }}
                ref={favComponent}
              >
                {favorites.map((f, i) => {
                  return (
                    <Link href={"/u/" + f.username}>
                      <a>
                        <UserCard profile={f} key={i} />
                      </a>
                    </Link>
                  )
                })}
              </div>

              <button
                onClick={() => {
                  scrollLeft(favComponent.current, 450, 300)
                }}
                className="w-8 bg-white rounded-full h-8 ml-4 -mr-12 self-center hidden md:block"
              >
                {">"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
