import Layout from '../components/layouts/Layout'
import { Component, ComponentType, ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import '@/styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => Component
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page:ReactNode) => <Layout>{page}</Layout>)

  return getLayout(<Component {...pageProps} />)
  }



  export default appWithTranslation(MyApp as ComponentType<AppPropsWithLayout>)
