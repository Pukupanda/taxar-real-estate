"use client";
import React, { useState } from "react";
import "./style.css";
import Link from "next/link";
import Cookies from "js-cookie";
import ImageModal from "../modals/ImageModal";

function PropertyBox(props) {
  const token = Cookies.get("Taxar");
  const [modalName, setmodalName] = useState("");
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="property__card featured_card position-relative">
        <div
          className="LikeUnlike"
          onClick={() => {
            if (token) {
              props.LikeUnlikeProperty(props.item?._id);
            } else {
              props.push("/login");
              Cookies.set("pageUrl", props.pathname);
            }
          }}
          role="button"
        >
          <i
            class={`fa-${
              props.item?.isLiked === 0 ? "regular" : "solid"
            } fa-heart themeGrn`}
          ></i>
        </div>

        <div className="property__card-media cursor-pointer">
          <img
            src={
              props.item?.displayImage?.includes("http")
                ? props.item?.displayImage
                : "/assets/img/dummyImage.png"
            }
            alt={props.item?.title}
            onClick={() => {
              if (props.item?.displayImage?.includes("http")) {
                setmodalName("image modal");
                setImage(props.item?.displayImage);
                handleShow();
              }
            }}
            role="button"
          />

          <div className="property__card-media-widgets">
            <div className="tag tag-black">रु{props.item?.price}</div>
          </div>
        </div>
        <Link href={`/detail/${props.item?._id}`}>
          <div className="px-3 pb-3">
            <div className="property__card-header">
              <div className=" d-flex justify-content-between text-capitalize align-items-center">
                <span className="property__card-type" tabindex="0">
                  {props.item?.category}/{props.item?.propertyFor}
                </span>
                {props.item?.facingDirection && (
                  <span className="property__card-type" tabindex="0">
                    {props.item?.facingDirection}-Facing
                  </span>
                )}
              </div>

              <h3 className="property__card-title text-truncate">
                <span>{props.item?.pArea} - </span>{" "}
                <span tabindex="0">{props.item?.title}</span>
              </h3>
              {props.item?.location && (
                <p className="property__card-location text-capitalize">
                  {props.item?.location}
                </p>
              )}
            </div>
          </div>
        </Link>
      </div>
      {show && modalName === "image modal" && image && (
        <ImageModal show={show} handleShow={handleShow} img={image} />
      )}
    </>
  );
}

export default PropertyBox;
