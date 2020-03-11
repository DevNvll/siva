export default function StoriesList({ stories }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {stories.map(p => {
          if (p.media_type === 8)
            return (
              <a
                key={p.id}
                href={p.carousel_media[0].image_versions2.candidates[0].url}
                target="_blank"
              >
                <img
                  className="object-cover w-full rounded"
                  style={{ height: "500px" }}
                  src={p.carousel_media[0].image_versions2.candidates[0].url}
                />
              </a>
            )
          if (p.media_type === 2)
            return (
              <a
                key={p.id}
                href={p.image_versions2.candidates[0].url}
                target="_blank"
              >
                <img
                  className="object-cover w-full rounded"
                  style={{ height: "500px" }}
                  src={p.image_versions2.candidates[0].url}
                />
              </a>
            )
          return (
            <a
              key={p.id}
              href={p.image_versions2.candidates[0].url}
              target="_blank"
            >
              <img
                className="object-cover w-full rounded"
                style={{ height: "500px" }}
                src={p.image_versions2.candidates[0].url}
              />
            </a>
          )
        })}
      </div>
    </>
  )
}
