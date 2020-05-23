import { useState } from "react"
import classNames from "classnames"
import saveFile from "../../utils/saveFile"

import Button from "components/Button"

export default function MediaCard({ media, setOpenedImage }) {
  const [index, setIndex] = useState(0)

  const isCarousel = media.media_type === 8

  const currentObject = isCarousel ? media.carousel_media[index] : media

  const isVideo = currentObject.media_type === 2
  const externalCurrentUrl = isVideo
    ? currentObject.video_versions[0].url
    : currentObject.image_versions2.candidates[0].url
  const currentUrl = isVideo
    ? currentObject.video_versions[0].url
    : currentObject.image_versions2.candidates[0].url

  return (
    <div className="relative">
      <div className="relative flex content-center justify-center w-full h-full bg-black cursor-pointer">
        {(isVideo && (
          <video
            controls
            autoPlay={false}
            className="self-center w-full bg-black rounded"
            style={{ height: "500px" }}
            poster={currentObject.image_versions2.candidates[0].url}
          >
            <source src={currentUrl} type="video/mp4"></source>
          </video>
        )) || (
          <img
            className="relative object-cover w-full rounded"
            style={{ height: "500px" }}
            src={currentUrl}
            onClick={() => {
              setOpenedImage([{ url: externalCurrentUrl }])
            }}
          />
        )}
      </div>
      <div className="absolute top-0 left-0 flex flex-col w-full h-auto rounded ">
        <div className="self-end p-4">
          <a href={externalCurrentUrl} target="_blank">
            <Button className="mr-2">Open</Button>
          </a>

          <Button
            onClick={() => {
              saveFile(externalCurrentUrl)
            }}
          >
            Download
          </Button>
        </div>
      </div>
      {isCarousel && index !== 0 && (
        <div
          onClick={() => setIndex(index - 1)}
          className="absolute left-0 flex flex-col content-center justify-center w-20 h-20 cursor-pointer"
          style={{ top: "50%", transform: "translate(0%, -50%)" }}
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="absolute self-center h-8 text-center text-gray-400 bg-white rounded-full cursor-pointer w-45"
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
          className="absolute right-0 flex flex-col content-center justify-center w-20 h-20 cursor-pointer"
          style={{ top: "50%", transform: "translate(0%, -50%)" }}
        >
          <svg
            viewBox="0 0 20 20"
            fill="white"
            className="absolute self-center h-8 text-center text-gray-400 bg-white rounded-full cursor-pointer w-45"
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
      {/* {isVideo && (
        <div
          className="absolute text-white"
          style={{ top: "50%", left: "50%" }}
        >
          <Play className="text-white shadow-lg" />
        </div>
      )} */}
      {isCarousel && (
        <div
          className={"grid grid-flow-col gap-2 bottom-0 absolute"}
          style={{ left: "50%", transform: "translate(-50%, -50%)" }}
        >
          {media.carousel_media.map((c, i) => (
            <div
              key={i}
              className={classNames(
                "bg-white opacity-50 rounded-full h-2 w-2",
                {
                  "opacity-100": i === index,
                }
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
