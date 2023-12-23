"use client";
import { useDataStore } from "@/api/store/store";
import Loader from "@/components/Loader/Loader";
import Paginations from "@/components/Paginations/Pagination";
import PropertyBox from "@/components/projectBox/PropertyBox";
import React, { useEffect, useState } from "react";

function MyBookingsList() {
  const list = useDataStore((store) => store.bookingsList);
  const { fetchbookingsList } = useDataStore();

  const [loading, setLoading] = useState(false);
  const [page, setpage] = useState(1);

  const handlePage = (val) => {
    setpage(val);
  };

  const params = {
    page: page,
    limit: 10,
  };
  useEffect(() => {
    setLoading(true);
    fetchbookingsList(params).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <section className="pt-5 mt-4">
        <div className="container">
          <div className="row">
            {loading ? (
              <Loader />
            ) : list?.bookings?.length > 0 ? (
              list?.bookings?.map((item, i) => (
                <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={i}>
                  <PropertyBox item={item?.property} />
                </div>
              ))
            ) : (
              "No Booking Found"
            )}
          </div>
          {!loading && list?.bookings?.length > 0 && (
            <div className="">
              <Paginations
                page={page}
                handlePage={handlePage}
                total={list?.total_bookings}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default MyBookingsList;
