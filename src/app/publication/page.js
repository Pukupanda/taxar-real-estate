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
  const [page, setpage] = useState(1);

  const handlePage = (val) => {
    setpage(val);
  };

  const list = useDataStore((store) => store.publicationList);
  const { fetchpublicationList } = useDataStore();

  useEffect(() => {
    setLoading(true);
    fetchpublicationList({ limit: 10, page: page }).then(() => {
      setLoading(false);
    });
  }, []);

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
                ) : list?.Publication?.length > 0 ? (
                  list?.Publication?.map((item, i) => (
                    <Tr key={i}>
                      <Td>{item?.title || "NA"}</Td>
                      <Td>
                        {item?.fileUrl?.includes("http") ? (
                          <Link href={item?.fileUrl} target="_black">
                            Download
                          </Link>
                        ) : (
                          "NA"
                        )}
                      </Td>
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
          </div>
          {!loading && list?.Publication?.length > 0 && (
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

export default Publication;
