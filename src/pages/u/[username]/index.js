import React, { useState, useEffect } from "react"
import Head from "next/head"
import classNames from "classnames"
import immer from "immer"
import Carousel, { Modal, ModalGateway } from "react-images"

import UserInfo from "components/profile/UserInfo"
import Stories from "components/profile/Stories"
import Navbar from "components/Navbar"

import FeedList from "components/profile/FeedList"
import StoriesList from "components/profile/StoriesList"
import NotFound from "components/404"
import IsPrivate from "components/profile/IsPrivate"

import getProfile from "../../../instagram/getProfile"
import getPosts from "../../../instagram/getFeed"
import getStories from "../../../instagram/getStories"
import getHighlights from "../../../instagram/getHighlights"
import { useLocalStorage } from "../../../utils/storageService"
import { HeaderComponent } from "../../../components/Modal/HeaderComponent"
import { ViewComponent } from "../../../components/Modal/ViewComponent"

export default function Index({
  username,
  profile,
  posts,
  stories,
  nextMaxId,
  isPrivate,
  notFound,
  highlights,
}) {
  const [activeTab, setActiveTab] = useState(1)
  const [favorites, setFavorites] = useLocalStorage("favorites", [])
  const [carouselImages, setCaroulselImages] = useState(null)
  const [modalOpened, setModalOpened] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const isFavorite =
    !notFound && Boolean(favorites.find((p) => p.pk === profile.pk))
  const hasStories = !notFound && !isPrivate && stories.length >= 1

  useEffect(() => {
    if (!process.browser || notFound) return
    if (isFavorite) {
      // renew profile info in favorites
      const newFavorites = immer(favorites, (draft) => {
        draft[draft.findIndex((f) => f.pk === profile.pk)] = profile
        console.log(draft)
      })
      setFavorites(newFavorites)
    }
  }, [])

  function toggleFavorite(newFavorite) {
    if (process.browser) {
      if (isFavorite) {
        setFavorites(favorites.filter((p) => p.pk !== profile.pk))
      } else {
        setFavorites([newFavorite, ...favorites])
      }
    } else {
      return
    }
  }

  function setOpenedImage(urls, index) {
    setCurrentIndex(index)
    if (!urls) {
      setModalOpened(false)
      return
    }
    const views = urls.map((u) => ({
      url: u.url,
      video: u.video,
      poster: !u.video ? u.url : "",
    }))
    console.log(views)
    setCaroulselImages(views)
    setModalOpened(true)
  }

  async function openStories() {
    const data = stories
    setOpenedImage(
      data.map((m) => {
        const isVideo = m.media_type === 2
        return {
          url: isVideo
            ? m.video_versions[0].url
            : m.image_versions2.candidates[0].url,
          video: isVideo,
        }
      })
    )
  }

  return !notFound ? (
    <div>
      <ModalGateway>
        {modalOpened ? (
          <Modal
            onClose={() => {
              setOpenedImage(null)
              setCurrentIndex(0)
            }}
            closeOnBackdropClick
            closeOnEsc
          >
            <Carousel
              hideControlsWhenIdle={false}
              currentIndex={currentIndex}
              views={carouselImages}
              components={{ View: ViewComponent, Footer: HeaderComponent }}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      <Head>
        <title>{profile.username} - Siva</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar search={profile.username} />
      <div className="flex flex-col w-full h-screen pt-16">
        <div className="flex flex-col pb-24 bg-purple-900">
          <UserInfo
            profile={profile}
            hasStories={!isPrivate && hasStories}
            isFavorite={isFavorite}
            toggleFavorite={(profile) => toggleFavorite(profile)}
            goToStories={openStories}
          />
          {!isPrivate && profile.has_highlight_reels && (
            <Stories
              isPrivate={isPrivate}
              stories={highlights}
              username={profile.username}
              openStories={setOpenedImage}
            />
          )}
        </div>
        <div className="p-2 mb-4 -mt-16 bg-white rounded shadow-xl md:p-6 md:mx-12">
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
                    Posts
                  </a>
                </li>
                <li className="flex-1">
                  <a
                    onClick={() => (hasStories ? setActiveTab(2) : null)}
                    className={classNames(
                      "text-center block border rounded py-2 px-4",
                      activeTab === 2
                        ? "border-purple-500 bg-purple-500 hover:bg-purple-700 text-white"
                        : hasStories
                        ? "border-white hover:border-gray-200 text-purple-500 hover:bg-gray-200"
                        : "text-gray-500 border-white hover:bg-white cursor-not-allowed "
                    )}
                    href="#"
                  >
                    Stories
                  </a>
                </li>
              </ul>
              {(() => {
                switch (activeTab) {
                  case 1:
                    return (
                      <FeedList
                        setOpenedImage={setOpenedImage}
                        initialPosts={posts}
                        nextMaxId={nextMaxId}
                        id={profile.pk}
                      />
                    )
                  case 2:
                    return (
                      <StoriesList
                        stories={stories}
                        setOpenedImage={setOpenedImage}
                      />
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

    const { results: posts, nextMaxId: nextMaxId } = await getPosts(profile.pk)

    const highlights = await getHighlights(profile.pk)

    const stories = await getStories(profile.pk)

    return {
      props: { profile, posts, nextMaxId, highlights, stories },
    }
  } catch (err) {
    return {
      props: { notFound: true, username: context.query.username, stories: [] },
    }
  }
}
