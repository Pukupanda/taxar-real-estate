"use client";
import { useDataStore } from "@/api/store/store";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import moment from "moment";
import Link from "next/link";
import Paginations from "@/components/Paginations/Pagination";

function NewsEvent() {
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const list = useDataStore((store) => store.newsEventList);
  const { fetchnewsEventList } = useDataStore();

  const handlePage = (val) => {
    setpage(val);
  };

  useEffect(() => {
    setloading(true);
    fetchnewsEventList({ page: page, limit: 10 }).then(() => {
      setloading(false);
    });
  }, [page]);
  return (
    <>
      <section>
        <div class="events container mt-3">
          <div className="row">
            {loading ? (
              <div className="d-table min-vh-50 w-100">
                <div className="tableCellVerMiddle">
                  <Loader />
                </div>
              </div>
            ) : list?.NewsEvent?.length > 0 ? (
              list?.NewsEvent?.map((item, i) => (
                <div className="col-sm-12 col-md-6 col-lg-6" key={i}>
                  <div className="eventCard">
                    <div class="time">
                      <h2>
                        {moment(item?.date, "DD-MM-YYYY").format("DD")}
                        <span>
                          {moment(item?.date, "DD-MM-YYYY").format("MMM YYYY")}
                        </span>
                      </h2>
                    </div>
                    <div class="details">
                      <h3 className="text-capitalize">{item?.title || "NA"}</h3>
                      <span>{item?.type}</span>
                      <p className="line2">{item?.description}</p>
                      <Link href={`/news-event/detail/${item?._id}`}>
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                No Data Found
              </div>
            )}
          </div>
        </div>
        {!loading && list?.NewsEvent?.length > 0 && (
          <div className="">
            <Paginations
              handlePage={handlePage}
              page={page}
              total={list?.total}
            />
          </div>
        )}
      </section>
    </>
  );
}

export default NewsEvent;
