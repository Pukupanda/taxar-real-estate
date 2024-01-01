import Link from "next/link";
import React from "react";
import FooterAddressSocial from "../FooterAddressSocial/FooterAddressSocial";
import moment from "moment";

function Footer() {
  return (
    <>
      <footer className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-4 col-lg-4 mb-3">
              <img src="/assets/img/logo.png" alt="" className="logo" />
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4 mb-3">
              <h4>Links</h4>
              <ul className="list-unstyled m-0 p-0 ulGrid">
                <li className="">
                  <Link href="/about-us" className="text-dark">
                    About Us
                  </Link>
                </li>
                <li className="">
                  <Link href="/projects" className="text-dark">
                    Projects
                  </Link>
                </li>
                <li className="">
                  <Link href="/teams" className="text-dark">
                    Teams
                  </Link>
                </li>
                <li className="">
                  <Link href="/contact-us" className="text-dark">
                    Contact Us
                  </Link>
                </li>
                <li className="">
                  <Link href="/privacy-policy" className="text-dark">
                    Privacy Policy
                  </Link>
                </li>
                <li className="">
                  <Link href="/term-condition" className="text-dark">
                    Terms & Conditions
                  </Link>
                </li>
                <li className="">
                  <Link href="/faq" className="text-dark">
                    FAQ&apos;s
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4 mb-3">
              <h4>Address</h4>
              <FooterAddressSocial />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12">
              <hr />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 text-center">
              All Rights Reserved &copy; Taxar Real Estate{" "}
              {moment(new Date()).format("YYYY")}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
