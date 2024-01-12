"use client";
import Image from "next/image";
import DescriptionModal from "../../components/modals/DescriptionModal";
import { useEffect, useState } from "react";
import { useDataStore } from "../../api/store/store";

function Teams() {
  const [show, setshow] = useState(false);
  const [description, setdescription] = useState("");
  const list = useDataStore((store) => store.teamsList);
  const { fetchteamsList } = useDataStore();

  const handleShow = () => {
    setshow(!show);
  };

  useEffect(() => {
    fetchteamsList();
  }, []);

  return (
    <>
      <section className="mt-5">
        <div className="container">
          {list?.Team?.length > 0 ? (
            <>
              {/* {list?.Team?.slice(0, 2)?.map((item, i) => (
                <div
                  className="row align-items-center colReverse shadow mb-5"
                  key={i}
                >
                  <div className="col-sm-12 col-md-4 col-lg-3 mb-3 pt-3">
                    <Image
                      src={
                        item?.profilePicture?.includes("http")
                          ? item?.profilePicture
                          : "/assets/img/dummyImage.png"
                      }
                      alt=""
                      className="teamImg position-relative"
                      fill
                      quality={100}
                      priority
                    />
                  </div>
                  <div className="col-sm-12 col-md-8 col-lg-9 mb-3">
                    <h4 className="mt-3 text-capitalize">{item?.fullName}</h4>
                    <h6>
                      <i>{item?.designation}</i>
                    </h6>
                  <div
                        className="line2"
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></div>
                  </div>
                </div>
              ))} */}
              <div className="row align-items-center justify-content-center">
                <div className="col-sm-12 col-md-12 col-lg-12 mb-4 text-center">
                  <h3>Board of Member</h3>
                </div>
                {list?.Team?.map((item, i) => (
                  <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={i}>
                    <div
                      className="bg-white shadow rounded p-3"
                      onClick={() => {
                        setdescription(item?.designation);
                        handleShow();
                      }}
                      role="button"
                    >
                      <div className="d-flex gap-3">
                        <Image
                          src={
                            item?.profilePicture?.includes("http")
                              ? item?.profilePicture
                              : "/assets/img/dummyImage.png"
                          }
                          alt=""
                          quality={100}
                          priority
                          width={50}
                          height={50}
                          className="rounded-circle ob-cover"
                        />
                        <div>
                          <h5 className="text-capitalize">{item?.fullName}</h5>
                          <h6>
                            <i>{item?.designation}</i>
                          </h6>
                        </div>
                      </div>
                      <div
                        className="line2"
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
          {list?.Team?.length > 0 ? (
            <>
              {/* {list?.Team?.slice(0, 2)?.map((item, i) => (
                <div
                  className="row align-items-center colReverse shadow mb-5"
                  key={i}
                >
                  <div className="col-sm-12 col-md-4 col-lg-3 mb-3 pt-3">
                    <Image
                      src={
                        item?.profilePicture?.includes("http")
                          ? item?.profilePicture
                          : "/assets/img/dummyImage.png"
                      }
                      alt=""
                      className="teamImg position-relative"
                      fill
                      quality={100}
                      priority
                    />
                  </div>
                  <div className="col-sm-12 col-md-8 col-lg-9 mb-3">
                    <h4 className="mt-3 text-capitalize">{item?.fullName}</h4>
                    <h6>
                      <i>{item?.designation}</i>
                    </h6>
                  <div
                        className="line2"
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></div>
                  </div>
                </div>
              ))} */}
              <div className="row align-items-center justify-content-center">
                <div className="col-sm-12 col-md-12 col-lg-12 mb-4 text-center">
                  <h3>Sub Committee</h3>
                </div>
                {list?.Team?.map((item, i) => (
                  <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={i}>
                    <div className="bg-white shadow rounded p-3">
                      <div className="d-flex gap-3">
                        <Image
                          src={
                            item?.profilePicture?.includes("http")
                              ? item?.profilePicture
                              : "/assets/img/dummyImage.png"
                          }
                          alt=""
                          quality={100}
                          priority
                          width={50}
                          height={50}
                          className="rounded-circle ob-cover"
                        />
                        <div>
                          <h5 className="text-capitalize">{item?.fullName}</h5>
                          <h6>
                            <i>{item?.designation}</i>
                          </h6>
                        </div>
                      </div>
                      <div
                        className="line2"
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
          {list?.Team?.length > 0 ? (
            <>
              {/* {list?.Team?.slice(0, 2)?.map((item, i) => (
                <div
                  className="row align-items-center colReverse shadow mb-5"
                  key={i}
                >
                  <div className="col-sm-12 col-md-4 col-lg-3 mb-3 pt-3">
                    <Image
                      src={
                        item?.profilePicture?.includes("http")
                          ? item?.profilePicture
                          : "/assets/img/dummyImage.png"
                      }
                      alt=""
                      className="teamImg position-relative"
                      fill
                      quality={100}
                      priority
                    />
                  </div>
                  <div className="col-sm-12 col-md-8 col-lg-9 mb-3">
                    <h4 className="mt-3 text-capitalize">{item?.fullName}</h4>
                    <h6>
                      <i>{item?.designation}</i>
                    </h6>
                  <div
                        className="line2"
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></div>
                  </div>
                </div>
              ))} */}
              <div className="row align-items-center justify-content-center">
                <div className="col-sm-12 col-md-12 col-lg-12 mb-4 text-center">
                  <h3>Staff</h3>
                </div>
                {list?.Team?.map((item, i) => (
                  <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={i}>
                    <div className="bg-white shadow rounded p-3">
                      <div className="d-flex gap-3">
                        <Image
                          src={
                            item?.profilePicture?.includes("http")
                              ? item?.profilePicture
                              : "/assets/img/dummyImage.png"
                          }
                          alt=""
                          quality={100}
                          priority
                          width={50}
                          height={50}
                          className="rounded-circle ob-cover"
                        />
                        <div>
                          <h5 className="text-capitalize">{item?.fullName}</h5>
                          <h6>
                            <i>{item?.designation}</i>
                          </h6>
                        </div>
                      </div>
                      <div
                        className="line2"
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
          {list?.Team?.length > 0 ? (
            <>
              {/* {list?.Team?.slice(0, 2)?.map((item, i) => (
                <div
                  className="row align-items-center colReverse shadow mb-5"
                  key={i}
                >
                  <div className="col-sm-12 col-md-4 col-lg-3 mb-3 pt-3">
                    <Image
                      src={
                        item?.profilePicture?.includes("http")
                          ? item?.profilePicture
                          : "/assets/img/dummyImage.png"
                      }
                      alt=""
                      className="teamImg position-relative"
                      fill
                      quality={100}
                      priority
                    />
                  </div>
                  <div className="col-sm-12 col-md-8 col-lg-9 mb-3">
                    <h4 className="mt-3 text-capitalize">{item?.fullName}</h4>
                    <h6>
                      <i>{item?.designation}</i>
                    </h6>
                  <div
                        className="line2"
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></div>
                  </div>
                </div>
              ))} */}
              <div className="row align-items-center justify-content-center">
                <div className="col-sm-12 col-md-12 col-lg-12 mb-4 text-center">
                  <h3>Stakeholders</h3>
                </div>
                {list?.Team?.map((item, i) => (
                  <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={i}>
                    <div className="bg-white shadow rounded p-3">
                      <div className="d-flex gap-3">
                        <Image
                          src={
                            item?.profilePicture?.includes("http")
                              ? item?.profilePicture
                              : "/assets/img/dummyImage.png"
                          }
                          alt=""
                          quality={100}
                          priority
                          width={50}
                          height={50}
                          className="rounded-circle ob-cover"
                        />
                        <div>
                          <h5 className="text-capitalize">{item?.fullName}</h5>
                          <h6>
                            <i>{item?.designation}</i>
                          </h6>
                        </div>
                      </div>
                      <div
                        className="line2"
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>
      {show && (
        <DescriptionModal
          show={show}
          handleShow={handleShow}
          data={description}
        />
      )}
    </>
  );
}

export default Teams;
