"use client";
import { useDataStore } from "@/api/store/store";
import Link from "next/link";
import React, { useEffect } from "react";

function FooterAddressSocial() {
  const data = useDataStore((store) => store.FooterAddress);
  const { fetchFooterAddress } = useDataStore();
  useEffect(() => {
    fetchFooterAddress();
  }, []);

  return (
    <>
      <p>
        <i className="fa-solid fa-location-dot"></i> {data?.address}
      </p>
      <p>
        <i className="fa-solid fa-phone"></i> {data?.contactNumber}
      </p>
      <p>
        <i className="fa-solid fa-envelope"></i> {data?.email}
      </p>
      <p className="fs-3">
        <Link
          className="text-dark"
          target="_black"
          href={data?.facebookUrl?.includes("http") ? data?.facebookUrl : "#"}
        >
          <i className="fa-brands fa-square-facebook"></i>
        </Link>{" "}
        <Link
          className="text-dark"
          target="_black"
          href={data?.instaUrl?.includes("http") ? data?.instaUrl : "#"}
        >
          <i className="fa-brands fa-instagram"></i>
        </Link>{" "}
        <Link
          className="text-dark"
          target="_black"
          href={data?.linkedInUrl?.includes("http") ? data?.linkedInUrl : "#"}
        >
          <i className="fa-brands fa-linkedin"></i>
        </Link>{" "}
        <Link
          className="text-dark"
          target="_black"
          href={data?.twitterUrl?.includes("http") ? data?.twitterUrl : "#"}
        >
          <i className="fa-brands fa-square-twitter"></i>
        </Link>{" "}
      </p>
    </>
  );
}

export default FooterAddressSocial;
