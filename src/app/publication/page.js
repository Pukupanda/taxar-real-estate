"use client";
import { useDataStore } from "@/api/store/store";
import Paginations from "@/components/Paginations/Pagination";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

function Publication() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <section className="mt-4">
        <div className="container">
          <div className="row">
            <Table className="table table-borderless text-capitalize table-striped">
              <Thead>
                <Tr>
                  <Th>title</Th>
                  <Th>file</Th>
                  {/* <Th>action</Th> */}
                </Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr className="text-center">
                    <Td colSpan={10}>
                      <Loader />
                    </Td>
                  </Tr>
                ) : Array(10)?.length > 0 ? (
                  Array(10)
                    ?.fill()
                    ?.map((item, i) => (
                      <Tr key={i}>
                        <Td>{item?.title || "NA"}</Td>
                        <Td>{item?.category || "NA"}</Td>
                        {/* <Td>
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
                            className="mt-1"
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
                      </Td> */}
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
          {/* {!loading && list?.properties?.length > 0 && (
            <div className="">
              <Paginations page={page} handlePage={handlePage} total={30} />
            </div>
          )} */}
        </div>
      </section>
    </>
  );
}

export default Publication;
