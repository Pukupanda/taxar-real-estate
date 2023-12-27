"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import { useDataStore } from "@/api/store/store";

function EMICalculator() {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const data = useDataStore((store) => store.emiCalculator);
  const { fetchemiCalculator } = useDataStore();

  const initialValues = {
    principal: "",
    interestRate: "",
    tenure: "",
    tenureType: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      principal: Yup.string().required("Required"),
      interestRate: Yup.string().required("Required"),
      tenure: Yup.string().required("Required"),
      tenureType: Yup.string().required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: (values, { isSubmitting, resetForm }) => {
      setLoading(true);
      const payload = {
        principal: values.principal,
        interestRate: values.interestRate,
        tenure: values.tenure,
        tenureType: values.tenureType,
      };

      fetchemiCalculator(payload).then(() => {
        setLoading(false);
      });
    },
  });
  console.log(data, "data");
  return (
    <>
      <section className="mt-3 ">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="">
                <form onSubmit={formik.handleSubmit}>
                  <div className="text-center"></div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      id="principal"
                      {...formik.getFieldProps("principal")}
                    />
                    <label for="principal">Principal</label>
                    {formik.errors.principal && formik.touched.principal && (
                      <div className="text-danger">
                        {" "}
                        {formik.errors.principal}
                      </div>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      id="interestRate"
                      {...formik.getFieldProps("interestRate")}
                    />
                    <label for="interestRate">Interest Rate</label>
                    {formik.errors.interestRate &&
                      formik.touched.interestRate && (
                        <div className="text-danger">
                          {" "}
                          {formik.errors.interestRate}
                        </div>
                      )}
                  </div>
                  <div className="form-floating mb-3">
                    <select
                      type="text"
                      className="form-control"
                      placeholder=""
                      id="tenureType"
                      {...formik.getFieldProps("tenureType")}
                    >
                      <option value={""}>Select</option>
                      <option value={"1"}>Year</option>
                      <option value={"2"}>Month</option>
                    </select>
                    <label htmlFor="tenureType">Tenure Type</label>
                    {formik.errors.tenureType && formik.touched.tenureType && (
                      <div className="text-danger">
                        {" "}
                        {formik.errors.tenureType}
                      </div>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      id="tenure"
                      {...formik.getFieldProps("tenure")}
                    />
                    <label for="tenure">Tenure</label>
                    {formik.errors.tenure && formik.touched.tenure && (
                      <div className="text-danger"> {formik.errors.tenure}</div>
                    )}
                  </div>

                  <div className="text-center mb-3">
                    <button type="submit" className="btn loginBtn w-50 fs-4">
                      {loading ? <Loader /> : "Send"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <h3>EMI</h3>
              <p>Rs.{data?.emi}</p>
              <h3>Total Interest</h3>
              <p>Rs.{data?.totalInterest}</p>
              <h3>Total Payment</h3>
              <p>Rs.{data?.totalPayment}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EMICalculator;
