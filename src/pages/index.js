import React, { useRef } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Head from "next/head"
import { useLocalStorage } from "../utils/storageService"
import UserCard from "../components/UserCard"
import Scroll from "../components/Scroll"
import { isMobile } from "react-device-detect"

function scrollLeft(element, change, duration) {
  var start = element.scrollLeft,
    currentTime = 0,
    increment = 20

  console.log(start)

  var animateScroll = function () {
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
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t + b
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

export default function Index() {
  const router = useRouter()
  const [favorites] = useLocalStorage("favorites", [])

  function onSearch(e) {
    e.preventDefault()
    router.push("/search/" + e.target.username.value)
  }

  return (
    <div>
      <Head>
        <title>Siva - Browse Instagram anonymously</title>
      </Head>
      <div className="flex flex-col content-center justify-center w-full h-screen bg-purple-700">
        <div className="flex flex-col content-center justify-center w-full p-4 mx-auto text-center md:w-1/2 md:p-0">
          <h1 className="text-5xl font-bold text-white">SIVA</h1>
          <h2 className="text-2xl text-white">Browse Instagram anonymously</h2>
          <form className="flex flex-col w-full" onSubmit={onSearch}>
            <input
              autoComplete="off"
              name="username"
              placeholder="Search for an Instagram username..."
              className="flex-grow p-4 mt-4 text-purple-300 transition duration-300 ease-in-out bg-white bg-purple-500 rounded focus:outline-none focus:bg-white focus:text-gray-900"
            />
            <button className="flex content-center justify-center p-2 my-4 text-white bg-purple-600 rounded md:hidden focus:outline-none focus:bg-purple-700 ">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-12 h-6"
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
          {Boolean(favorites.length) && !isMobile ? (
            <div className="mt-4">
              <Scroll>
                <div className="inline-flex space-x-4">
                  {favorites.map((f, i) => {
                    return (
                      <Link href={"/u/" + f.username} key={f.username}>
                        <a className="w-full">
                          <UserCard profile={f} key={i} />
                        </a>
                      </Link>
                    )
                  })}
                </div>
              </Scroll>
            </div>
          ) : (
            <div
              className="flex flex-col w-full space-y-4 overflow-y-auto"
              style={{ height: "400px" }}
            >
              {favorites.map((f, i) => {
                return (
                  <Link href={"/u/" + f.username} key={f.username}>
                    <a className="w-full">
                      <UserCard profile={f} key={i} />
                    </a>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
