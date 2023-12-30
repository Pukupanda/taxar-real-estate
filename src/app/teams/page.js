import { teamsListApi } from "@/api/apiCall";
import Image from "next/image";
export const dynamic = true;

async function Teams() {
  const list = await teamsListApi();

  return (
    <>
      <section className="mt-5">
        <div className="container">
          {list?.data?.Team?.length > 0 ? (
            <>
              {list?.data?.Team?.slice(0, 2)?.map((item, i) => (
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
                    <h4 className="mt-3">{item?.fullName}</h4>
                    <h6>
                      <i>{item?.designation}</i>
                    </h6>
                    <p>{item?.description}</p>
                  </div>
                </div>
              ))}
              <div className="row align-items-center justify-content-center">
                {list?.data?.Team?.slice(2, list?.data?.Team?.length)?.map(
                  (item, i) => (
                    <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={i}>
                      <div className="bg-white shadow rounded p-3 text-center">
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
                          className="rounded-circle m-auto ob-cover"
                        />
                        <h4 className="mt-3">{item?.fullName}</h4>
                        <h6>
                          <i>{item?.designation}</i>
                        </h6>
                        <p>{item?.description}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <div className="col-sm-12 col-md-12 col-lg-12 text-center">
              No Team Found
            </div>
          )}

          <div className="row align-items-center justify-content-center d-none">
            {list?.data?.Team?.length > 0
              ? list?.data?.Team?.slice(2, list?.data?.Team?.length)?.map(
                  (item, i) => (
                    <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={i}>
                      <div className="bg-white shadow rounded p-3">
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
                        <h4 className="mt-3">{item?.fullName}</h4>
                        <h6>
                          <i>{item?.designation}</i>
                        </h6>
                        <p>{item?.description}</p>
                      </div>
                    </div>
                  )
                )
              : ""}
          </div>
        </div>
      </section>
    </>
  );
}

export default Teams;
