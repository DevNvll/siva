import { useRef, useLayoutEffect, useState } from "react"
import classNames from "classnames"

function ChevronRight({ className }) {
  return (
    <svg fill="currentColor" viewBox="0 0 20 20" className={className}>
      <path
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  )
}

function ChevronLeft({ className }) {
  return (
    <svg fill="currentColor" viewBox="0 0 20 20" className={className}>
      <path
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  )
}

Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t + b
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

function scrollLeft(element, change, duration) {
  var start = element.scrollLeft,
    currentTime = 0,
    increment = 20

  var animateScroll = function () {
    currentTime += increment
    var val = Math.easeInOutQuad(currentTime, start, change, duration)
    element.scrollLeft = val
    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    }
  }
  animateScroll()
}

export default function Scroll({ children, className }) {
  const ref = useRef()
  const [hasScroll, setHasScroll] = useState(false)
  const [[hasScrollLeft, hasScrollRight], setHasScrollSides] = useState([
    false,
    false,
  ])

  useLayoutEffect(() => {
    const element = ref.current
    setHasScrollSides([element.scrollLeft > 0, true])
    setHasScroll(element.scrollWidth > element.clientWidth)
  }, [])

  function onLeft() {
    const element = ref.current
    scrollLeft(element, -300, 500)
  }

  function onRight() {
    const element = ref.current
    scrollLeft(element, 300, 500)
  }

  function handleScroll(e) {
    const element = e.currentTarget
    const hasFullyScrolled =
      element.scrollWidth - element.scrollLeft <= element.clientWidth
    setHasScrollSides([element.scrollLeft, !hasFullyScrolled])
  }

  return (
    <div className={"inline-flex relative " + className}>
      <div
        className="absolute left-0 flex flex-col h-full px-2 opacity-75 cursor-pointer hover:opacity-100"
        onClick={onLeft}
      >
        <button
          className={classNames(
            "text-purple-500 rounded-full focus:outline-none bg-gray-100 my-auto shadow-xl",
            { hidden: !hasScroll || !hasScrollLeft }
          )}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      </div>
      <div
        className="flex inline overflow-x-auto md:overflow-hidden"
        ref={ref}
        onScroll={handleScroll}
      >
        {children}
      </div>
      <div
        className="absolute right-0 flex flex-col h-full px-2 opacity-75 cursor-pointer hover:opacity-100"
        onClick={onRight}
      >
        <button
          className={classNames(
            "text-purple-500 rounded-full focus:outline-none bg-gray-100 my-auto shadow-xl",
            { hidden: !hasScroll || !hasScrollRight }
          )}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  )
}
