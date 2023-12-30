import { getprivacyPolicyApi } from "@/api/apiCall";
export const dynamic = true;
async function PrivacyPolicy() {
  const detail = await getprivacyPolicyApi();

  return (
    <>
      <section className="">
        <div className="container">
          <div className="">
            <div className="mt-3 bg-white p-3">
              <div dangerouslySetInnerHTML={{ __html: detail?.data }}></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PrivacyPolicy;
