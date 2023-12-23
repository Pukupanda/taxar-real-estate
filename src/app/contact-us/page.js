"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/Loader";
import MobileInput from "@/components/PhoneInput/MobileInput";
import { getInTouchApi } from "@/api/apiCall";
import { useRouter } from "next/navigation";

function ContactUs() {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const initialValues = {
    userName: "",
    countryCode: "",
    mobile: "",
    email: "",
    message: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      userName: Yup.string().required("Required"),
      message: Yup.string().required("Required"),
      mobile: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: (values, { isSubmitting, resetForm }) => {
      setLoading(true);
      const payload = {
        email: values.email,
        name: values.userName,
        message: values.message,
        mobileNumber: `${values.countryCode} ${values.mobile}`,
      };

      getInTouchApi(payload).then((data) => {
        if (data?.code === 1) {
          toast.success(data.message);
          push("/");
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(data.message);
        }
      });
    },
  });
  return (
    <>
      <section className="mt-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="bg-white shadow rounded p-3">
                <form onSubmit={formik.handleSubmit}>
                  <div className="text-center">
                    <h3>Get In Touch</h3>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      id="Name"
                      {...formik.getFieldProps("userName")}
                    />
                    <label for="Name">Name</label>
                    {formik.errors.userName && formik.touched.userName && (
                      <div className="text-danger">
                        {" "}
                        {formik.errors.userName}
                      </div>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder=""
                      id="Email"
                      {...formik.getFieldProps("email")}
                    />
                    <label for="Email">Email</label>
                    {formik.errors.email && formik.touched.email && (
                      <div className="text-danger"> {formik.errors.email}</div>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <MobileInput
                      mobile="mobile"
                      countryCode="countryCode"
                      valueMobile={formik.values.mobile}
                      valueCountryCode={formik.values.countryCode}
                      formik={formik}
                      placeholder="mobile Number"
                    />
                    {/* <label for="Mobile Number">Mobile Number</label> */}
                    {formik.errors.mobile && formik.touched.mobile && (
                      <div className="text-danger"> {formik.errors.mobile}</div>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control h-auto"
                      rows="7"
                      placeholder=""
                      id="Message"
                      {...formik.getFieldProps("message")}
                    ></textarea>
                    <label for="Message">Message</label>
                    {formik.errors.message && formik.touched.message && (
                      <div className="text-danger">
                        {" "}
                        {formik.errors.message}
                      </div>
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
              <img src="assets/img/Map.png" alt="" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
