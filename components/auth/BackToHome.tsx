import Link from "next/link"

const BackToHome = () => {
  return (
    <div className="absolute top-4 left-6 uppercase">
      <Link href="/" tabIndex={-1}>
        <span
          title="home"
          className="font-bold cursor-pointer text-4xl text-sky-700 hover:text-sky-600 active:text-sky-600"
        >
          &#8634;
        </span>
      </Link>
    </div>
  )
}

export { BackToHome }
