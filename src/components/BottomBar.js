export default function BottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-900 h-16">
      <ul className="flex justify-around h-full">
        <li className="mr-3 flex self-center">
          <a
            className="inline-block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
            href="#"
          >
            Home
          </a>
        </li>
        <li className="mr-3 flex self-center">
          <a
            className="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
            href="#"
          >
            Search
          </a>
        </li>
      </ul>
    </div>
  )
}
