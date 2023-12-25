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

  const [propertyFor, setpropertyFor] = useState("");
  const [city, setcity] = useState("");
  const [category, setcategory] = useState("");
  const [subCategory, setsubCategory] = useState("");
  const [budgetMin, setbudgetMin] = useState("");
  const [budgetMax, setbudgetMax] = useState("");
  const [isFeatured, setisFeatured] = useState("");
  const [location, setlocation] = useState("");

  const params = {
    page: page,
    limit: 10,
  };

  useEffect(() => {
    setloading(true);
    fetchProjectDetails(id, params).then(() => {
      setloading(false);
    });
  }, [page]);

  const LikeUnlikeProperty = (val) => {
    setloading(true);
    LikeUnlikePropertyApi(val).then((res) => {
      toast.success(res?.message);
      fetchProjectDetails(id, params).then(() => {
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
              <Filter
                apiCall={fetchProjectDetails}
                propertyFor={propertyFor}
                setpropertyFor={setpropertyFor}
                city={city}
                setcity={setcity}
                category={category}
                setcategory={setcategory}
                subCategory={subCategory}
                setsubCategory={setsubCategory}
                budgetMin={budgetMin}
                setbudgetMin={setbudgetMin}
                budgetMax={budgetMax}
                setbudgetMax={setbudgetMax}
                isFeatured={isFeatured}
                setisFeatured={setisFeatured}
                location={location}
                setlocation={setlocation}
              />
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
                        />{" "}
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
                        <Link
                          href={`/detail/${item?._id}`}
                          className="loginBtn btn"
                        >
                          View Details
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
