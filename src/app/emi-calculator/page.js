"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import { useDataStore } from "@/api/store/store";

function EMICalculator() {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const data = useDataStore((store) => store.emiCalculator);
  const { fetchemiCalculator } = useDataStore();

  const val = [
    { value: data?.emi || 736, label: "EMI", bg: "#3296ED", bd: "#3296ED" },
    {
      value: data?.totalInterest || 5,
      label: "Total Interest",
      bg: "#006699",
      bd: "#006699",
    },
    {
      value: data?.totalPayment || 1500,
      label: "Total Payment",
      bg: "orange",
      bd: "orange",
    },
  ];

  const options = {
    title: {
      display: true,
      // text: "Número de registros",
      fontColor: "white",
    },

    legend: {
      position: "right",
      align: "start",
      labels: { fontColor: "white" },
    },
    layout: {
      padding: 15,
    },
    plugins: {
      labels: { render: "percentage", fontColor: "white" },
    },
  };

  const processedData = {
    labels: val.map((i) => i.label),
    datasets: [
      {
        // label: "# of votes",
        data: val.map((i) => i.value),
        backgroundColor: val.map((i) => i.bg),
        borderColor: val.map((i) => i.bd),
        borderWidth: 1,
      },
    ],
  };

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
        principal: values.principal.toString(),
        interestRate: values.interestRate.toString(),
        tenure: values.tenure.toString(),
        tenureType: values.tenureType,
      };

      fetchemiCalculator(payload).then(() => {
        setLoading(false);
      });
    },
  });

  return (
    <>
      <section className="mt-3 ">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-3 col-lg-3">
              <div className="">
                <form onSubmit={formik.handleSubmit}>
                  <div className="text-center"></div>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
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
                      type="number"
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
                      type="number"
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
                      type="number"
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
              <div className="w-100 h-100">
                <Doughnut
                  className="w-75 h-auto m-auto"
                  data={processedData}
                  options={options}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-3 col-lg-3">
              <h3>EMI</h3>
              <p>Rs.{data?.emi || 0}</p>
              <h3>Total Interest</h3>
              <p>Rs.{data?.totalInterest || 0}</p>
              <h3>Total Payment</h3>
              <p>Rs.{data?.totalPayment || 0}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EMICalculator;
