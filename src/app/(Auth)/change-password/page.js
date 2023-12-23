"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ChangePasswordApi } from "@/api/apiCall";

function ChangePassword() {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    toggle: false,
    toggle1: false,
    toggle2: false,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Required"),
      currentPassword: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
    }),
    enableReinitialize: true,
    onSubmit: (values, { isSubmitting, resetForm }) => {
      setLoading(true);
      const payload = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };
      ChangePasswordApi(payload).then((data) => {
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
                <h3>Change Password</h3>
              </div>

              <div className="form-floating mb-3">
                <input
                  type={formik.values.toggle2 ? "text" : "password"}
                  className="form-control"
                  placeholder=""
                  id="currentPassword"
                  {...formik.getFieldProps("currentPassword")}
                />
                <label for="currentPassword">Current Password</label>
                <span
                  className={
                    formik.values.toggle2
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
                          toggle2: !prevState.values.toggle2,
                        },
                      };
                    });
                  }}
                ></span>
                {formik.errors.currentPassword &&
                  formik.touched.currentPassword && (
                    <div className="text-danger">
                      {" "}
                      {formik.errors.currentPassword}
                    </div>
                  )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type={formik.values.toggle ? "text" : "password"}
                  className="form-control"
                  placeholder=""
                  id="newPassword"
                  {...formik.getFieldProps("newPassword")}
                />
                <label for="newPassword">New Password</label>
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
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <div className="text-danger">
                    {" "}
                    {formik.errors.newPassword}
                  </div>
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

export default ChangePassword;
