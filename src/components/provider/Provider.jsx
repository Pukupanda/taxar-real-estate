import React from "react";
import Menu from "../menu/Menu";
import Footer from "../footer/Footer";
import Bredthcred from "@/components/bredthcred/Bredthcred";

function Provider(props) {
  return (
    <>
      <Menu />
      <section className={props.pathname !== "/" && "bgColor"}>
        <Bredthcred />
        <div className="min-vh-50 pb-3">{props.children}</div>
      </section>
      <Footer />
    </>
  );
}

export default Provider;
