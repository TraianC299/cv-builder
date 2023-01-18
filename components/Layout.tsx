// components/layout.js

import Footer from './home/Footer'
import Menu from './home/Menu'

export default function Layout({ children }) {
  return (
    <>
      <Menu />
      <main>{children}</main>
      <Footer />
    </>
  )
}