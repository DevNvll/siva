import React from "react"
export function ViewComponent({ data, currentIndex, index, ...props }) {
  return (
    <div className="flex flex-col text-black">
      {!data.video ? (
        <img
          src={data.url}
          key={data.url}
          className="mx-auto"
          style={{
            height: "auto",
            maxHeight: "90vh",
            userSelect: "none",
            zIndex: 1000,
          }}
        />
      ) : (
        <video
          controls
          className="mx-auto"
          style={{
            height: "auto",
            maxHeight: "90vh",
            userSelect: "none",
            zIndex: 1000,
          }}
        >
          <source src={data.url} key={data.url} />
        </video>
      )}
    </div>
  )
}
