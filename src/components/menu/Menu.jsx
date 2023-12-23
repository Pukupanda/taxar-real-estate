"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import Link from "next/link";
import Cookies from "js-cookie";
import UserDropMenu from "../UserDropMenu/UserDropMenu";
import { useDataStore } from "@/api/store/store";
import { usePathname, useRouter } from "next/navigation";

function Menu() {
  const [stickyClass, setStickyClass] = useState("");
  const token = Cookies.get("Taxar");
  const { push } = useRouter();
  const pathname = usePathname();

  const detail = useDataStore((store) => store.getDetail);
  const { fetchgetDetail } = useDataStore();

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 10 ? setStickyClass("active") : setStickyClass("");
    }
  };

  useEffect(() => {
    fetchgetDetail();
  }, [token]);

  return (
    <>
      <nav className={`navbar navbar-expand-lg navFixed ${stickyClass}`}>
        <div className="container">
          <Link className="navbar-brand py-0" href="/">
            <img src="/assets/img/logo.png" alt="" className="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={pathname === "/" ? "nav-link active" : "nav-link"}
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    pathname?.includes("/about-us")
                      ? "nav-link active"
                      : "nav-link"
                  }
                  href="/about-us"
                >
                  about us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    pathname?.includes("/projects")
                      ? "nav-link active"
                      : "nav-link"
                  }
                  href="/projects"
                >
                  projects
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    pathname?.includes("/teams")
                      ? "nav-link active"
                      : "nav-link"
                  }
                  href="/teams"
                >
                  teams
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    pathname?.includes("/publication")
                      ? "nav-link active"
                      : "nav-link"
                  }
                  href="/publication"
                >
                  Publication
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    pathname?.includes("/career")
                      ? "nav-link active"
                      : "nav-link"
                  }
                  href="/career"
                >
                  Career
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDarkDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  tool
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-light"
                  aria-labelledby="navbarDarkDropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" href="#">
                      EMI Calculator
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Home Loan
                    </Link>
                  </li>
                </ul>
              </li>

              {detail?.userName ? (
                <UserDropMenu detail={detail} fetchgetDetail={fetchgetDetail} />
              ) : (
                <li className="nav-item">
                  <Link className="nav-link loginBtn" href="/login">
                    login
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link bookingBtn" href="/booking">
                  booking
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Menu;
