"use client";
import { useDataStore } from "@/api/store/store";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";

function PrivacyPolicy() {
  const [loading, setloading] = useState(false);
  const detail = useDataStore((store) => store.privacyPolicy);
  const { fetchprivacyPolicy } = useDataStore();
  useEffect(() => {
    setloading(true);
    fetchprivacyPolicy().then(() => {
      setloading(false);
    });
  }, []);

  return (
    <>
      <section className="">
        <div className="container">
          <div className="">
            {/* <div className="aboutContent">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-4">
              <img
                src="assets/img/dummyImage.png"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-8">
              <div className="p-4">
                <h3>About Us</h3>
                <p>
                  Sharlene is a savvy businesswoman with a passion for real
                  estate. She views it is a true privilege to provide
                  clients guidance with their home buying and selling.
                  Always demonstrating the highest levels of honesty,
                  integrity, and professionalism with gratitude, Sharlene
                  dedicates her time and efforts to delivering clients
                  white-glove service and strives for best results. She
                  earns the respect of her clients by working diligently on
                  their behalf and by always offering them candid advice
                  with a warm and friendly approach.
                </p>

                <p>
                  Raised both in Taiwan and the United States, Sharlene is
                  fluent in Mandarin and Cantonese in addition to English.
                  She appreciates and understands the different cultures and
                  their nuances, which has helped her to understand her
                  clients&apos; needs and provide them with the best service
                  possible. Sharlene&apos;s background in hospitality
                  procurement and project management have also served as one
                  of the foundations for her success as a real estate agent.
                </p>

                <p>
                  While at Compass, Sharlene has played an integral role in
                  overseeing multimillion dollar real estate transactions.
                  Always aiming to exceed expectations, Sharlene is
                  committed to serving her clients. When Sharlene isn&apos;t
                  busy with work, you&apos;ll find her practicing yoga,
                  taking short trips, spending time with friends and family.
                </p>
              </div>
            </div>
          </div>
        </div> */}
            <div className="mt-3 bg-white p-3">
              {loading ? (
                <Loader />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: detail }}></div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PrivacyPolicy;
