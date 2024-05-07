"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ResetPasswordApi } from "@/api/apiCall";

function ResetPassword() {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    password: "",
    confirmPassword: "",
    toggle: false,
    toggle1: false,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    enableReinitialize: true,
    onSubmit: (values, { isSubmitting, resetForm }) => {
      setLoading(true);
      const payload = {
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
      };
      ResetPasswordApi(payload).then((data) => {
        if (data?.code === 1) {
          toast.success(data.message);
          Cookies.remove("Taxar");
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
      <section className="">
        <div className="singleBoxBg">
          <div className="singleBoxStyle">
            <form onSubmit={formik.handleSubmit}>
              <div className="text-center">
                <h3>Reset Password</h3>
              </div>

              <div className="form-floating mb-3">
                <input
                  type={formik.values.toggle ? "text" : "password"}
                  className="form-control"
                  placeholder=""
                  id="password"
                  {...formik.getFieldProps("password")}
                />
                <label for="password">Password</label>
                <span
                  className={
                    formik.values.toggle
                      ? "pass-hide field-icon toggle-password"
                      : "pass-view field-icon toggle-password"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    formik.setFormikState((prevState) => {
                      return {
                        ...prevState,
                        values: {
                          ...prevState.values,
                          toggle: !prevState.values.toggle,
                        },
                      };
                    });
                  }}
                ></span>
                {formik.errors.password && formik.touched.password && (
                  <div className="text-danger"> {formik.errors.password}</div>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type={formik.values.toggle1 ? "text" : "password"}
                  className="form-control"
                  placeholder=""
                  id="confirmpassword"
                  {...formik.getFieldProps("confirmPassword")}
                />
                <label for="confirmpassword">Confirm Password</label>
                <span
                  className={
                    formik.values.toggle1
                      ? "pass-hide field-icon toggle-password"
                      : "pass-view field-icon toggle-password"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    formik.setFormikState((prevState) => {
                      return {
                        ...prevState,
                        values: {
                          ...prevState.values,
                          toggle1: !prevState.values.toggle1,
                        },
                      };
                    });
                  }}
                ></span>
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <div className="text-danger">
                      {" "}
                      {formik.errors.confirmPassword}
                    </div>
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

export default ResetPassword;
