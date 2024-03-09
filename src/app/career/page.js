"use client";
import { useDataStore } from "@/api/store/store";
import Paginations from "@/components/Paginations/Pagination";
import Loader from "@/components/Loader/Loader";
import React, { useEffect, useState } from "react";
import ApplyNowModal from "@/components/modals/ApplyNowModal";
import SuccessModal from "@/components/modals/SuccessModal";

function Career() {
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const list = useDataStore((store) => store.careerList);
  const { fetchcareerList } = useDataStore();
  const [show, setshow] = useState(false);
  const [modalName, setmodalName] = useState("");
  const [position, setposition] = useState("");
  const handleShow = () => {
    setshow(!show);
  };
  const handlePage = (val) => {
    setpage(val);
  };

  useEffect(() => {
    setloading(true);
    fetchcareerList({ page: page, limit: 10 }).then(() => {
      setloading(false);
    });
  }, [page]);
  return (
    <>
      <section className="pt-5">
        <div className="container">
          <div className="row">
            {loading ? (
              <div className="d-table min-vh-50 w-100">
                <div className="tableCellVerMiddle">
                  <Loader />
                </div>
              </div>
            ) : list?.Career?.length > 0 ? (
              list?.Career?.map((item, i) => (
                <div className="col-sm-12 col-md-12 col-lg-6" key={i}>
                  <div className="properyList">
                    <div className="propertyImgBox">
                      <img
                        src={
                          item?.image?.includes("http")
                            ? item?.image
                            : "/assets/img/dummyImage.png"
                        }
                        alt=""
                        className="propImg"
                      />
                    </div>
                    <div className="proprtyInfo w-100">
                      <h5 className="text-capitalize">{item?.title}</h5>
                      <h6>{item?.experience}</h6>
                      <div
                        className="line5 dangp0"
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></div>
                      <div
                        className="loginBtn btn deailViewAbsula"
                        role="button"
                        onClick={() => {
                          setmodalName("apply now");
                          setposition(item?.title);
                          handleShow();
                        }}
                      >
                        Apply
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                No Carrer Found
              </div>
            )}
          </div>
          {!loading && list?.Career?.length > 0 && (
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
      {show && modalName === "apply now" && (
        <ApplyNowModal
          show={show}
          handleShow={handleShow}
          position={position}
          setmodalName={setmodalName}
          modalName={modalName}
        />
      )}
      {show && modalName === "success" && (
        <SuccessModal show={show} handleShow={handleShow} page="carrer" />
      )}
    </>
  );
}

export default Career;
