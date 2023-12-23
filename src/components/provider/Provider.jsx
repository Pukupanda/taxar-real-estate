import React from "react";
import Menu from "../menu/Menu";
import Footer from "../footer/Footer";
import Bredthcred from "@/components/bredthcred/Bredthcred";

function Provider(props) {
  return (
    <>
      <Menu />
      <Bredthcred />
      {props.children}
      <Footer />
    </>
  );
}

export default Provider;
