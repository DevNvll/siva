import classNames from "classnames"
import LockIcon from "./icons/Lock"

export default function UserCard({ profile }) {
  return (
    <div
      className="rounded bg-white shadow-md p-4 flex flex-row cursor-pointer hover:bg-purple-100 w-full"
      style={{ minWidth: "max-content" }}
    >
      <img
        src={profile.profile_pic_url}
        className={classNames("w-20 h-20 rounded-full mr-4", {
          "border-4 border-solid border-pink-700": profile.latest_reel_media
        })}
      />

      <div>
        <p className="text-xl font-bold flex content-center">
          @{profile.username}
          {profile.is_private && (
            <small
              className="text-sm h-full self-center ml-2"
              alt="Private Profile"
            >
              <LockIcon className="w-4 h-4" />
            </small>
          )}
        </p>
        <p>{profile.full_name}</p>
      </div>
    </div>
  )
}
