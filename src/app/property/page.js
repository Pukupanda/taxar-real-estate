"use client";
import { LikeUnlikePropertyApi } from "@/api/apiCall";
import { useDataStore } from "@/api/store/store";
import Filter from "@/components/Filter/Filter";
import Loader from "@/components/Loader/Loader";
import Paginations from "@/components/Paginations/Pagination";
import PropertyBox from "@/components/projectBox/PropertyBox";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function PropertyList() {
  const list = useDataStore((store) => store.propertyList);
  const { fetchpropertyList } = useDataStore();
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [page, setpage] = useState(1);
  const [status, setstatus] = useState("1");
  const pathname = usePathname();

  const handlePage = (val) => {
    setpage(val);
  };

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
    limit: 12,
    propertyFor: propertyFor,
    city: city,
    category: category,
    subCategory: subCategory,
    budgetMin: budgetMin ? budgetMin : "",
    budgetMax: budgetMax ? budgetMax : "",
    isFeatured: isFeatured,
    location: location,
  };
  useEffect(() => {
    setLoading(true);
    fetchpropertyList(params).then(() => {
      setLoading(false);
    });
  }, [page]);

  const LikeUnlikeProperty = (val) => {
    setLoading(true);
    LikeUnlikePropertyApi(val).then((res) => {
      toast.success(res?.message);
      fetchpropertyList(params).then(() => {
        setLoading(false);
      });
    });
  };

  const filterApi = () => {
    setLoading(true);
    fetchpropertyList(params).then(() => {
      setLoading(false);
    });
  };

  const ResetApi = () => {
    setLoading(true);
    fetchpropertyList({ page: page, limit: 12 }).then(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <section className="mt-4">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-3 position-relative">
              <Filter
                ResetApi={ResetApi}
                apiCall={filterApi}
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
              <div className="row align-items-center">
                {loading ? (
                  <Loader />
                ) : list?.properties?.length > 0 ? (
                  list?.properties?.map((item, i) => (
                    <div className="col-sm-6 col-md-4 col-lg-4 mb-3" key={i}>
                      <PropertyBox
                        item={item}
                        LikeUnlikeProperty={LikeUnlikeProperty}
                        push={push}
                        pathname={pathname}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center">No Properties Found</div>
                )}
              </div>
            </div>
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
