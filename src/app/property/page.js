"use client";
import { LikeUnlikePropertyApi } from "@/api/apiCall";
import { useDataStore } from "@/api/store/store";
import Loader from "@/components/Loader/Loader";
import Paginations from "@/components/Paginations/Pagination";
import PropertyBox from "@/components/projectBox/PropertyBox";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function PropertyList() {
  const list = useDataStore((store) => store.propertyList);
  const { fetchpropertyList } = useDataStore();

  const [loading, setLoading] = useState(false);
  const [page, setpage] = useState(1);
  const [status, setstatus] = useState("1");

  const handlePage = (val) => {
    setpage(val);
  };

  const params = {
    page: page,
    limit: 10,
    search: "",
    propertyFor: "",
    city: "",
    category: "",
    subCategory: "",
    budgetMin: "",
    budgetMax: "",
    isFeatured: "",
  };
  useEffect(() => {
    setLoading(true);
    fetchpropertyList(params).then(() => {
      setLoading(false);
    });
  }, []);

  const LikeUnlikeProperty = (val) => {
    setLoading(true);
    LikeUnlikePropertyApi(val).then((res) => {
      toast.success(res?.message);
      fetchpropertyList(params).then(() => {
        setLoading(false);
      });
    });
  };

  return (
    <>
      <section className="mt-4">
        <div className="container">
          <div className="row align-items-center">
            {loading ? (
              <Loader />
            ) : list?.properties?.length > 0 ? (
              list?.properties?.map((item, i) => (
                <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={i}>
                  <PropertyBox
                    item={item}
                    LikeUnlikeProperty={LikeUnlikeProperty}
                  />
                </div>
              ))
            ) : (
              <div className="text-center">No Properties Found</div>
            )}
          </div>
          {!loading && list?.properties?.length > 0 && (
            <div className="">
              <Paginations
                page={page}
                handlePage={handlePage}
                total={list?.total_properties}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default PropertyList;
