import classNames from "classnames"
import Button from "components/Button"

export default function UserInfo({
  profile,
  hasStories,
  toggleFavorite,
  isFavorite,
  goToStories
}) {
  return (
    <div className="flex flex-col md:flex-row text-white self-center p-4 container">
      <img
        src={profile.profile_pic_url}
        onClick={goToStories}
        className={classNames(
          "rounded-full shadow-lg self-center md:mr-12 sm:m-12",
          { "border-pink-800 border-solid border-4 cursor-pointer": hasStories }
        )}
      />
      <div className="flex-auto flex-col w-1/2 h-auto pl-8 self-center w-full">
        <div className="flex flex-row  self-center w-full justify-center md:justify-start">
          <h1 className="text-2xl font-bold text-white pr-4">
            {profile.username}
          </h1>
          <Button onClick={() => toggleFavorite(profile)}>
            {isFavorite ? "Unfavorite" : "Favorite"}
          </Button>
        </div>
        <div className="flex flex-row justify-between w-full md:w-1/2 my-2">
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
        <p className="text-lg text-white pr-4">{profile.full_name}</p>
        <div className="flex-wrap">{profile.biography}</div>
      </div>
    </div>
  )
}
