import React from "react"
export function ViewComponent({ data, currentIndex }) {
  return (
    <div className="flex flex-col text-black">
      {!data.video ? (
        <img
          src={data.url}
          className="self-center "
          style={{ height: "auto", maxHeight: "100vh" }}
        />
      ) : (
        <video controls className="self-center" style={{ height: "90vh" }}>
          <source src={data.url} />
        </video>
      )}
    </div>
  )
}
