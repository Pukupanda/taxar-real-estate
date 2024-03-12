"use client";
import { useDataStore } from "@/api/store/store";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";

function FAQ() {
  const [loading, setloading] = useState(false);
  const [show, setShow] = useState("");

  const detail = useDataStore((store) => store.faqsList);
  const { fetchfaqsList } = useDataStore();
  useEffect(() => {
    setloading(true);
    fetchfaqsList({ isActive: true }).then(() => {
      setloading(false);
    });
  }, []);

  return (
    <>
      <section className="mt-4">
        <div className="container">
          {loading ? (
            <div className="d-table min-vh-50 w-100">
              <div className="tableCellVerMiddle">
                <Loader />
              </div>
            </div>
          ) : (
            detail?.Faqs?.map((item, i) => (
              <div className="mb-3 bg-white shadow p-3" key={i}>
                <div className="">
                  <h3
                    className={`position-relative faqToggle text-capitalize ${
                      show === item?._id && "rotete"
                    }`}
                    onClick={() => {
                      setShow(item?._id);
                    }}
                    role="button"
                  >
                    {item?.question}
                  </h3>
                  {show === item?._id && (
                    <div
                      className=""
                      dangerouslySetInnerHTML={{ __html: item?.answer }}
                    ></div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default FAQ;
