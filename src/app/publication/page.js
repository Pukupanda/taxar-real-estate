"use client";
import { useDataStore } from "@/api/store/store";
import Paginations from "@/components/Paginations/Pagination";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Publication() {
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const list = useDataStore((store) => store.blogsList);
  const { fetchblogsList } = useDataStore();
  const handlePage = (val) => {
    setpage(val);
  };

  useEffect(() => {
    setloading(true);
    fetchblogsList({ page: page, limit: 10 }).then(() => {
      setloading(false);
    });
  }, []);
  return (
    <>
      <section className="pt-5 mt-4">
        <div className="container">
          <div className="row">
            {loading ? (
              <Loader />
            ) : list?.Blog?.length > 0 ? (
              list?.Blog?.map((item, i) => (
                <div className="col-sm-12 col-md-12 col-lg-6" key={i}>
                  <div className="properyList">
                    <div className="propertyImgBox">
                      <img
                        src={
                          item?.image?.includes("http")
                            ? item?.image
                            : "/assets/img/dummyImage.png"
                        }
                        alt=""
                        className="propImg"
                      />
                    </div>
                    <div className="proprtyInfo w-100">
                      <h5 className="text-capitalize">{item?.title}</h5>
                      <p>{item?.description}</p>
                      <Link href={`/publication/detail/${item?._id}`}>
                        <div className="loginBtn btn">View Details</div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                No Publication Found
              </div>
            )}
          </div>
          {!loading && list?.Blog?.length > 0 && (
            <div className="">
              <Paginations
                handlePage={handlePage}
                page={page}
                total={list?.total}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Publication;