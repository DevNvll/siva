import React from "react"
import classNames from "classnames"
export function FooterComponent({ views, currentIndex }) {
  return views.length > 1 ? (
    <div className="fixed top-0 inline-flex self-center justify-center w-full mt-2 space-x-1 text-black">
      {views.map((v, i) => {
        return (
          <div
            className={classNames(
              "w-2 h-px  overflow-hidden bg-white rounded self-center",
              {
                "border-4 border-purple-500": currentIndex === i,
              }
            )}
          />
        )
      })}
    </div>
  ) : null
}
