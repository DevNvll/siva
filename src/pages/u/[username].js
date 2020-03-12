import React, { useState } from "react"
import Head from "next/head"
import fetch from "isomorphic-unfetch"
import classNames from "classnames"

import UserInfo from "components/profile/UserInfo"
import Stories from "components/profile/Stories"
import Navbar from "components/Navbar"
import BottomBar from "components/BottomBar"
import FeedList from "components/profile/FeedList"
import StoriesList from "components/profile/StoriesList"
import NotFound from "../../components/404"
import IsPrivate from "../../components/profile/IsPrivate"

import getProfile from "../../instagram/getProfile"
import getPosts from "../../instagram/getFeed"
import getStories from "../../instagram/getStories"
import getHighlights from "../../instagram/getHighlights"

export default ({
  username,
  profile,
  posts,
  stories,
  nextMaxId,
  isPrivate,
  notFound,
  highlights
}) => {
  const [activeTab, setActiveTab] = useState(1)

  return !notFound ? (
    <div>
      <Head>
        <title>{profile.username} - Siva</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <div className="h-screen flex flex-col w-full pt-16">
        <div className="flex flex-col bg-purple-900 pb-24">
          <UserInfo
            profile={profile}
            hasStories={!isPrivate && Boolean(stories.length)}
          />
          {!isPrivate && profile.has_highlight_reels && (
            <Stories isPrivate={isPrivate} stories={highlights} />
          )}
        </div>
        <div className="bg-white rounded shadow-xl -mt-16 md:p-6 p-2 md:mx-12 mb-4">
          {!isPrivate ? (
            <>
              <ul className="flex pb-2 md:pb-4">
                <li className="flex-1 mr-2">
                  <a
                    onClick={() => setActiveTab(1)}
                    className={classNames(
                      "text-center block border rounded py-2 px-4  ",
                      activeTab === 1
                        ? "border-purple-500 bg-purple-500 hover:bg-purple-700 text-white"
                        : "border-white hover:border-gray-200 text-purple-500 hover:bg-gray-200"
                    )}
                    href="#"
                  >
                    Feed
                  </a>
                </li>
                <li className="flex-1 mr-2">
                  <a
                    onClick={() => setActiveTab(2)}
                    className={classNames(
                      "text-center block border rounded py-2 px-4  ",
                      activeTab === 2
                        ? "border-purple-500 bg-purple-500 hover:bg-purple-700 text-white"
                        : "border-white hover:border-gray-200 text-purple-500 hover:bg-gray-200"
                    )}
                    href="#"
                  >
                    Stories
                  </a>
                </li>
                <li className="text-center flex-1">
                  <a
                    onClick={() => setActiveTab(3)}
                    className={classNames(
                      "text-center block border rounded py-2 px-4  ",
                      activeTab === 3
                        ? "border-purple-500 bg-purple-500 hover:bg-purple-700 text-white"
                        : "border-white hover:border-gray-200 text-purple-500 hover:bg-gray-200"
                    )}
                    href="#"
                  >
                    Raw Data
                  </a>
                </li>
              </ul>
              {(() => {
                switch (activeTab) {
                  case 1:
                    return (
                      <FeedList
                        initialPosts={posts}
                        nextMaxId={nextMaxId}
                        username={profile.username}
                      />
                    )
                  case 2:
                    return <StoriesList stories={stories} />
                  case 3:
                    return (
                      <div>
                        <textarea
                          className="w-full"
                          style={{ height: "500px" }}
                        >
                          {JSON.stringify(profile, null, 2)}
                        </textarea>
                      </div>
                    )
                }
              })()}
            </>
          ) : (
            <IsPrivate />
          )}
        </div>
      </div>
      {/* <BottomBar /> */}
    </div>
  ) : (
    <NotFound user={username} />
  )
}

export async function getServerSideProps(context) {
  const username = context.query.username
  try {
    const { profile, isPrivate } = await getProfile(username)

    if (isPrivate) {
      return { props: { profile, isPrivate: true } }
    }

    const stories = await getStories(username)

    const { results: posts, nextMaxId: nextMaxId } = await getPosts(
      context.query.username
    )

    const highlights = await getHighlights(username)

    console.log(highlights)

    return {
      props: { profile, posts, nextMaxId, stories, highlights }
    }
  } catch (err) {
    return { props: { notFound: true, username: context.query.username } }
  }
}
