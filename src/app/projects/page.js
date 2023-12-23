"use client";
import React, { useEffect, useState } from "react";
import ProjectBox from "../../components/projectBox/ProjectBox";
import { useDataStore } from "@/api/store/store";
import Loader from "@/components/Loader/Loader";
import Paginations from "@/components/Paginations/Pagination";

function Projects() {
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const list = useDataStore((store) => store.ProjectList);
  const { fetchProjectList } = useDataStore();

  const handlePage = (val) => {
    setpage(val);
  };

  useEffect(() => {
    setloading(true);
    fetchProjectList({ page: page, limit: 12 }).then(() => {
      setloading(false);
    });
  }, [page]);
  return (
    <>
      <section className="pt-5 mt-4">
        <div className="container">
          <div className="row">
            {loading ? (
              <Loader />
            ) : list?.Project?.length > 0 ? (
              list?.Project?.map((item, i) => (
                <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={i}>
                  <ProjectBox item={item} />
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
