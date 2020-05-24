import { useState } from "react"
import classNames from "classnames"
import Scroll from "../Scroll"

export default function Stories({ stories, username, openStories }) {
  const [loadingStory, setLoadingStory] = useState(null)
  async function onOpenStories(id) {
    setLoadingStory(id)
    const res = await fetch(
      "/api/highlights?username=" + username + "&id=" + id
    )
    const data = await res.json()
    openStories(
      data.map((p) => {
        const isVideo = p.media_type === 2
        return isVideo
          ? { url: p.video_versions[0].url, video: true }
          : { url: p.image_versions2.candidates[0].url }
      })
    )
    setLoadingStory(null)
  }

  return (
    <div className="flex items-center justify-center w-full">
      <Scroll className="w-full max-w-4xl px-4 mx-auto md:w-auto">
        <div className="inline-flex space-x-4 ">
          {stories.map((s, m) => {
            return (
              <div key={m}>
                <button
                  className="focus:outline-none"
                  onClick={() => {
                    onOpenStories(s.id)
                  }}
                >
                  <div
                    key={m}
                    className={classNames(
                      "flex flex-col content-center justify-center w-20 text-center cursor-pointer ",
                      {
                        "opacity-50": loadingStory === s.id,
                      }
                    )}
                    style={{ height: "fit-content" }}
                  >
                    <img
                      src={s.cover_media.cropped_image_version.url}
                      className="self-center w-20 h-20 bg-white border-4 border-white border-solid rounded-full shadow-lg"
                    />
                    <p className="pt-2 text-sm font-bold text-white">
                      {s.title}
                    </p>
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </Scroll>
    </div>
  )
}
