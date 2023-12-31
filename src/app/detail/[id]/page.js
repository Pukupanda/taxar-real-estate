"use client";
import React, { useEffect } from "react";
import { FourSlideSettings } from "@/Utils";
import SliderComponent from "@/components/sliderComponent/SliderComponent";
import ProjectBox from "@/components/projectBox/ProjectBox";
import { useParams } from "next/navigation";
import { useDataStore } from "@/api/store/store";
import ImageSliderWithThumnail from "@/components/ImageSliderWithThumnail/ImageSliderWithThumnail";
import moment from "moment";

function Detail() {
  const { id } = useParams();
  const detail = useDataStore((store) => store.propertyDetail);
  const { fetchPropertyDetail } = useDataStore();
  useEffect(() => {
    fetchPropertyDetail({ id: id });
  }, [id]);

  return (
    <>
      <section className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="properyList">
                <div className="w-100">
                  <p className="d-flex justify-content-between align-items-center mb-2 fw-bold text-capitalize">
                    <span className="fs-5 fw-bold">
                      Rs. {detail?.propertyDetails?.price}
                      <p className="mb-0 fw-normal">
                        {detail?.propertyDetails?.priceInWords}
                      </p>
                    </span>
                    <div className="text-end small">
                      <div>
                        Last updated:{" "}
                        {detail?.propertyDetails?.updatedAt &&
                          moment(detail?.propertyDetails?.updatedAt).format(
                            "ll"
                          )}
                      </div>
                      <span className="tag mb-2 tag-black text-capitalize">
                        {detail?.propertyDetails?.category}/
                        {detail?.propertyDetails?.propertyFor}
                      </span>
                    </div>
                  </p>
                  <h3 className="text-capitalize fw-bold">
                    {detail?.propertyDetails?.title} -{" "}
                    {detail?.propertyDetails?.pArea}
                  </h3>
                  {detail?.propertyDetails?.facingDirection && (
                    <h6 className="mb-2">
                      Facing Direction:-{" "}
                      <span className="text-capitalize fw-bold">
                        {detail?.propertyDetails?.facingDirection}
                      </span>
                    </h6>
                  )}

                  <div className="mb-3 text-capitalize">
                    <img src="/assets/img/Address.png" alt="" width="15px" />{" "}
                    {detail?.propertyDetails?.location}
                  </div>
                  <div className="slideGallery">
                    <ImageSliderWithThumnail
                      images={detail?.propertyDetails?.images}
                      displayImage={detail?.propertyDetails?.displayImage}
                    />
                  </div>

                  <div className="bg-white p-2 mt-4">
                    <h5 className="">Features</h5>
                    <ul className="m-0 p-0 list-unstyled">
                      {detail?.propertyDetails?.features?.map((item, i) => (
                        <li className="d-inline-block p-3" key={i}>
                          <div className="d-flex gap-2 align-items-center fs12 text-capitalize">
                            <img
                              src={
                                item?.icon?.includes("http")
                                  ? item?.icon
                                  : "/assets/img/land_area-svg.png"
                              }
                              alt=""
                              width="20px"
                            />
                            {item?.label}
                            <br />
                            {item?.value}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white p-3 mt-3">
                    <h5>Description</h5>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: detail?.propertyDetails?.details,
                      }}
                    ></div>
                    {/* <h5>Amenities</h5>
                    <ul className="list-unstyled p-0 m-0">
                      <li className="d-inline-block p-3 AmenitBox">
                        <div className="categoryCard shadow">
                          <div className="CateIconBg">
                            <img
                              src="/assets/img/home.png"
                              alt=""
                              className="CategoryIcon"
                            />
                          </div>
                          <h6 className="text-black pt-3">Marbel</h6>
                        </div>
                      </li>
                      <li className="d-inline-block p-3 AmenitBox">
                        <div className="categoryCard shadow">
                          <div className="CateIconBg">
                            <img
                              src="/assets/img/home.png"
                              alt=""
                              className="CategoryIcon"
                            />
                          </div>
                          <h6 className="text-black pt-3">Marbel</h6>
                        </div>
                      </li>
                      <li className="d-inline-block p-3 AmenitBox">
                        <div className="categoryCard shadow">
                          <div className="CateIconBg">
                            <img
                              src="/assets/img/home.png"
                              alt=""
                              className="CategoryIcon"
                            />
                          </div>
                          <h6 className="text-black pt-3">Marbel</h6>
                        </div>
                      </li>
                      <li className="d-inline-block p-3 AmenitBox">
                        <div className="categoryCard shadow">
                          <div className="CateIconBg">
                            <img
                              src="/assets/img/home.png"
                              alt=""
                              className="CategoryIcon"
                            />
                          </div>
                          <h6 className="text-black pt-3">Marbel</h6>
                        </div>
                      </li>
                      <li className="d-inline-block p-3 AmenitBox">
                        <div className="categoryCard shadow">
                          <div className="CateIconBg">
                            <img
                              src="/assets/img/home.png"
                              alt=""
                              className="CategoryIcon"
                            />
                          </div>
                          <h6 className="text-black pt-3">Marbel</h6>
                        </div>
                      </li>
                      <li className="d-inline-block p-3 AmenitBox">
                        <div className="categoryCard shadow">
                          <div className="CateIconBg">
                            <img
                              src="/assets/img/home.png"
                              alt=""
                              className="CategoryIcon"
                            />
                          </div>
                          <h6 className="text-black pt-3">Marbel</h6>
                        </div>
                      </li>
                    </ul> */}
                    <h5 className="mt4">View on Map</h5>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d226043.19554893387!2d85.346119!3d27.719604!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198369ce3755%3A0x1574350fc8f521ef!2sSukedhara!5e0!3m2!1sen!2snp!4v1700904854722!5m2!1sen!2snp"
                      width="100%"
                      height="450"
                      className="border-0"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 mb-4">
              <h3 className="">More Properties</h3>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12">
              <SliderComponent setting={FourSlideSettings}>
                {detail?.otherProperties?.map((item, i) => (
                  <div key={i}>
                    <ProjectBox item={item} />
                  </div>
                ))}
              </SliderComponent>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Detail;
