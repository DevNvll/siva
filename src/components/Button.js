import cx from "classnames"

export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className={cx(
        "text-white font-bold rounded bg-purple-600 hover:bg-purple-700 active:bg-purple-900 p-2 font-bold shadow-md focus:outline-none",
        props.className
      )}
    >
      {children}
    </button>
  )
}
