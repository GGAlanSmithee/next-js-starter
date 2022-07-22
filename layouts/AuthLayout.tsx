import { PropsWithChildren } from "react"
import { BackToHome } from "components/auth/BackToHome"

const year = new Date().getUTCFullYear()

const AuthLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      {children}

      <BackToHome />
    </>
  )
}

export { AuthLayout }
