import { ReactNode } from "react"
import Link from "next/link"
import { Page } from "pages/_app"
import { AuthLayout } from "layouts/AuthLayout"
import { Emoji } from "components/Emoji"

const SignedUpPage: Page = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-xl text-sky-800 font-bold uppercase">
        Welcome ! <Emoji label="celebrate" symbol="🎉" />
      </h1>

      <h2 className="text-g mt-2">Your account has been registered.</h2>

      <span className="lowercase mt-6 text-sky-700 underline cursor-pointer">
        <Link href="/">Home</Link>
      </span>
    </div>
  )
}

SignedUpPage.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>

export default SignedUpPage
