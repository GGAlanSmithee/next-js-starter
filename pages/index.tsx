import { getSession } from "next-auth/react"
import { NextPageContext } from "next"
import Link from "next/link"
import { Page } from "./_app"

interface Props {
  session: Awaited<ReturnType<typeof getSession>>
}

const HomePage: Page<Props> = ({ session }) => {
  return (
    <div>
      {session ? (
        <div>Logged in as {session.user?.email}</div>
      ) : (
        <div>
          Please{" "}
          <Link href="/auth/sign-in">
            <span className="text-sky-600 underline underline-offset-2 cursor-pointer">login</span>
          </Link>
        </div>
      )}
    </div>
  )
}

const getServerSideProps = async (context: NextPageContext) => {
  const { req } = context
  const session = await getSession({ req })

  return { props: { session } }
}

export { getServerSideProps }
export default HomePage
