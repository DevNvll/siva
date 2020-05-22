import { useRef, useLayoutEffect, useState } from "react"
import classNames from "classnames"
import {
  FlickingEvent,
  SelectEvent,
  ChangeEvent,
  NeedPanelEvent,
} from "@egjs/flicking"
import Flicking from "@egjs/react-flicking"

export default function Scroll({ children, className }) {
  return (
    <Flicking
      collectStatistics={false}
      gap={25}
      moveType="freeScroll"
      bound
      horizontal
      tag="div"
      className={classNames("w-full", className)}
    >
      {children}
    </Flicking>
  )
}
