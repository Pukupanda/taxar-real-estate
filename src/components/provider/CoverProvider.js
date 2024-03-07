"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Bredthcred from "@/components/bredthcred/Bredthcred";

function CoverProvider() {
  const pathname = usePathname();
  return (
    <>
      <section className={pathname !== "/" && "bgColor"}>
        <Bredthcred />
        <div className="min-vh-50">{props.children}</div>
      </section>
    </>
  );
}

export default CoverProvider;
