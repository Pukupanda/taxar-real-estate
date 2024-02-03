"use client";
import { FourSlideSettings, SingleImageCarouselsettings } from "@/Utils";
import SliderComponent from "@/components/sliderComponent/SliderComponent";
import ProjectBox from "@/components/projectBox/ProjectBox";
import { useDataStore } from "@/api/store/store";
import { useEffect, useState } from "react";
import PropertyBox from "@/components/projectBox/PropertyBox";
import Link from "next/link";
import { LikeUnlikePropertyApi } from "@/api/apiCall";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import NotificationModal from "@/components/modals/NotificationModal";
import io from "socket.io-client";
// import { socket } from "@/socket";

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

  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] = useState([]);

  // console.log(isConnected, "isConnected");
  // const socket = io();
  useEffect(() => {
    // socket.on("connect", () => {
    //   console.log("socket.connected"); // true
    // });
    // function onConnect() {
    //   setIsConnected(true);
    // }
    // function onDisconnect() {
    //   setIsConnected(false);
    // }
    // function onFooEvent(value) {
    //   setFooEvents((previous) => [...previous, value]);
    // }
    // socket.on("connect", onConnect);
    // socket.on("disconnect", onDisconnect);
    // socket.on("foo", onFooEvent);
    // return () => {
    //   socket.off("connect", onConnect);
    //   socket.off("disconnect", onDisconnect);
    //   socket.off("foo", onFooEvent);
    // };
  }, []);

  return (
    <>
      <section className="homeSlider">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
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
            <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
              <img
                src="assets/img/left-img.png"
                alt=""
                className="img-fluid w-100"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="aboutUs">
        <div className="container">
          <div className="aboutFixedBg">
            <div className="aboutContent">
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <img
                    src={
                      data?.AboutUs?.aboutImage?.includes("http")
                        ? data?.AboutUs?.aboutImage
                        : "assets/img/dummyImage.png"
                    }
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-8">
                  <div className="p-4">
                    <h3>About Us</h3>
                    <div
                      className="line9"
                      dangerouslySetInnerHTML={{
                        __html: data?.AboutUs?.aboutUs,
                      }}
                    ></div>
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
            <div className="col-sm-12 col-md-10 col-lg-10 mb-4">
              <h3 className="text-dark">Featured Property</h3>
            </div>
            <div className="col-sm-12 col-md-2 col-lg-2 mb-4 text-sm-end">
              <Link href={"/property"} className="text-dark fw-bold">
                View All
              </Link>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12">
              {data?.featuredProperties?.length > 0 ? (
                <SliderComponent setting={FourSlideSettings}>
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
          </div>
        </div>
      </section>
      <section className="">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="serviceBg">
                <h3>Our Core Services</h3>
                <p>List it on Nepalhomes and get genuine leads.</p>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="text-center">
                <img
                  src="assets/img/buy-a-home-svg.png"
                  alt=""
                  className="mb-3"
                />
                <h3>Buy a Home</h3>
                <p>
                  From our centralized search engine, you will find a property
                  you want to call home.
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="text-center">
                <img
                  src="assets/img/rent-a-home-svg.png"
                  alt=""
                  className="mb-3"
                />
                <h3>Rent a Home</h3>
                <p>
                  Whether you are a tenant or a landlord, renting property has
                  never become this easy with NepalHomes.
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="text-center">
                <img
                  src="assets/img/home-loans-svg.png"
                  alt=""
                  className="mb-3"
                />
                <h3>Home Loans</h3>
                <p>
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
            <div className="col-sm-12 col-md-10 col-lg-10  mb-4">
              <h3 className="text-dark">Featured Projects</h3>
            </div>
            <div className="col-sm-12 col-md-2 col-lg-2 mb-4 text-sm-end">
              <Link href={"/projects"} className="text-dark fw-bold">
                View All
              </Link>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12">
              {data?.featuredProject?.length > 0 ? (
                <SliderComponent setting={FourSlideSettings}>
                  {data?.featuredProject?.map((item, i) => (
                    <div key={i}>
                      <ProjectBox item={item} status="1" />
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

      <section className="aboutFixedBg mt-5">
        <div className="container">
          <div className="row justify-content-center py-4 bg-white">
            <div className="col-sm-12 col-md-12 col-lg-12 mb-4 text-center">
              <h3 className="">Our Teams</h3>
            </div>
            <div className="col-sm-12 col-md-9 col-lg-8">
              {data?.teams?.length > 0 ? (
                <SliderComponent setting={SingleImageCarouselsettings}>
                  {data?.teams?.map((item, i) => (
                    <div key={i}>
                      <div className="ourTeam text-center">
                        <img
                          src={
                            item?.profilePicture?.includes("http")
                              ? item?.profilePicture
                              : "/assets/img/dummyImage.png"
                          }
                          alt=""
                          width="100px"
                          height="100px"
                          className="rounded-circle m-auto ob-cover"
                        />
                        <h4 className="mt-3 text-capitalize">
                          {item?.fullName}
                        </h4>
                        <h6>
                          <i>{item?.designation}</i>
                        </h6>
                        <p>{item?.description}</p>
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
