import { useState } from "react"
import classNames from "classnames"

export default function Stories({ stories, profile }) {
  const [storiesOpen, toggleStories] = useState(false)
  return (
    <div className="self-center">
      <div
        className={classNames(
          "grid grid-cols-3 md:grid-flow-row pt-4 gap-4 h-24 overflow-hidden mt-8 md:mt-0",
          { "h-auto": storiesOpen }
        )}
      >
        <div className="flex flex-col h-20 w-20 rounded-full shadow-lg bg-white"></div>
        <div className="flex flex-col h-20 w-20 rounded-full shadow-lg bg-white"></div>
        <div className="flex flex-col h-20 w-20 rounded-full shadow-lg bg-white"></div>
        <div className="flex flex-col h-20 w-20 rounded-full shadow-lg bg-white"></div>
      </div>
      <div
        className={classNames("pt-4 transform text-white", {
          "rotate-180": storiesOpen
        })}
      >
        <svg
          className="md:hidden h-8 cursor-pointer self-center w-full "
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
          className="md:hidden h-8 cursor-pointer self-center w-full -mt-6"
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
