import { useState, useEffect } from "react"
import classNames from "classnames"

export default function MediaCard({ media }) {
  const [index, setIndex] = useState(0)

  const isCarousel = media.media_type === 8

  const currentObject = isCarousel ? media.carousel_media[index] : media

  const isVideo = currentObject.media_type === 2
  const externalCurrentUrl = isVideo
    ? currentObject.video_versions[0].url
    : currentObject.image_versions2.candidates[0].url
  const currentUrl = currentObject.image_versions2.candidates[0].url

  return (
    <div className="relative">
      <a href={externalCurrentUrl} target="_blank" className="w-full relative">
        <img
          className="relative object-cover object-top w-full rounded"
          style={{ height: "500px" }}
          src={currentUrl}
        />
      </a>
      {/* <div className="opacity-0 hover:opacity-100 absolute w-full h-full top-0 left-0 rounded flex flex-col">
        <p className="self-end text-white font-bold opacity-100 m-4">Test</p>
      </div> */}
      {isCarousel && index !== 0 && (
        <div
          onClick={() => setIndex(index - 1)}
          className="absolute left-0 cursor-pointer h-20 w-20 flex flex-col justify-center content-center"
          style={{ top: "50%", transform: "translate(0%, -50%)" }}
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="absolute w-45 self-center text-gray-400 bg-white rounded-full h-8 cursor-pointer text-center"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
      {isCarousel && index !== media.carousel_media.length - 1 && (
        <div
          onClick={() => setIndex(index + 1)}
          className="absolute right-0 cursor-pointer h-20 w-20 flex flex-col justify-center content-center"
          style={{ top: "50%", transform: "translate(0%, -50%)" }}
        >
          <svg
            viewBox="0 0 20 20"
            fill="white"
            className="absolute w-45 self-center text-gray-400 bg-white rounded-full h-8 cursor-pointer text-center"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </svg>
        </div>
      )}
      {isVideo && (
        <div
          className="absolute text-white"
          style={{ top: "50%", left: "50%" }}
        >
          Video
        </div>
      )}
      {isCarousel && (
        <div
          className={"grid grid-flow-col gap-2 bottom-0 absolute"}
          style={{ left: "50%", transform: "translate(-50%, -50%)" }}
        >
          {media.carousel_media.map((c, i) => (
            <div
              key={i}
              className={classNames("bg-white rounded-full h-2 w-2", {
                "h-4 w-4 -mt-1": i === index
              })}
            />
          ))}
        </div>
      )}
    </div>
  )
}
