import { getProviders, getSession, signIn } from "next-auth/react"
import { ChangeEvent, ReactNode, useCallback, useState } from "react"
import { NextPageContext } from "next"
import Link from "next/link"
import { Page } from "pages/_app"
import { AuthLayout } from "layouts/AuthLayout"

interface Values {
  email?: string
  password?: string
  repeatedPassword?: string
}

interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>
}

const SignUpPage: Page<Props> = ({ providers }) => {
  const [error, setError] = useState<string>()
  const [values, setValues] = useState<Values>({})

  const setValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setError(undefined)

      setValues({
        ...values,
        [e.target.name]: e.target.value?.toString(),
      })
    },
    [values, setValues, setError]
  )

  const register = useCallback(async () => {
    setError(undefined)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (res.status !== 200) {
        setError(await res.text())
      } else {
        await signIn(providers?.credentials.id, {
          callbackUrl: "/auth/signed-up",
          redirect: true,
          ...values,
        })
      }
    } catch (e) {
      if (e instanceof Error) setError(e.message)
    }
  }, [values, providers])

  if (!providers?.credentials) return null

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-gray-200">
      <div className="w-full p-6 m-auto bg-white rounded-md border border-gray-100 shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-sky-700">Sign up</h1>

        <div className="mt-6 mb-2">
          <label htmlFor="email" className={`block text-sm font-semibold text-gray-800`}>
            email
          </label>

          <input
            autoFocus
            name="email"
            type="email"
            value={values.email || ""}
            onChange={setValue}
            onKeyUp={(e) => e.code === "Enter" && register()}
            className={`block w-full px-4 py-2 mt-1 text-sky-700 bg-white border rounded-md focus:outline-none ${
              error?.includes("email") ? "border border-red-500" : "focus:border-sky-400"
            }`}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
            password
          </label>

          <input
            name="password"
            type="password"
            value={values.password || ""}
            onChange={setValue}
            onKeyUp={(e) => e.code === "Enter" && register()}
            className={`block w-full px-4 py-2 mt-1 text-sky-700 bg-white border rounded-md focus:outline-none ${
              error?.includes("password") ? "border border-red-500" : "focus:border-sky-400"
            }`}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
            repeat password
          </label>

          <input
            name="repeatedPassword"
            type="password"
            value={values.repeatedPassword || ""}
            onChange={setValue}
            onKeyUp={(e) => e.code === "Enter" && register()}
            className={`block w-full px-4 py-2 mt-1 text-sky-700 bg-white border rounded-md focus:outline-none ${
              error?.includes("passwords") ? "border border-red-500" : "focus:border-sky-400"
            }`}
          />
        </div>

        <div className="min-h-[24px] italic text-red-500">{error}</div>

        <div className="mt-3">
          <button
            onClick={register}
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-sky-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600"
          >
            Register
          </button>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            Already have an account?
            <span className="ml-1 font-medium text-sky-600 hover:underline">
              <Link href="/auth/sign-in">Sing in</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

const getServerSideProps = async (context: NextPageContext) => {
  const { req } = context
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: { destination: "/" },
    }
  }

  const providers = await getProviders()

  return { props: { providers } }
}

SignUpPage.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>

export { getServerSideProps }
export default SignUpPage
