import { useState } from "react"
import classNames from "classnames"
import Link from "next/link"
import Scroll from "../Scroll"

export default function Stories({ stories, username, openStories }) {
  async function onOpenStories(id) {
    const res = await fetch(
      "/api/highlights?username=" + username + "&id=" + id
    )
    const data = await res.json()
    console.log(data)
    openStories(
      data.map((p) => {
        const isVideo = p.media_type === 2
        return isVideo
          ? { url: p.video_versions[0].url, video: true }
          : { url: p.image_versions2.candidates[0].url }
      })
    )
  }

  return (
    <div className="flex self-center justify-center w-full mx-4">
      <Scroll className="w-full mx-8">
        {stories.map((s, m) => {
          return (
            <div key={m}>
              <button
                onClick={() => {
                  onOpenStories(s.id)
                }}
              >
                <div
                  key={m}
                  className="flex flex-col content-center justify-center w-20 text-center cursor-pointer "
                  style={{ height: "fit-content" }}
                >
                  <img
                    src={s.cover_media.cropped_image_version.url}
                    className="self-center w-20 h-20 bg-white border-4 border-white border-solid rounded-full shadow-lg"
                  />
                  <p className="pt-2 text-sm font-bold text-white">{s.title}</p>
                </div>
              </button>
            </div>
          )
        })}
      </Scroll>
    </div>
  )
}
