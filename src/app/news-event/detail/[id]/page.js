"use client";
import { useDataStore } from "@/api/store/store";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import ImageSliderWithThumnail from "@/components/ImageSliderWithThumnail/ImageSliderWithThumnail";
import moment from "moment";
import Link from "next/link";

function NewsEventDetail() {
  const [loading, setloading] = useState(false);
  const { id } = useParams();
  const detail = useDataStore((store) => store.newsEventDetail);
  const { fetchnewsEventDetail } = useDataStore();

  useEffect(() => {
    setloading(true);
    fetchnewsEventDetail({ id: id }).then(() => {
      setloading(false);
    });
  }, []);
  return (
    <>
      {loading ? (
        <div className="d-table min-vh-50 w-100">
          <div className="tableCellVerMiddle">
            <Loader />
          </div>
        </div>
      ) : (
        <>
          <section className="mt-3">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 mb-4">
                  <div className="properyList">
                    <div className="w-100">
                      <div className="d-flex justify-content-between align-items-center">
                        <h3 className="text-capitalize fw-bold">
                          {detail?.NewsEvent?.title}
                        </h3>
                        <span className="text-end text-capitalize">
                          <p className="mb-0">
                            {detail?.NewsEvent?.date !== "Invalid date"
                              ? detail?.NewsEvent?.date
                              : moment(detail?.NewsEvent?.createdAt).format(
                                  "DD-MM-YYYY"
                                )}
                          </p>
                          <p className="mb-0">{detail?.NewsEvent?.type}</p>
                        </span>
                      </div>

                      <div className="mb-3 text-capitalize">
                        <img
                          src="/assets/img/Address.png"
                          alt=""
                          width="15px"
                        />{" "}
                        {detail?.NewsEvent?.location}
                      </div>
                      <div className="slideGallery">
                        <ImageSliderWithThumnail
                          images={detail?.NewsEvent?.images}
                          displayImage={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-9">
                  <div className="properyList">
                    <div className="w-100">
                      <div className="">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: detail?.NewsEvent?.description,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-3 position-relative events">
                  <h3 className="">Latest News & Event</h3>
                  {detail?.latestNewsEvent?.map((item, i) => (
                    <div key={i}>
                      <div className="eventCard h-auto">
                        <div class="details w-100 float-none h-auto">
                          <h3 className="text-capitalize">
                            {item?.title || "NA"}
                          </h3>
                          <span>{item?.type}</span>
                          <span>{item?.data}</span>
                          <div
                            className="line2 dangp0"
                            dangerouslySetInnerHTML={{
                              __html: item?.description,
                            }}
                          ></div>
                          <Link
                            href={`/news-event/detail/${item?._id}`}
                            className="fs12 py-1 px-2"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default NewsEventDetail;
