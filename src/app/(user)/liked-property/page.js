"use client";
import { useDataStore } from "@/api/store/store";
import Loader from "@/components/Loader/Loader";
import Paginations from "@/components/Paginations/Pagination";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LikeUnlikePropertyApi } from "@/api/apiCall";
import { toast } from "react-toastify";

function LikedProperty() {
  const list = useDataStore((store) => store.likedProperty);
  const { fetchlikedProperty } = useDataStore();

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
    fetchlikedProperty(params).then(() => {
      setLoading(false);
    });
  }, [page]);

  const LikeUnlikeProperty = (val) => {
    setLoading(true);
    LikeUnlikePropertyApi(val).then((res) => {
      toast.success(res?.message);
      fetchlikedProperty(params).then(() => {
        setLoading(false);
      });
    });
  };

  return (
    <>
      <section className="pt-5 mt-4">
        <div className="container">
          <div className="row">
            <Table className="table table-borderless text-capitalize table-striped">
              <Thead>
                <Tr>
                  <Th>image</Th>
                  <Th>title</Th>
                  <Th>category</Th>
                  <Th>sub Category</Th>
                  <Th>price</Th>
                  <Th>facing direction</Th>
                  <Th>Location</Th>
                  <Th>action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr className="text-center">
                    <Td colSpan={10}>
                      <Loader />
                    </Td>
                  </Tr>
                ) : list?.properties?.length > 0 ? (
                  list?.properties?.map((item, i) => (
                    <Tr key={i}>
                      <Td>
                        <Image
                          src={
                            item?.displayImage?.includes("http")
                              ? item?.displayImage
                              : "/assets/img/dummyImage.png"
                          }
                          alt={item?.title}
                          width={50}
                          height={50}
                          className="rounded-3"
                          quality={100}
                          priority
                        />
                      </Td>
                      <Td>{item?.title}</Td>
                      <Td>{item?.category}</Td>
                      <Td>{item?.subCategory}</Td>
                      <Td>{item?.price}</Td>
                      <Td>{item?.facingDirection}</Td>
                      <Td>{item?.location}</Td>
                      <Td>
                        <div className="d-flex align-items-center gap-2">
                          <Link href={`/detail/${item?._id}`}>
                            <Image
                              src={"/assets/img/view.png"}
                              alt=""
                              width={19}
                              height={15}
                              quality={100}
                              priority
                            />
                          </Link>
                          <div
                            className=""
                            onClick={() => {
                              LikeUnlikeProperty(item?._id);
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
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr className="text-center">
                    <Td colSpan={10}>No Properties Found</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
            {/* {loading ? (
          <Loader />
        ) : list?.properties?.length > 0 ? (
          list?.bookings?.map((item, i) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={i}>
              <PropertyBox item={item?.property} />
            </div>
          ))
        ) : (
          "No Booking Found"
        )} */}
          </div>
          {!loading && list?.properties?.length > 0 && (
            <div className="">
              <Paginations
                page={page}
                handlePage={handlePage}
                total={list?.total}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default LikedProperty;
