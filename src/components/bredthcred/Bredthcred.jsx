"use client";
import { usePathname } from "next/navigation";
import React from "react";

function Bredthcred(props) {
  const pathname = usePathname();
  const path = pathname?.split("/");
  // console.log(pathname, "path");
  return (
    <>
      {pathname !== "/" ? (
        <section className="bgColor">
          <div className="container text-capitalize text-center">
            <h3 className="fw-bold Roboto themeGrn">
              {pathname?.includes("/publication/detail")
                ? path?.[2]?.replaceAll("-", " ")
                : path?.[1]?.replaceAll("-", " ")}
            </h3>
            {/* <p>Home/{path?.[1]?.replaceAll("-", " ")}</p> */}
          </div>
        </section>
      ) : null}
    </>
  );
}

export default Bredthcred;
