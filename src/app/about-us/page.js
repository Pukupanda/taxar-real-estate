import { getAboutApi } from "@/api/apiCall";
export const dynamic = true;
async function AboutUs() {
  const detail = await getAboutApi();
  console.log(detail, "detail");

  return (
    <>
      <section className="">
        <div className="container">
          <div className="">
            <div className="mt-3 bg-white p-3">
              <div
                dangerouslySetInnerHTML={{ __html: detail?.data?.aboutUs }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
