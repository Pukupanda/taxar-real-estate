"use client";
import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./style.css";
import Image from "next/image";
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";

function ImageSliderWithThumnail(props) {
  let [isOpen, setIsOpen] = useState(false);
  const images = props.images?.map((item) => {
    return {
      src: item?.image?.includes("http")
        ? item?.image
        : "/assets/img/dummyImage.png",
      alt: item?.image?.includes("http")
        ? item?.image
        : "/assets/img/dummyImage.png",
    };
  });

  return (
    <>
      <div
        className="row"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <div
          className={
            props.images?.length > 0
              ? "col-sm-12 col-md-12 col-lg-8 mb-2"
              : "col-sm-12 col-md-12 col-lg-12 mb-2"
          }
        >
          <Image
            className="position-static bigImage"
            src={
              props.displayImage?.includes("http")
                ? props.displayImage
                : "/assets/img/dummyImage.png"
            }
            alt=""
            fill
            quality={100}
            priority
          />
        </div>
        <div
          className={
            props.images?.length > 0
              ? "col-sm-12 col-md-12 col-lg-4 mb-2"
              : "d-none"
          }
        >
          <div className="row">
            {props.images?.slice(0, 2)?.map((item, i) => (
              <div
                className="col-sm-12 col-md-12 col-lg-12 hideHetFid mb-2"
                key={i}
              >
                <div className="position-relative overLayBg">
                  <Image
                    className="position-static smallImage"
                    src={
                      item?.image?.includes("http")
                        ? item?.image
                        : "/assets/img/dummyImage.png"
                    }
                    alt=""
                    fill
                    quality={100}
                    priority
                  />
                  <div className="overLayText">
                    + {props.images?.length} More Images
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <ImageGallery items={images} showPlayButton={false} /> */}
      {/* <SlideshowLightbox
        images={images}
        showThumbnails={true}
        open={isOpen}
        lightboxIdentifier="lbox1"
        onClose={() => {
          setIsOpen(false);
        }}
      ></SlideshowLightbox> */}
    </>
  );
}

export default ImageSliderWithThumnail;
