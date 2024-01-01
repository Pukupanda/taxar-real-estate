"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import Link from "next/link";
import Cookies from "js-cookie";
import UserDropMenu from "../UserDropMenu/UserDropMenu";
import { useDataStore } from "@/api/store/store";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FacebookProvider, CustomChat } from "react-facebook";

function Menu() {
  const [stickyClass, setStickyClass] = useState("");
  const token = Cookies.get("Taxar");
  const { push } = useRouter();
  const pathname = usePathname();

  const [show, setShow] = useState(false);
  const [ModalName, setModalName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991.9px)" });

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
            onClick={() => {
              setModalName("canvas");
              handleShow();
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Offcanvas
            show={ModalName === "canvas" && show}
            onHide={handleClose}
            responsive="lg"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <img src="/assets/img/logo.png" alt="" className="logo" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ul className="navbar-nav ms-auto text-capitalize">
                <li className="nav-item">
                  <Link
                    className={
                      pathname === "/" ? "nav-link active" : "nav-link"
                    }
                    onClick={() => {
                      handleClose();
                    }}
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
                    onClick={() => {
                      handleClose();
                    }}
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
                    onClick={() => {
                      handleClose();
                    }}
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
                    onClick={() => {
                      handleClose();
                    }}
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
                    onClick={() => {
                      handleClose();
                    }}
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
                    onClick={() => {
                      handleClose();
                    }}
                    href="/career"
                  >
                    Career
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    onClick={() => {
                      handleClose();
                    }}
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
                      <Link
                        className="dropdown-item"
                        onClick={() => {
                          handleClose();
                        }}
                        href="/emi-calculator"
                      >
                        EMI Calculator
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => {
                          handleClose();
                        }}
                        href="/home-loan"
                      >
                        Home Loan
                      </Link>
                    </li>
                  </ul>
                </li>

                {detail?.userName ? (
                  <UserDropMenu
                    detail={detail}
                    fetchgetDetail={fetchgetDetail}
                    isTabletOrMobile={isTabletOrMobile}
                    handleClose={handleClose}
                  />
                ) : (
                  <li className="nav-item">
                    <Link
                      className={
                        isTabletOrMobile
                          ? "nav-link loginBtn px-2 mb-2 rounded"
                          : "nav-link loginBtn"
                      }
                      onClick={() => {
                        handleClose();
                      }}
                      href="/login"
                    >
                      login
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link
                    className={
                      isTabletOrMobile
                        ? "nav-link loginBtn px-2 mb-2 rounded"
                        : "nav-link loginBtn"
                    }
                    onClick={() => {
                      handleClose();
                    }}
                    href="/booking"
                  >
                    booking
                  </Link>
                </li>
              </ul>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </nav>
      <FacebookProvider appId="344501761707817" chatSupport>
        <CustomChat pageId="167697663102613" minimized={true} />
      </FacebookProvider>
    </>
  );
}

export default Menu;
