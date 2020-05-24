import classNames from "classnames"
import Button from "components/Button"

export default function UserInfo({
  profile,
  hasStories,
  toggleFavorite,
  isFavorite,
  goToStories,
}) {
  return (
    <div className="container flex flex-col w-full p-4 mx-auto my-0 text-white md:flex-row sm:my-12">
      <div className="flex flex-col mx-auto md:flex-row md:inline-flex">
        <img
          src={profile.profile_pic_url}
          onClick={goToStories}
          className={classNames("rounded-full shadow-lg mx-auto", {
            "border-pink-800 border-solid border-4 cursor-pointer": hasStories,
          })}
        />
        <div className="flex-col self-center flex-auto w-full h-auto mt-4 md:mt-0 md:pl-8">
          <div className="flex flex-row self-center justify-center w-full md:justify-start">
            <h1 className="pr-4 text-2xl font-bold text-white">
              {profile.username}
            </h1>
            <Button onClick={() => toggleFavorite(profile)}>
              {isFavorite ? "Unfavorite" : "Favorite"}
            </Button>
          </div>
          <div className="flex justify-between inline w-full my-2 space-x-2 ">
            <p>
              <b>{profile.media_count}</b> Posts
            </p>
            <p>
              <b>{profile.follower_count}</b> Followers
            </p>
            <p>
              <b>{profile.following_count}</b> Following
            </p>
          </div>
          <p className="pr-4 text-lg text-white">{profile.full_name}</p>
          <div className="flex-wrap">{profile.biography}</div>
        </div>
      </div>
    </div>
  )
}
