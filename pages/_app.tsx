import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { NextPage } from "next"
import Head from "next/head"
import "../wdyr"
import "../styles/globals.css"
import { DefaultLayout } from "layouts/DefaultLayout"

import type { AppInitialProps } from "next/app"

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode
}

type Props = AppInitialProps & {
  Component: Page
}

const getDefaultLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>

function MyApp({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || getDefaultLayout

  return (
    <>
      <Head>
        <title>Website Title</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider>{getLayout(<Component {...pageProps} />)}</SessionProvider>
    </>
  )
}

export type { Page }
export default MyApp
