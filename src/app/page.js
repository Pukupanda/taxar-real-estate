"use client";
import { SingleImageCarouselsettings, TwoSlideSettings } from "@/Utils";
import { LikeUnlikePropertyApi } from "@/api/apiCall";
import { useDataStore } from "@/api/store/store";
import Loader from "@/components/Loader/Loader";
import NotificationModal from "@/components/modals/NotificationModal";
import PropertyBox from "@/components/projectBox/PropertyBox";
import SliderComponent from "@/components/sliderComponent/SliderComponent";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const { push } = useRouter();

  const [NotoData, setNotoData] = useState("");

  const data = useDataStore((store) => store.homeScreen);
  const { fetchhomeScreen } = useDataStore();
  useEffect(() => {
    fetchhomeScreen();
  }, []);

  const show = useDataStore((store) => store.OpenModal);
  const { showModal } = useDataStore();
  const handleShow = () => {
    showModal(!show);
  };

  const LikeUnlikeProperty = (val) => {
    LikeUnlikePropertyApi(val).then((res) => {
      toast.success(res?.message);
      fetchhomeScreen();
    });
  };

  const list = useDataStore((store) => store.priorityMessage);
  const { fetchpriorityMessage } = useDataStore();

  useEffect(() => {
    fetchpriorityMessage().then(() => {
      setNotoData("show");
    });
  }, []);

  return (
    <>
      <section className="homeSlider">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-6 col-lg-6 mb-3 position-relative mainBannerHeigth">
              <div className="mainBannerText">
                <h1 className="themeOrg mb-3">
                  &apos;Connecting People to Property and Prosperity&apos;
                </h1>
                <Link
                  className="btn-link d-block fs-5 py-2 px-4 rounded-pill w-50 text-center"
                  href="/booking"
                >
                  Book Now
                </Link>
              </div>
            </div>
            {/* <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
              <img
                src="assets/img/left-img.png"
                alt=""
                className="img-fluid w-100"
              />
            </div> */}
          </div>
        </div>
      </section>
      <section className="aboutUs bg-white">
        <div className="container">
          <div className="aboutFixedBg">
            <div className="">
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div className="p-4">
                    <h3 className="text-center themeOrg aboutContent aboutUsLine">
                      <span className="span">About Us</span>
                    </h3>
                    <div
                      className="line13"
                      dangerouslySetInnerHTML={{
                        __html: data?.AboutUs?.aboutUs,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div className="aboutImag">
                    <img
                      src={
                        data?.AboutUs?.aboutImage?.includes("http")
                          ? data?.AboutUs?.aboutImage
                          : "assets/img/dummyImage.png"
                      }
                      alt=""
                      className="img-fluid rounded-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 mb-4">
              <h5 className="sevtextTent">
                <span className="bg-white p-3 posiSpan">
                  <span className="span2">Featured Property</span>
                </span>
              </h5>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-12">
              {data?.featuredProperties?.length > 0 ? (
                <SliderComponent setting={TwoSlideSettings} className="styCard">
                  {data?.featuredProperties?.map((item, i) => (
                    <div key={i}>
                      <PropertyBox
                        item={item}
                        LikeUnlikeProperty={LikeUnlikeProperty}
                        push={push}
                      />
                    </div>
                  ))}
                </SliderComponent>
              ) : (
                <Loader />
              )}
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 mb-4 text-center">
              <Link href={"/property"} className="text-dark fw-bold">
                View All
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-sm-12 col-md-12 col-lg-12 mb-4">
              <h5 className="sevtextTent">
                <span className="bg-white p-3 posiSpan">
                  <span className="span2">Our Core Services</span>
                </span>
              </h5>
            </div>
            {/* <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="serviceBg">
                <h3>Our Core Services</h3>
                <p>List it on Nepalhomes and get genuine leads.</p>
              </div>
            </div> */}
            <div className="col-sm-6 col-md-4 col-lg-4 mb-4">
              <div className="text-start">
                <img
                  src="assets/img/buy-a-home-svg.png"
                  alt=""
                  className="mb-3"
                />
                <h3 className="themeOrg">Buy a Home</h3>
                <div className="dottedBorer"></div>
                <p className="text-align-justify">
                  From our centralized search engine, you will find a property
                  you want to call home
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4 mb-4">
              <div className="text-start">
                <img
                  src="assets/img/rent-a-home-svg.png"
                  alt=""
                  className="mb-3"
                />
                <h3 className="themeOrg">Rent a Home</h3>
                <div className="dottedBorer"></div>
                <p className="text-align-justify">
                  Whether you are a tenant or a landlord, renting property has
                  never become this easy with NepalHomes.
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4 mb-4">
              <div className="text-start">
                <img
                  src="assets/img/home-loans-svg.png"
                  alt=""
                  className="mb-3"
                />
                <h3 className="themeOrg">Home Loans</h3>
                <div className="dottedBorer"></div>
                <p className="text-align-justify">
                  Explore our exclusive home loan guides and help yourself make
                  safer investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 mb-4">
              <h5 className="sevtextTent">
                <span className="bg-white p-3 posiSpan">
                  <span className="span2">Featured Projects</span>
                </span>
              </h5>
            </div>

            {data?.featuredProject?.length > 0 ? (
              data?.featuredProject?.map((item, i) => (
                <div className="col-sm-6 col-md-4 col-lg-4 mb-4" key={i}>
                  <div
                    className="hover01"
                    onClick={() => {
                      push(`/property/${item?._id}`);
                    }}
                  >
                    <figure>
                      <img
                        src={
                          item?.images?.[0]?.image?.includes("http")
                            ? item?.images?.[0]?.image
                            : "/assets/img/dummyImage.png"
                        }
                        className="img-fluid"
                      />
                    </figure>
                    <div className="missinContent">
                      <h3 className="text-capitalize">{item?.title}</h3>
                      <p className="mb-0">{item?.location}</p>
                      <p className="mb-0">{item?.propertyType}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // <SliderComponent setting={FourSlideSettings}>
              //   {data?.featuredProject?.map((item, i) => (
              //     <div key={i}>
              //       <ProjectBox item={item} status="1" />
              //     </div>
              //   ))}
              // </SliderComponent>
              <Loader />
            )}

            <div className="col-sm-12 col-md-12 col-lg-12 mb-4 text-center">
              <Link href={"/projects"} className="text-dark fw-bold">
                View All
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container">
          <div className="row justify-content-center py-4 bg-white">
            <div className="col-sm-12 col-md-12 col-lg-12 mb-4 text-center">
              <h5 className="sevtextTent">
                <span className="bg-white p-3 posiSpan">
                  <span className="span2">Our Teams</span>
                </span>
              </h5>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12">
              {data?.teams?.length > 0 ? (
                <SliderComponent setting={TwoSlideSettings}>
                  {data?.teams?.map((item, i) => (
                    <div key={i}>
                      <div className="ourTeam">
                        <img
                          src={
                            item?.profilePicture?.includes("http")
                              ? item?.profilePicture
                              : "/assets/img/dummyImage.png"
                          }
                          alt=""
                          fill
                          className="ourTeamImag position-static"
                        />
                        <div>
                          <h4 className="mt-3 themeGrn fw-bold text-capitalize">
                            {item?.fullName}
                          </h4>
                          <h6 className="themeGrn">
                            <i>{item?.designation}</i>
                          </h6>
                          <p className="themeGrn line3">{item?.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </SliderComponent>
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </section>
      {show && NotoData === "show" && (
        <NotificationModal show={show} handleShow={handleShow} list={list} />
      )}
    </>
  );
}
