"use client";
import { useDataStore } from "@/api/store/store";
import Loader from "@/components/Loader/Loader";
import Paginations from "@/components/Paginations/Pagination";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
  }, [page]);

  return (
    <>
      <section className="mt-4">
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
                ) : list?.bookings?.length > 0 ? (
                  list?.bookings?.map((item, i) => (
                    <Tr key={i}>
                      <Td>
                        <Image
                          src={
                            item?.property?.displayImage?.includes("http")
                              ? item?.property?.displayImage
                              : "/assets/img/dummyImage.png"
                          }
                          alt={item?.property?.title}
                          width={80}
                          height={80}
                          className="rounded-3"
                          quality={100}
                          priority
                        />
                      </Td>
                      <Td>{item?.property?.title || "NA"}</Td>
                      <Td>{item?.property?.category || "NA"}</Td>
                      <Td>{item?.property?.subCategory || "NA"}</Td>
                      <Td>{item?.property?.price || "NA"}</Td>
                      <Td>{item?.property?.facingDirection || "NA"}</Td>
                      <Td>{item?.property?.location || "NA"}</Td>
                      <Td>
                        <div className="d-flex align-items-center gap-2">
                          <Link href={`/detail/${item?.property?._id}`}>
                            <Image
                              src={"/assets/img/view.png"}
                              alt=""
                              width={19}
                              height={15}
                              quality={100}
                              priority
                            />
                          </Link>
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
            ) : list?.bookings?.length > 0 ? (
              list?.bookings?.map((item, i) => (
                <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={i}>
                  <PropertyBox item={item?.property} />
                </div>
              ))
            ) : (
              "No Booking Found"
            )} */}
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
