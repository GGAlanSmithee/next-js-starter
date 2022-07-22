import { signIn, signOut, useSession } from "next-auth/react"
import { useCallback, useRef, useState } from "react"
import { useRouter } from "next/router"
import { twMerge } from "tailwind-merge"
import { useDocumentKeyup } from "hooks/use-document-keyup"
import { useOutsideClick } from "hooks/use-outside-click"
import { AuthMenuOption } from "./AuthMenuOption"

const AuthMenuButton = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { data: session, status } = useSession()
  const { push } = useRouter()
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [setOpen])

  useOutsideClick(ref, close)
  useDocumentKeyup("Escape", close)

  const signUp = useCallback(() => {
    push("/auth/sign-up")
  }, [push])

  // NOTE(Alan): Animate user menu visibility after authentication
  const className = twMerge(
    "absolute right-8 text-left transition-opacity delay-300 duration-300 del",
    status === "loading" ? "opacity-0" : "opacity-100"
  )

  return (
    <>
      <div className={className} ref={ref}>
        <div>
          <button
            onClick={() => setOpen((wasOpen) => !wasOpen)}
            type="button"
            className="w-[8rem] line inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <span className="truncate">
              {status === "loading" ? " " : !!session ? session.user?.email : "Sign in"}
            </span>

            {/* Hero icon name: solid/chevron-down */}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {open && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="" role="none">
              <AuthMenuOption
                href="auth/account-settings"
                text="Account settings"
                show={!!session}
              />

              <AuthMenuOption show={!!session} onClick={() => signOut()} text="Sign out" />

              <AuthMenuOption show={!session} onClick={() => signIn()} text="Sign in" />

              <AuthMenuOption show={!session} onClick={() => signUp()} text="Sign up" />

              {!!session && <hr />}

              <AuthMenuOption
                className="bg-sky-700 text-white rounded-b"
                show={!!session}
                text={session?.user?.email || ""}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export { AuthMenuButton }
