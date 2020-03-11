import { useRouter } from "next/router"
import Link from "next/link"

export default function Navbar() {
  const router = useRouter()
  return (
    <div className="flex bg-purple-800 shadow-sm fixed top-0 inset-x-0 z-100 h-16 items-center z-50">
      <div className="w-full max-w-screen-xl relative mx-auto px-6">
        <div className="flex items-center -mx-6">
          <div className="lg:w-1/4 xl:w-1/5 pl-6 pr-6 lg:pr-8 flex justify-center">
            <Link href="/">
              <a className="text-white font-bold font-xl2">SIVA</a>
            </Link>
          </div>
          <div className="flex flex-grow lg:w-3/4 xl:w-4/5 w-full">
            <form
              autocomplete="off"
              className="w-full flex mx-auto"
              onSubmit={e => {
                e.preventDefault()
                router.push("/u/" + e.target.username.value)
              }}
            >
              <input
                name="username"
                className="flex flex-grow transition-colors duration-100 ease-in-out focus:outline-0 border border-transparent focus:bg-white placeholder-gray-500 focus:placeholder-gray-800 rounded bg-gray-700 py-2 pr-4 pl-4 block m-4 md:m-0 appearance-none leading-normal ds-input outline-none hover:bg-gray-500 placeholder-gray-900"
                placeholder="Search..."
                type="text"
              />
            </form>
          </div>
          <div className="lg:w-1/4 xl:w-1/5 pl-6 pr-6 lg:pr-8 flex justify-center hidden md:flex">
            {/* <p className="text-white font-bold font-xl2">v1.0</p> */}
          </div>
        </div>
      </div>
    </div>
  )
}
