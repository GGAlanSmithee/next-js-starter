import { getSession, signOut } from "next-auth/react"
import { ReactNode } from "react"
import { NextPageContext } from "next"
import { Session } from "next-auth"
import { format } from "date-fns"
import { Page } from "pages/_app"
import { AuthLayout } from "layouts/AuthLayout"

interface Props {
  session: Session
}

const AccountSettingsPage: Page<Props> = ({ session }) => {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-gray-200">
      <div className="w-full p-6 m-auto bg-white rounded-md border border-gray-100 shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-sky-700">Account settings</h1>

        <hr className="mt-3 mb-3" />

        <div className="mb-2">
          <dl className="leading-7">
            <dt className="float-left w-32">email</dt>
            <dd>{session.user?.email}</dd>

            <dt className="float-left w-32">session expires</dt>
            <dd>{format(Date.parse(session.expires), "yyyy-MM-dd")}</dd>
          </dl>
        </div>

        <div className="mt-3">
          <button
            onClick={() => signOut()}
            className="w-32 float-right px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

const getServerSideProps = async (context: NextPageContext) => {
  const { req } = context
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: { destination: "/auth/sign-in" },
    }
  }

  return { props: { session } }
}

AccountSettingsPage.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>

export { getServerSideProps }
export default AccountSettingsPage
