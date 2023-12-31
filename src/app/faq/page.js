"use client";
import { useDataStore } from "@/api/store/store";
import React, { useEffect, useState } from "react";

function FAQ() {
  const [show, setShow] = useState("");

  const detail = useDataStore((store) => store.faqsList);
  const { fetchfaqsList } = useDataStore();
  useEffect(() => {
    fetchfaqsList({ isActive: true });
  }, []);

  return (
    <>
      <section className="mt-4">
        <div className="container">
          {detail?.Faqs?.map((item, i) => (
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
                {show === item?._id && <p>{item?.answer}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default FAQ;
