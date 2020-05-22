import { useState } from "react"
import classNames from "classnames"
import Link from "next/link"
import Scroll from "../Scroll"

export default function Stories({ stories, username }) {
  const [storiesOpen, toggleStories] = useState(false)
  return (
    <div className="flex self-center justify-center w-full mx-4">
      <Scroll className="w-full mx-8">
        {stories.map((s, m) => {
          return (
            <div>
              <Link
                href={"/u/" + username + "/highlights/" + s.id.split(":")[1]}
                key={m}
              >
                <a>
                  <div
                    key={m}
                    className="flex flex-col content-center justify-center w-20 text-center cursor-pointer "
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
                </a>
              </Link>
            </div>
          )
        })}
      </Scroll>
    </div>
  )
}
