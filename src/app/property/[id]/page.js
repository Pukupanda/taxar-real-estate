"use client";
import { LikeUnlikePropertyApi } from "@/api/apiCall";
import { useDataStore } from "@/api/store/store";
import Filter from "@/components/Filter/Filter";
import Loader from "@/components/Loader/Loader";
import Paginations from "@/components/Paginations/Pagination";
import Cookies from "js-cookie";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Property() {
  const { id } = useParams();
  const { push } = useRouter();
  const pathname = usePathname();
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
                              Cookies.set("pageUrl", pathname);
                            }
                          }}
                          role="button"
                        >
                          <i
                            class={`fa-${
                              item?.isLiked === 0 ? "regular" : "solid"
                            } fa-heart themeGrn`}
                          ></i>
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
