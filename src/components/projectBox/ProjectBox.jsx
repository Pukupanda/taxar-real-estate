import Link from "next/link";
import React from "react";
import "./style.css";

function ProjectBox(props) {
  return (
    <>
      <div className="property__card featured_card">
        <Link href={`/property/${props.item?._id}`}>
          <div className="property__card-media cursor-pointer">
            <div>
              <img
                src={
                  props.item?.image?.includes("http")
                    ? props.item?.image
                    : "/assets/img/dummyImage.png"
                }
                alt={props.item?.title}
              />
            </div>
            <div className="property__card-media-widgets">
              {/* <div className="tag tag-black">{props.item?.price}</div> */}
              {/* <div
                className="tag tag-black-heart tag-circ compare"
              >
                <div className="heartIconContainer">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    className="heartIcon"
                    height="18"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"></path>
                  </svg>
                </div>
                <span className="tooltiptext">Add to Compare</span>
              </div> */}
            </div>
          </div>
        </Link>
        <div className="property__card-text cursor-pointer">
          <Link href={`/property/${props.item?._id}`}>
            <div className="property__card-header">
              <span className="property__card-type" tabindex="0">
                {props.item?.propertyType}
              </span>
              <h3 className="property__card-title">
                <span tabindex="0">{props.item?.title}</span>
              </h3>
              {/* <p className="property__card-location">{props.item?.location}</p> */}
              <div className="property__card-tags">
                <span className="tag tag-gray">
                  {props.item?.numOfProperty}&nbsp; Properties
                </span>
              </div>
            </div>
          </Link>
          <div className="property__card-footer">
            <div className="property__card-author align-items-center">
              <div className="property__card-author-media">
                <p>D</p>
              </div>
              <div className="property__card-author-text">
                <h4 className="property__card-author-title">
                  <Link target="_blank" rel="noreferrer" tabindex="0" href="/#">
                    Downtown Housing
                  </Link>
                </h4>
              </div>
            </div>
            <Link href={`/property/${props.item?._id}`}>
              <div className="btn btn-link">View Details</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectBox;
