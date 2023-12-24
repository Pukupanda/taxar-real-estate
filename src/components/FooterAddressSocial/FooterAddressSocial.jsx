import { FooterAddressApi } from "@/api/apiCall";
import Link from "next/link";
export const dynamic = true;

async function FooterAddressSocial() {
  const data = await FooterAddressApi();

  return (
    <>
      <p>
        <i className="fa-solid fa-location-dot"></i> {data?.data?.address}
      </p>
      <p>
        <i className="fa-solid fa-phone"></i> {data?.data?.contactNumber}
      </p>
      <p>
        <i className="fa-solid fa-envelope"></i> {data?.data?.email}
      </p>
      <p className="fs-3">
        <Link
          className="text-dark"
          target="_black"
          href={
            data?.data?.facebookUrl?.includes("http")
              ? data?.data?.facebookUrl
              : "#"
          }
        >
          <i className="fa-brands fa-square-facebook"></i>
        </Link>{" "}
        <Link
          className="text-dark"
          target="_black"
          href={
            data?.data?.instaUrl?.includes("http") ? data?.data?.instaUrl : "#"
          }
        >
          <i className="fa-brands fa-instagram"></i>
        </Link>{" "}
        <Link
          className="text-dark"
          target="_black"
          href={
            data?.data?.linkedInUrl?.includes("http")
              ? data?.data?.linkedInUrl
              : "#"
          }
        >
          <i className="fa-brands fa-linkedin"></i>
        </Link>{" "}
        <Link
          className="text-dark"
          target="_black"
          href={
            data?.data?.twitterUrl?.includes("http")
              ? data?.data?.twitterUrl
              : "#"
          }
        >
          <i className="fa-brands fa-square-twitter"></i>
        </Link>{" "}
      </p>
    </>
  );
}

export default FooterAddressSocial;
