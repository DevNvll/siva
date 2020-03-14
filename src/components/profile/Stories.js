import { useState } from "react"
import classNames from "classnames"
import Link from "next/link"

export default function Stories({ stories, username }) {
  const [storiesOpen, toggleStories] = useState(false)
  return (
    <div className="self-center">
      <div
        className={classNames(
          `grid grid-cols-3 md:grid-cols-${
            stories.length <= 10 ? stories.length : 10
          } pt-4 h-24 h-32 gap-4 overflow-hidden mt-8 md:pt-2 md:mt-0`,
          { "h-auto": storiesOpen }
        )}
      >
        {stories.map((s, m) => {
          return (
            <Link
              href={"/u/" + username + "/highlights/" + s.id.split(":")[1]}
              key={m}
            >
              <a>
                <div
                  key={m}
                  className="flex flex-col content-center justify-center text-center cursor-pointer"
                >
                  <img
                    src={s.cover_media.cropped_image_version.url}
                    className="self-center h-20 w-20 rounded-full shadow-lg bg-white border-4 border-solid border-white"
                  />
                  <p className="font-bold text-white text-sm pt-2">{s.title}</p>
                </div>
              </a>
            </Link>
          )
        })}
      </div>
      <div
        className={classNames("pt-4 transform text-white", {
          "rotate-180": storiesOpen
        })}
      >
        <svg
          className={classNames("h-8 cursor-pointer self-center w-full", {
            "md:hidden": stories.length <= 10
          })}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => {
            toggleStories(i => !i)
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <svg
          className={classNames("h-8 cursor-pointer self-center w-full -mt-6", {
            "md:hidden": stories.length <= 10
          })}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => {
            toggleStories(i => !i)
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  )
}
