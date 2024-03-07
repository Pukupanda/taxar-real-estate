import React from "react";
import Menu from "../menu/Menu";
import Footer from "../footer/Footer";
import Bredthcred from "@/components/bredthcred/Bredthcred";
import { usePathname } from "next/navigation";

function Provider(props) {
  const pathname = usePathname();
  return (
    <>
      <Menu />
      <section className={pathname !== "/" && "bgColor"}>
        <Bredthcred />
        <div className="min-vh-50">{props.children}</div>
      </section>
      <Footer />
    </>
  );
}

export default Provider;
