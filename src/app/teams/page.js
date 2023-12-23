"use client";
import { useDataStore } from "@/api/store/store";
import Loader from "@/components/Loader/Loader";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Teams() {
  const [loading, setloading] = useState(false);
  const list = useDataStore((store) => store.teamsList);
  const { fetchteamsList } = useDataStore();
  useEffect(() => {
    setloading(true);
    fetchteamsList().then(() => {
      setloading(false);
    });
  }, []);
  return (
    <>
      <section className="mt-5 pt-5">
        <div className="container">
          {loading ? (
            <Loader />
          ) : list?.Team?.length > 0 ? (
            <>
              {list?.Team?.slice(0, 2)?.map((item, i) => (
                <div
                  className="row align-items-center colReverse shadow mb-5"
                  key={i}
                >
                  <div className="col-sm-12 col-md-4 col-lg-3 mb-3 pt-3">
                    <Image
                      src={
                        item?.profilePicture?.includes("http")
                          ? item?.profilePicture
                          : "/assets/img/dummyImage.png"
                      }
                      alt=""
                      className="teamImg position-relative"
                      fill
                      quality={100}
                      priority
                    />
                  </div>
                  <div className="col-sm-12 col-md-8 col-lg-9 mb-3">
                    <h4 className="mt-3">{item?.fullName}</h4>
                    <h6>
                      <i>{item?.designation}</i>
                    </h6>
                    <p>{item?.description}</p>
                  </div>
                </div>
              ))}
              <div className="row align-items-center justify-content-center">
                {list?.Team?.slice(2, list?.Team?.length)?.map((item, i) => (
                  <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={i}>
                    <div className="bg-white shadow rounded p-3">
                      <img
                        src={
                          item?.profilePicture?.includes("http")
                            ? item?.profilePicture
                            : "/assets/img/dummyImage.png"
                        }
                        alt=""
                        width="100px"
                        height="100px"
                        className="rounded-circle m-auto ob-cover"
                      />
                      <h4 className="mt-3">{item?.fullName}</h4>
                      <h6>
                        <i>{item?.designation}</i>
                      </h6>
                      <p>{item?.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="col-sm-12 col-md-12 col-lg-12 text-center">
              No Team Found
            </div>
          )}

          <div className="row align-items-center justify-content-center d-none">
            {list?.Team?.length > 0
              ? list?.Team?.slice(2, list?.Team?.length)?.map((item, i) => (
                  <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={i}>
                    <div className="bg-white shadow rounded p-3">
                      <img
                        src={
                          item?.profilePicture?.includes("http")
                            ? item?.profilePicture
                            : "/assets/img/dummyImage.png"
                        }
                        alt=""
                        width="100px"
                        height="100px"
                        className="rounded-circle m-auto ob-cover"
                      />
                      <h4 className="mt-3">{item?.fullName}</h4>
                      <h6>
                        <i>{item?.designation}</i>
                      </h6>
                      <p>{item?.description}</p>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </section>
    </>
  );
}

export default Teams;
