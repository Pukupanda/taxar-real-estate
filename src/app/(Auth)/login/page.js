"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LoginApi } from "@/api/apiCall";

function Login() {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const pageUrl = Cookies.get("pageUrl");

  const initialValues = {
    email: "",
    password: "",
    toggle: false,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: (values, { isSubmitting, resetForm }) => {
      setLoading(true);
      const payload = {
        email: values.email,
        password: values.password,
      };
      LoginApi(payload).then((data) => {
        if (data?.code === 1) {
          toast.success(data.message);
          Cookies.set("Taxar", data?.data?.user?.token);
          if (pageUrl) {
            push(pageUrl);
            Cookies.remove("pageUrl");
          } else {
            push("/");
          }
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
              {/* <div className="text-center">
                <h3>Log In</h3>
              </div> */}
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
              <div className="text-center mb-3">
                <Link href="/forgot-password" className="text-dark">
                  Forgot Password
                </Link>
              </div>
              <div className="text-center mb-3">
                <button
                  type="submit"
                  className="btn btn-save w-50 fs-4"
                  disabled={loading ? "disabled" : ""}
                >
                  {loading ? <Loader /> : "Log In"}
                </button>
              </div>
              <div className="text-center mb-3">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="themeOrg">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
