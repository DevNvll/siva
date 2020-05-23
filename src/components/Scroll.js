import { useRef } from "react"

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

  console.log(start)

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

export default function Scroll({ children, className, items }) {
  const ref = useRef()
  function onLeft() {
    scrollLeft(ref.current, -300, 500)
  }

  function onRight() {
    scrollLeft(ref.current, 300, 500)
  }

  return (
    <div className={"inline-flex w-full " + className}>
      <button
        onClick={onLeft}
        className="pl-2 text-white rounded opacity-75 hover:opacity-100 focus:outline-none"
      >
        <ChevronLeft className="w-8 h-8 mr-4" />
      </button>
      <div className="flex inline overflow-x-auto md:overflow-hidden" ref={ref}>
        {children}
      </div>
      <button
        onClick={onRight}
        className="pr-2 text-white rounded opacity-75 hover:opacity-100 focus:outline-none"
      >
        <ChevronRight className="w-8 h-8 ml-4" />
      </button>
    </div>
  )
}
