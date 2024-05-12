"use client";
import Link from "next/link";
import React, { useState } from "react";
import "./style.css";
import ImageModal from "../modals/ImageModal";
import Image from "next/image";
import Cookies from "js-cookie";

import { useRouter } from "next/navigation";
function ProjectBox(props) {
  const { push } = useRouter();
  const [modalName, setmodalName] = useState("");
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="property__card featured_card position-relative">
        {/* {props.item?.isFeatured && (
          <div class="ribbon ribbon-top-left">
            <span className="tag tag-black">{"Featured"}</span>
          </div>
        )} */}
        <div className="property__card-media cursor-pointer">
          <Image
            src={
              props.item?.images?.[0]?.image?.includes("http")
                ? props.item?.images?.[0]?.image
                : "/assets/img/dummyImage.png"
            }
            alt={props.item?.title}
            onClick={() => {
              if (props.item?.images?.[0]?.image?.includes("http")) {
                setmodalName("image modal");
                setImage(props.item?.images?.[0]?.image);
                handleShow();
              }
            }}
            fill
            quality={100}
            priority
            role="button"
            className="position-static"
          />
        </div>
        <div className="property__card-text cursor-pointer">
          <Link
            href={"/"}
            // href={
            //   props.status && props.status === "1"
            //     ? `/property/${props.item?._id}`
            //     : ""
            // }
          >
            <div className="property__card-header">
              <span className="property__card-type" tabindex="0">
                {props.item?.propertyType}
              </span>
              <h3
                className="property__card-title text-truncate"
                title={props.item?.title}
              >
                <span tabindex="0">{props.item?.title}</span>
              </h3>
              {
                <p className="property__card-location text-truncat text-capitalize">
                  {props.item?.location && props.item?.location}
                </p>
              }
              <div className="property__card-tags"></div>
            </div>
          </Link>
          <div className="property__card-footer">
            <div className="property__card-author align-items-center">
              {props.item?.propertyCount > 0 && (
                <span className="tag tag-gray2 fw-bold ps-0">
                  {props.item?.propertyCount || 0}&nbsp; Properties
                </span>
              )}
            </div>

            {props.status && props.status === "1" ? (
              <div
                className="btn btn-link"
                onClick={() => {
                  Cookies.set("project", props.item?._id);
                  Cookies.set("property", null);
                  push("/booking");
                }}
              >
                Book Now
              </div>
            ) : (
              <div className="btn-link">Completed</div>
            )}

            {/* {props.status && props.status === "1" ? (
              <Link href={`/property/${props.item?._id}`}>
                <div className="btn btn-link">View Details</div>
              </Link>
            ) : (
              <div className="btn-link">Completed</div>
            )} */}
          </div>
        </div>
      </div>
      {show && modalName === "image modal" && image && (
        <ImageModal show={show} handleShow={handleShow} img={image} />
      )}
    </>
  );
}

export default ProjectBox;
