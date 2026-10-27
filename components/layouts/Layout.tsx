// components/layout.js

import Footer from "../home/Footer";
import DektopNav from "./DesktopNav";
import PhoneNav from "./PhoneNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DektopNav />
      <PhoneNav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
