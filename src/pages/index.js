import React from "react"
import { useRouter } from "next/router"
import Head from "next/head"

export default function Index() {
  const router = useRouter()
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
        </div>
      </div>
    </div>
  )
}
