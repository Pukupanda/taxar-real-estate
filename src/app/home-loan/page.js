import { homeLoanApi } from "@/api/apiCall";
export const dynamic = true;

async function HomeLoan() {
  const detail = await homeLoanApi();
  return (
    <>
      <section className="min-vh-50">
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

export default HomeLoan;
