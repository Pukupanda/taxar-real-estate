"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import { ForgotPasswordApi } from "@/api/apiCall";
import Cookies from "js-cookie";

function ForgotPassword() {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: (values, { isSubmitting, resetForm }) => {
      setLoading(true);
      const payload = {
        email: values.email,
      };
      ForgotPasswordApi(payload).then((data) => {
        if (data?.code === 1) {
          toast.success(data.message);
          Cookies.set("email", values.email);
          push("/OTP-verification");
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
      <section className="">
        <div className="singleBoxBg">
          <div className="singleBoxStyle">
            <form onSubmit={formik.handleSubmit}>
              <div className="text-center">
                <h3>Forgot Password</h3>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder=""
                  id="email"
                  {...formik.getFieldProps("email")}
                />
                <label for="email">Email</label>
                {formik.errors.email && formik.touched.email && (
                  <div className="text-danger"> {formik.errors.email}</div>
                )}
              </div>

              <div className="text-center mb-3">
                <button
                  type="submit"
                  className="btn btn-save w-50 fs-4"
                  disabled={loading ? "disabled" : ""}
                >
                  {loading ? <Loader /> : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgotPassword;
