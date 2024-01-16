"use client";
import { LogoutApi } from "@/api/apiCall";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import "./style.css";
import { toast } from "react-toastify";

function UserDropMenu(props) {
  const { push } = useRouter();
  const pathname = usePathname();

  const logout = () => {
    LogoutApi().then((res) => {
      if (res?.code === 1) {
        toast.success(res?.massege);
        Cookies.remove("Taxar");
        Cookies.remove("property");
        Cookies.remove("project");
        props.fetchgetDetail();
        push("/");
      }
    });
  };

  return (
    <>
      <li
        className={
          props.isTabletOrMobile
            ? "nav-item position-relative showProfile pe-0"
            : "nav-item position-relative showProfile"
        }
      >
        <span
          className={
            props.isTabletOrMobile
              ? "nav-link loginBtn px-2 mb-2 rounded"
              : "nav-link loginBtn px-3 py-1"
          }
          role="button"
        >
          {props.detail?.userName}
        </span>
        <div className="profileDrop">
          <Link
            href="/edit-profile"
            className={
              pathname?.includes("edit-profile") ? "themeOrg" : "themeGrn"
            }
            onClick={() => {
              props.handleClose();
            }}
          >
            Edit Profile
          </Link>
          <Link
            href="/my-property"
            className={
              pathname?.includes("my-property") ? "themeOrg" : "themeGrn"
            }
            onClick={() => {
              props.handleClose();
            }}
          >
            my property
          </Link>
          <Link
            href="/my-booking"
            className={
              pathname?.includes("my-booking") ? "themeOrg" : "themeGrn"
            }
            onClick={() => {
              props.handleClose();
            }}
          >
            my booking
          </Link>
          <Link
            href="/liked-property"
            className={
              pathname?.includes("liked-property") ? "themeOrg" : "themeGrn"
            }
            onClick={() => {
              props.handleClose();
            }}
          >
            liked property
          </Link>
          <Link
            href="/change-password"
            className={
              pathname?.includes("change-password") ? "themeOrg" : "themeGrn"
            }
            onClick={() => {
              props.handleClose();
            }}
          >
            change password
          </Link>
          <div className="text-center">
            <span
              role="button"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </span>
          </div>
        </div>
      </li>
    </>
  );
}

export default UserDropMenu;
