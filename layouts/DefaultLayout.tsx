import { PropsWithChildren } from "react"
import { AuthMenuButton } from "components/menu/AuthMenuButton"
import { MenuLink } from "components/menu/MenuLink"

const year = new Date().getUTCFullYear()

const DefaultLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="flex flex-col h-full min-h-screen w-full min-w-screen pt-4">
      <header className="text-center h-12 flex flex-row justify-left items-center">
        <MenuLink href="/">Home</MenuLink>
        <AuthMenuButton />
      </header>

      <main className="text-center flex-grow pt-8">{children}</main>

      <footer className="text-sm h-10 lowercase flex items-center justify-center">
        &copy; [Your Company] {year}
      </footer>
    </div>
  )
}

export { DefaultLayout }
