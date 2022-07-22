import { PropsWithChildren } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { isNil } from "lodash"
import { twMerge } from "tailwind-merge"

interface ContentProps {
  href?: string
  onClick?: () => void
  className?: string
}

const OptionContent = ({
  children,
  href,
  onClick,
  className: cn,
}: PropsWithChildren<ContentProps>) => {
  const { pathname } = useRouter()

  const className = twMerge(
    "block px-4 py-2 text-sm",
    pathname === href ? "bg-gray-100 text-gray-900" : "text-gray-700",
    !isNil(onClick) || !isNil(href)
      ? "cursor-pointer hover:bg-gray-100 hover:text-gray-900"
      : "cursor-default",
    cn
  )

  const isLink = !isNil(href) && isNil(onClick)

  if (isLink)
    return (
      <Link href={href} passHref>
        <a className={className} role="menuitem" tabIndex={-1}>
          {children}
        </a>
      </Link>
    )

  return (
    <span className={className} role="menuitem" tabIndex={-1} onClick={onClick}>
      {children}
    </span>
  )
}

interface Props {
  href?: string
  onClick?: () => void
  text?: string
  show?: boolean
  className?: string
}

const AuthMenuOption = ({ href, onClick, text, show, className }: Props) => {
  if (!show) return null

  return (
    <OptionContent href={href} onClick={onClick} className={className}>
      {text}
    </OptionContent>
  )
}

export { AuthMenuOption }
