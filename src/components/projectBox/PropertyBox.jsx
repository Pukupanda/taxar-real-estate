"use client";
import React from "react";
import "./style.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { LikeUnlikePropertyApi } from "@/api/apiCall";
import { toast } from "react-toastify";

function PropertyBox(props) {
  const token = Cookies.get("Taxar");
  const router = useRouter();
  const pathname = usePathname();
  const LikeUnlikeProperty = (val) => {
    LikeUnlikePropertyApi(val).then((res) => {
      toast.success(res?.message);
      router.refresh();
    });
  };
  console.log(router, "router");
  return (
    <>
      <div className="property__card featured_card position-relative">
        <div
          className="LikeUnlike"
          onClick={() => {
            if (token) {
              LikeUnlikeProperty(props.item?._id);
            } else {
              push("/login");
              Cookies.set("pageUrl", pathname);
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
        <Link href={`/detail/${props.item?._id}`}>
          <div className="property__card-media cursor-pointer">
            <div className="">
              <img
                src={
                  props.item?.displayImage?.includes("http")
                    ? props.item?.displayImage
                    : "/assets/img/dummyImage.png"
                }
                alt={props.item?.title}
              />
            </div>
            <div className="property__card-media-widgets">
              <div className="tag tag-black">Rs. {props.item?.price}</div>
            </div>
          </div>
          <div className="px-3 pb-3">
            <div className="property__card-header">
              <div className=" d-flex justify-content-between text-capitalize align-items-center">
                <span className="property__card-type" tabindex="0">
                  {props.item?.category}
                </span>
                <span className="property__card-type" tabindex="0">
                  {props.item?.facingDirection}
                </span>
              </div>

              <h3 className="property__card-title">
                <span>{props.item?.pArea} - </span>{" "}
                <span tabindex="0">{props.item?.title}</span>
              </h3>
              <p className="property__card-location">{props.item?.location}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default PropertyBox;
