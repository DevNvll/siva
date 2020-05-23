import classNames from "classnames"
import Flicking from "@egjs/react-flicking"

export default function Scroll({ children, className }) {
  return (
    <Flicking
      collectStatistics={false}
      gap={25}
      moveType="freeScroll"
      bound
      horizontal
      zIndex={1}
      tag="div"
      className={classNames("w-full", className)}
    >
      {children}
    </Flicking>
  )
}
