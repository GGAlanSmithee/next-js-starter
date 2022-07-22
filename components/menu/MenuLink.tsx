import { PropsWithChildren, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { twMerge } from "tailwind-merge"

interface Props {
  href: string
}

const MenuLink = ({ children, href }: PropsWithChildren<Props>) => {
  const { pathname } = useRouter()

  const active = useMemo(() => pathname === href, [pathname, href])

  const className = twMerge(
    "mx-2 py-0.5 px-2  select-none active:underline hover:underline underline-offset-2",
    active ? "text-sky-500 underline" : "text-sky-400 active:text-sky-600 cursor-pointer"
  )

  return (
    <span className={className} title={active ? "You are here" : "navigate here"}>
      {active ? <>{children}</> : <Link href={href}>{children}</Link>}
    </span>
  )
}

export { MenuLink }
