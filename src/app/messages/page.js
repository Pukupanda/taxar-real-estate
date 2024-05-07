"use client";
import Image from "next/image";
import DescriptionModal from "../../components/modals/DescriptionModal";
import { useEffect, useState } from "react";
import { useDataStore } from "../../api/store/store";

function Messages() {
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
          {list?.Team?.length > 0
            ? list?.Team?.map((tm, i) => (
                <>
                  <div
                    className="row align-items-center justify-content-center"
                    key={i}
                  >
                    {/* <div className="col-sm-12 col-md-12 col-lg-12 mb-4 text-center">
                        <h3>{tm?._id}</h3>
                      </div> */}
                    {tm?.teams
                      ?.filter((it) => it?.message !== undefined)
                      .map((item, ii) => (
                        <div
                          className="col-sm-12 col-md-12 col-lg-12 mb-4"
                          key={ii}
                        >
                          <div
                            className="bg-white shadow rounded p-3"
                            onClick={() => {
                              setdescription(item);
                              handleShow();
                            }}
                            role="button"
                          >
                            <div className="d-grid text-center gap-3">
                              <Image
                                src={
                                  item?.profilePicture?.includes("http")
                                    ? item?.profilePicture
                                    : "/assets/img/dummyImage.png"
                                }
                                alt=""
                                quality={100}
                                priority
                                width={100}
                                height={100}
                                className="rounded-circle ob-cover m-auto"
                              />
                              <div>
                                <h5 className="text-capitalize">
                                  {item?.fullName}
                                </h5>
                                <h6>
                                  <i>{item?.designation}</i>
                                </h6>
                              </div>
                            </div>
                            <div
                              className="line2 text-center"
                              dangerouslySetInnerHTML={{
                                __html: item?.message,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              ))
            : null}
          {/* {list?.Team?.length > 0 ? (
            <>
              <div className="row align-items-center justify-content-center">
                {list?.Team?.map((item, i) => (
                  <div className="col-sm-6 col-md-4 col-lg-4 mb-4" key={i}>
                    <div
                      className="bg-white shadow rounded p-3"
                      onClick={() => {
                        setdescription(item?.message);
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
                        dangerouslySetInnerHTML={{ __html: item?.message }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null} */}
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

export default Messages;
