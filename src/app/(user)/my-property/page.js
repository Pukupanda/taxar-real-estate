"use client";
import {
  userPropertyActiveDeactiveApi,
  userPropertyDeleteApi,
} from "@/api/apiCall";
import { useDataStore } from "@/api/store/store";
import Loader from "@/components/Loader/Loader";
import Paginations from "@/components/Paginations/Pagination";
import PropertyBox from "@/components/projectBox/PropertyBox";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

function MyProperty() {
  const list = useDataStore((store) => store.userPropertyList);
  const { fetchUserPropertyList } = useDataStore();

  const [loading, setLoading] = useState(false);
  const [page, setpage] = useState(1);
  const [status, setstatus] = useState("1");

  const handlePage = (val) => {
    setpage(val);
  };

  const params = {
    page: page,
    limit: 10,
    isActive: status === "1" ? true : false,
  };
  useEffect(() => {
    setLoading(true);
    fetchUserPropertyList(params).then(() => {
      setLoading(false);
    });
  }, []);

  const activeDeactiveProperty = (id) => {
    setLoading(true);
    userPropertyActiveDeactiveApi({ id: id }).then(() => {
      setLoading(false);
    });
  };
  const deleteProperty = (id) => {
    setLoading(true);
    userPropertyDeleteApi({ id: id }).then(() => {
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
                  className={status === "1" ? "tabStyle loginBtn" : "tabStyle"}
                  role="button"
                  onClick={() => {
                    setstatus("1");
                    setpage("1");
                  }}
                >
                  Active
                </div>
                <div
                  className={status === "2" ? "tabStyle loginBtn" : "tabStyle"}
                  role="button"
                  onClick={() => {
                    setstatus("2");
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
            {/* <div className="col-sm-6 col-md-6 col-lg-6 mb-3 text-end">
              <Table className="table">
                <Thead>
                  <Th>image</Th>
                  <Th>title</Th>
                  <Th>category</Th>
                  <Th>sub category</Th>
                  <Th>facing Direction</Th>
                  <Th>price</Th>
                  <Th>action</Th>
                </Thead>
              </Table>
            </div> */}
            {loading ? (
              <Loader />
            ) : list?.properties?.length > 0 ? (
              list?.properties?.map((item, i) => (
                <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={i}>
                  <PropertyBox item={item} />
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

export default MyProperty;
