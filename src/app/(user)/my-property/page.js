"use client";
import {
  userPropertyActiveDeactiveApi,
  userPropertyDeleteApi,
} from "@/api/apiCall";
import { useDataStore } from "@/api/store/store";
import Loader from "@/components/Loader/Loader";
import Paginations from "@/components/Paginations/Pagination";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { toast } from "react-toastify";
import Confirmation from "@/components/modals/Confirmation";

function MyProperty() {
  const list = useDataStore((store) => store.userPropertyList);
  const { fetchUserPropertyList } = useDataStore();

  const [loading, setLoading] = useState(false);
  const [page, setpage] = useState(1);
  const [status, setstatus] = useState("0");

  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [itemId, setItemId] = useState("");
  const handleShow = () => {
    setShow(!show);
  };

  const handlePage = (val) => {
    setpage(val);
  };

  const params = {
    page: page,
    limit: 10,
    isActive: status === "0" ? true : false,
  };
  useEffect(() => {
    setLoading(true);
    fetchUserPropertyList(params).then(() => {
      setLoading(false);
    });
  }, [page, status]);

  const activeDeactiveProperty = (data) => {
    setLoading(true);
    userPropertyActiveDeactiveApi(data).then((res) => {
      toast.success(res?.message);
      fetchUserPropertyList(params);
      setLoading(false);
    });
  };
  const deleteProperty = (data) => {
    setLoading(true);
    userPropertyDeleteApi(data).then((res) => {
      toast.success(res?.message);
      fetchUserPropertyList(params);
      setLoading(false);
    });
  };

  return (
    <>
      <section className="mt-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-6 col-md-6 col-lg-6 mb-3">
              <div className="nav gap-2">
                <div
                  className={status === "0" ? "tabStyle loginBtn" : "tabStyle"}
                  role="button"
                  onClick={() => {
                    setstatus("0");
                    setpage("1");
                  }}
                >
                  Active
                </div>
                <div
                  className={status === "1" ? "tabStyle loginBtn" : "tabStyle"}
                  role="button"
                  onClick={() => {
                    setstatus("1");
                    setpage("1");
                  }}
                >
                  Inactive
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 mb-3 text-end">
              <Link
                href="/my-property/add"
                className="loginBtn rounded py-2 px-3"
              >
                Add New Property
              </Link>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 mb-3">
              <Table className="table table-borderless text-capitalize table-striped">
                <Thead>
                  <Tr>
                    <Th>image</Th>
                    <Th>title</Th>
                    <Th>property For</Th>
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
                            width={80}
                            height={80}
                            className="rounded-3"
                            quality={100}
                            priority
                          />
                        </Td>
                        <Td>{item?.title || "NA"}</Td>
                        <Td>{item?.propertyFor || "NA"}</Td>
                        <Td>{item?.category || "NA"}</Td>
                        <Td>{item?.subCategory || "NA"}</Td>
                        <Td>रु{item?.price || "NA"}</Td>
                        <Td>{item?.facingDirection || "NA"}</Td>
                        <Td>{item?.location || "NA"}</Td>
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
                            <Link href={`/my-property/edit/${item?._id}`}>
                              <Image
                                src={"/assets/img/edit.png"}
                                alt=""
                                width={24}
                                height={24}
                                quality={100}
                                priority
                              />
                            </Link>
                            <Image
                              src={"/assets/img/delete.png"}
                              alt=""
                              width={20}
                              height={20}
                              quality={100}
                              priority
                              onClick={() => {
                                setModalName("delete modal");
                                setItemId(item?._id);
                                handleShow();
                                // deleteProperty(item?._id);
                              }}
                              role="button"
                            />

                            <input
                              type="checkbox"
                              className="toggle"
                              id=""
                              checked={status === "0" ? "" : "checked"}
                              onChange={() => {
                                setModalName("status modal");
                                setItemId(item?._id);
                                handleShow();
                              }}
                            />
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
            </div>
            {/* {loading ? (
              <Loader />
            ) : list?.properties?.length > 0 ? (
              list?.properties?.map((item, i) => (
                <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={i}>
                  <PropertyBox item={item} />
                </div>
              ))
            ) : (
              <div className="text-center">No Properties Found</div>
            )} */}
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
      {(show && modalName === "delete modal") ||
      (show && modalName === "status modal") ? (
        <Confirmation
          show={show}
          handleShow={handleShow}
          confirmDelete={deleteProperty}
          keyName={"id"}
          itemId={itemId}
          page={"property"}
          UpdateStatus={activeDeactiveProperty}
          modalName={modalName}
          isActive={status}
        />
      ) : null}
    </>
  );
}

export default MyProperty;
