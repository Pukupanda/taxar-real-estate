"use client";
import React, { useEffect, useState } from "react";
import ProjectBox from "../../components/projectBox/ProjectBox";
import { useDataStore } from "@/api/store/store";
import Loader from "@/components/Loader/Loader";
import Paginations from "@/components/Paginations/Pagination";

function Projects() {
  const [loading, setloading] = useState(false);
  const [status, setstatus] = useState("0");
  const [page, setpage] = useState(1);
  const list = useDataStore((store) => store.ProjectList);
  const { fetchProjectList } = useDataStore();

  const handlePage = (val) => {
    setpage(val);
  };

  useEffect(() => {
    setloading(true);
    fetchProjectList({ page: page, limit: 12, status: status }).then(() => {
      setloading(false);
    });
  }, [page, status]);
  return (
    <>
      <section className="pt-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 mb-4 text-center">
              <div className="nav gap-2 justify-content-center">
                <div
                  className={status === "0" ? "tabStyle loginBtn" : "tabStyle"}
                  role="button"
                  onClick={() => {
                    setstatus("0");
                    setpage("1");
                  }}
                >
                  On-Going
                </div>
                <div
                  className={status === "1" ? "tabStyle loginBtn" : "tabStyle"}
                  role="button"
                  onClick={() => {
                    setstatus("1");
                    setpage("1");
                  }}
                >
                  Completed
                </div>
              </div>
            </div>
            {loading ? (
              <div className="d-table min-vh-50 w-100">
                <div className="tableCellVerMiddle">
                  <Loader />
                </div>
              </div>
            ) : list?.Project?.length > 0 ? (
              list?.Project?.map((item, i) => (
                <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={i}>
                  <ProjectBox item={item} status={status} />
                </div>
              ))
            ) : (
              <div className="col-sm-12 text-center">No Project Found</div>
            )}
          </div>
          {!loading && list?.Project?.length > 0 && (
            <div className="">
              <Paginations
                handlePage={handlePage}
                page={page}
                total={list?.total}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Projects;
