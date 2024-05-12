import React from "react";
import "./index.css";
import Link from "next/link";
import Image from "next/image";
function HeroSection() {
  return (
    <div className="hero__container">
      <div className="hero__overlay">
        <div className="hero__img__container">
          {/* <img src="/assets/img/mainBanner.png" className="hero__img" /> */}
        </div>
        <div className="hero__card ">
          <div className="">
            <h1 className="mb-3 text-white ">
              Connecting People to Property and Prosperity
            </h1>
            <Link
              className="btn-link hero__button fs-5 py-2 px-4 rounded-pill w-100"
              href="/booking"
            >
              Book Now
            </Link>
          </div>
          <Image
            src="/assets/img/left-img.png"
            alt=""
            fill
            quality={100}
            priority
            className="position-static"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
