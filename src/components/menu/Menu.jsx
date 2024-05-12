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
  const pathname = usePathname();

  const listNoti = useDataStore((store) => store.priorityMessage);

  const { fetchpriorityMessage } = useDataStore();

  useEffect(() => {
    fetchpriorityMessage();
  }, [fetchpriorityMessage]);

  const [show, setShow] = useState(false);
  const [ModalName, setModalName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 991.9px)" });

  const detail = useDataStore((store) => store.getDetail);
  const { fetchgetDetail } = useDataStore();

  console.log(detail, "detail");

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
    if (token) {
      fetchgetDetail();
    }
  }, [token, fetchgetDetail]);

  return (
    <>
      {listNoti?.blogs?.length > 0 &&
        listNoti?.careers?.length > 0 &&
        listNoti?.newsEvents?.length > 0 &&
        listNoti?.publications?.length > 0 && (
          <div className="notiTop">
            <marquee>
              {listNoti?.blogs?.map((item, i) => (
                <span key={i}>{item?.title}</span>
              ))}
              {listNoti?.careers?.map((item, i) => (
                <span key={i}>{item?.title}</span>
              ))}
              {listNoti?.newsEvents?.map((item, i) => (
                <span key={i}>{item?.title}</span>
              ))}
              {listNoti?.publications?.map((item, i) => (
                <span key={i}>{item?.title}</span>
              ))}
            </marquee>
          </div>
        )}

      <nav
        className={`navbar navbar-expand-lg navFixed ${stickyClass} ${
          listNoti?.blogs?.length > 0 &&
          listNoti?.careers?.length > 0 &&
          listNoti?.newsEvents?.length > 0 &&
          listNoti?.publications?.length > 0
            ? ""
            : "top-0"
        }`}
      >
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
              <ul className="navbar-nav ms-auto align-items-start align-items-lg-center text-capitalize">
                <li className="nav-item dropdown">
                  <a
                    className={
                      pathname === "/"
                        ? "nav-link  dropdown-toggle active"
                        : "nav-link  dropdown-toggle"
                    }
                    href="#"
                    id="navbarDarkDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Home
                  </a>
                  <ul
                    className={
                      isTabletOrMobile
                        ? "dropdown-menu dropdown-menu-light cole"
                        : "dropdown-menu dropdown-menu-light"
                    }
                    aria-labelledby="navbarDarkDropdownMenuLink"
                  >
                    <li>
                      <Link
                        className={
                          pathname?.includes("/about-us")
                            ? "dropdown-item active"
                            : "dropdown-item"
                        }
                        onClick={() => {
                          handleClose();
                        }}
                        href="/about-us"
                      >
                        about us
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname?.includes("/teams")
                            ? "dropdown-item active"
                            : "dropdown-item"
                        }
                        onClick={() => {
                          handleClose();
                        }}
                        href="/teams"
                      >
                        teams
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname?.includes("/company-structure")
                            ? "dropdown-item active"
                            : "dropdown-item"
                        }
                        onClick={() => {
                          handleClose();
                        }}
                        href="/company-structure"
                      >
                        company structure
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname?.includes("/messages")
                            ? "dropdown-item active"
                            : "dropdown-item"
                        }
                        onClick={() => {
                          handleClose();
                        }}
                        href="/messages"
                      >
                        messages
                      </Link>
                    </li>
                  </ul>
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
                    articles
                  </a>
                  <ul
                    className={
                      isTabletOrMobile
                        ? "dropdown-menu dropdown-menu-light cole"
                        : "dropdown-menu dropdown-menu-light"
                    }
                    aria-labelledby="navbarDarkDropdownMenuLink"
                  >
                    <li>
                      <Link
                        className={
                          pathname?.includes("/publication")
                            ? "dropdown-item active"
                            : "dropdown-item"
                        }
                        onClick={() => {
                          handleClose();
                        }}
                        href="/publication"
                      >
                        publication
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname?.includes("/blog")
                            ? "dropdown-item active"
                            : "dropdown-item"
                        }
                        onClick={() => {
                          handleClose();
                        }}
                        href="/blog"
                      >
                        blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname?.includes("/career")
                            ? "dropdown-item active"
                            : "dropdown-item"
                        }
                        onClick={() => {
                          handleClose();
                        }}
                        href="/career"
                      >
                        career
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          pathname?.includes("/news-event")
                            ? "dropdown-item active"
                            : "dropdown-item"
                        }
                        onClick={() => {
                          handleClose();
                        }}
                        href="/news-event"
                      >
                        news & event
                      </Link>
                    </li>
                  </ul>
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
                    className={
                      isTabletOrMobile
                        ? "dropdown-menu dropdown-menu-light cole"
                        : "dropdown-menu dropdown-menu-light"
                    }
                    aria-labelledby="navbarDarkDropdownMenuLink"
                  >
                    <li>
                      <Link
                        className={
                          pathname?.includes("/emi-calculator")
                            ? "dropdown-item active"
                            : "dropdown-item"
                        }
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
                        className={
                          pathname?.includes("/home-loan")
                            ? "dropdown-item active"
                            : "dropdown-item"
                        }
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

                {detail?.firstName ? (
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
                          : "nav-link loginBtn px-3 py-1"
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
                        ? "nav-link btn-link px-2 mb-2 rounded"
                        : "nav-link btn-link px-3 py-1"
                    }
                    onClick={() => {
                      handleClose();
                    }}
                    href="/booking"
                  >
                    Book Now
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
