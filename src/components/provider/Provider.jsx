import React from "react";
import Menu from "../menu/Menu";
import Footer from "../footer/Footer";
import Bredthcred from "@/components/bredthcred/Bredthcred";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";

function Provider(props) {
  // const pathname = usePathname();
  return (
    <>
      <Menu />
      <section className={props.pathname !== "/" && "bgColor"}>
        {/* bgColor */}
        <Bredthcred />
        <div className="min-vh-50 pb-3">{props.children}</div>
      </section>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Provider;
