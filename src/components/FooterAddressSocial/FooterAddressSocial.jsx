import { FooterAddressApi } from "@/api/apiCall";
import Image from "next/image";
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
        {data?.data?.socialMedia?.map((item, i) => (
          <>
            {item?.url?.includes("http") && (
              <Link
                key={i}
                className="text-dark"
                target="_black"
                href={item?.url?.includes("http") ? item?.url : "#"}
              >
                <i className={`fa-brands ${item?.key}`}></i>
              </Link>
            )}{" "}
          </>
        ))}
        {/* <Link
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
        </Link>{" "} */}
      </p>
      {data?.data?.whatsappNumber && (
        <a
          href={`https://api.whatsapp.com/send?phone=${data?.data?.whatsappNumber
            ?.replaceAll("+", "")
            ?.replaceAll("-", "")
            ?.replaceAll(" ", "")}`}
          target="_blank"
          className="position-fixed fixedBotoRi"
        >
          <Image
            src={"/assets/img/WhatsApp.png"}
            alt=""
            width={50}
            height={50}
            quality={100}
            priority
          />
        </a>
      )}
    </>
  );
}

export default FooterAddressSocial;
