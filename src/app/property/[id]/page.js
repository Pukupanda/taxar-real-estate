"use client";
import { LikeUnlikePropertyApi } from "@/api/apiCall";
import { useDataStore } from "@/api/store/store";
import Filter from "@/components/Filter/Filter";
import Loader from "@/components/Loader/Loader";
import Paginations from "@/components/Paginations/Pagination";
import Cookies from "js-cookie";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Property() {
  const { id } = useParams();
  const { push } = useRouter();
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const list = useDataStore((store) => store.ProjectDetails);
  const { fetchProjectDetails } = useDataStore();
  const handlePage = (val) => {
    setpage(val);
  };
  const token = Cookies.get("Taxar");

  useEffect(() => {
    setloading(true);
    fetchProjectDetails(id, { page: page, limit: 10 }).then(() => {
      setloading(false);
    });
  }, []);

  const LikeUnlikeProperty = (val) => {
    setloading(true);
    LikeUnlikePropertyApi(val).then((res) => {
      toast.success(res?.message);
      fetchProjectDetails(id, { page: page, limit: 10 }).then(() => {
        setloading(false);
      });
    });
  };

  return (
    <>
      <section className="pt-5 mt-4">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-3 position-relative">
              <Filter />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-9">
              {loading ? (
                <Loader />
              ) : list?.properties?.length > 0 ? (
                list?.properties?.map((item, i) => (
                  <div className="properyList" key={i}>
                    <div className="propertyImgBox">
                      <img
                        src={
                          item?.displayImage?.includes("http")
                            ? item?.displayImage
                            : "/assets/img/dummyImage.png"
                        }
                        alt=""
                        className="propImg"
                      />
                    </div>
                    <div className="proprtyInfo w-100">
                      {item?.isFeatured && (
                        <span className="tag mb-2 tag-black">{"Featured"}</span>
                      )}
                      <p>Rs. {item?.price}</p>
                      <h5 className="text-capitalize">{item?.title}</h5>
                      <div className="mb-2">
                        <img
                          src="/assets/img/Address.png"
                          alt=""
                          width="15px"
                        />
                        {item?.location}
                      </div>
                      <div className="fs12">
                        {item?.features?.map((fst, i) => (
                          <>
                            <span key={i}>
                              <img
                                src={
                                  fst?.icon?.includes("http")
                                    ? fst?.icon
                                    : "/assets/img/land_area-svg.png"
                                }
                                alt=""
                                width="15px"
                              />{" "}
                              {fst?.label}
                            </span>
                            {"  "}
                          </>
                        ))}
                      </div>
                      <div className="compare-view">
                        <div className="tag tag-black">
                          <span>26</span>
                          <span style={{ fontWeight: "normal" }}>views</span>
                        </div>
                        {/* <div id="search-compare-0" className="cursor-pointer">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 24 24"
                            color="#0391DD"
                            height="18"
                            width="18"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: "#52bb84" }}
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"></path>
                          </svg>
                        </div> */}
                        <div
                          id="search-favorite-unauth-0"
                          className="search_heart_div cursor-pointer"
                          onClick={() => {
                            if (token) {
                              LikeUnlikeProperty(item?._id);
                            } else {
                              push("/login");
                            }
                          }}
                          role="button"
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 1024 1024"
                            className="search-heart"
                            color="#0391DD"
                            height="18"
                            width="18"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: "#52bb84" }}
                          >
                            <path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"></path>
                          </svg>
                        </div>
                        {/* <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 1024 1024"
                          id="share-search-0"
                          color="#1f5eae"
                          className="search_share_icon"
                          height="18"
                          width="18"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ color: "#52bb84" }}
                        >
                          <path d="M752 664c-28.5 0-54.8 10-75.4 26.7L469.4 540.8a160.68 160.68 0 0 0 0-57.6l207.2-149.9C697.2 350 723.5 360 752 360c66.2 0 120-53.8 120-120s-53.8-120-120-120-120 53.8-120 120c0 11.6 1.6 22.7 4.7 33.3L439.9 415.8C410.7 377.1 364.3 352 312 352c-88.4 0-160 71.6-160 160s71.6 160 160 160c52.3 0 98.7-25.1 127.9-63.8l196.8 142.5c-3.1 10.6-4.7 21.8-4.7 33.3 0 66.2 53.8 120 120 120s120-53.8 120-120-53.8-120-120-120zm0-476c28.7 0 52 23.3 52 52s-23.3 52-52 52-52-23.3-52-52 23.3-52 52-52zM312 600c-48.5 0-88-39.5-88-88s39.5-88 88-88 88 39.5 88 88-39.5 88-88 88zm440 236c-28.7 0-52-23.3-52-52s23.3-52 52-52 52 23.3 52 52-23.3 52-52 52z"></path>
                        </svg> */}
                      </div>
                      <hr />
                      <div className="property__card-footer pt-0">
                        <div className="property__card-author align-items-center">
                          {list?.Project?.image?.includes("http") && (
                            <div className="property__card-author-media">
                              <p>D</p>
                            </div>
                          )}
                          <div className="property__card-author-text">
                            <h4 className="property__card-author-title text-capitalize">
                              {list?.Project?.title}
                            </h4>
                          </div>
                        </div>
                        <Link href={`/detail/${item?._id}`}>
                          <div className="loginBtn btn">View Details</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-sm-12 text-center">No Property Found</div>
              )}
            </div>
          </div>
          {!loading && list?.properties?.length > 0 && (
            <div className="">
              <Paginations
                handlePage={handlePage}
                page={page}
                total={list?.total_properties}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Property;
