import React from "react";

import Bredthcred from "@/components/bredthcred/Bredthcred";

import { usePathname } from "next/navigation";

function Provider(props) {
  // const pathname = usePathname();
  return (
    <>
      <section className={props.pathname !== "/" && "bgColor"}>
        {/* bgColor */}
        <Bredthcred />
        <div className="min-vh-50 pb-3">{props.children}</div>
      </section>
    </>
  );
}

export default Provider;
