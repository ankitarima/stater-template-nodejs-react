import { Outlet } from "react-router-dom";
import Header from "@/components/layout/main/header";
import Footer from "@/components/layout/main/footer";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
