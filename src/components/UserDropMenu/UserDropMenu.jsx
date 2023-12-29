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
        props.fetchgetDetail();
        push("/");
      }
    });
  };

  return (
    <>
      <li className="nav-item position-relative showProfile">
        <span className="nav-link loginBtn" role="button">
          {props.detail?.userName}
        </span>
        <div className="profileDrop">
          <Link
            href="/edit-profile"
            className={
              pathname?.includes("edit-profile") ? "themeOrg" : "themeGrn"
            }
          >
            Edit Profile
          </Link>
          <Link
            href="/my-property"
            className={
              pathname?.includes("my-property") ? "themeOrg" : "themeGrn"
            }
          >
            my property
          </Link>
          <Link
            href="/my-booking"
            className={
              pathname?.includes("my-booking") ? "themeOrg" : "themeGrn"
            }
          >
            my booking
          </Link>
          <Link
            href="/liked-property"
            className={
              pathname?.includes("liked-property") ? "themeOrg" : "themeGrn"
            }
          >
            liked property
          </Link>
          <Link
            href="/change-password"
            className={
              pathname?.includes("change-password") ? "themeOrg" : "themeGrn"
            }
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
