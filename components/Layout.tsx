// components/layout.js

import Footer from './home/Footer'
import Menu from './home/Menu'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Menu />
      <main>{children}</main>
      <Footer />
    </>
  )
}