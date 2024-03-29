"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LoginApi, sendNotification } from "@/api/apiCall";
import { useDataStore } from "@/api/store/store";
import Image from "next/image";

function Login() {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const { fetchgetDetail } = useDataStore();

  const pageUrl = Cookies.get("pageUrl");

  const initialValues = {
    userType: "",
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
        userType: values.userType,
      };
      LoginApi(payload).then(async (data) => {
        if (data?.code === 1) {
          toast.success(data.message);
          await sendNotification();
          Cookies.set("Taxar", data?.data?.user?.token);
          fetchgetDetail();
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
              <h6>Are You a</h6>
              <div className="d-flex justify-content-start gap-4 align-items-center mb-3">
                <label
                  role="button"
                  className="d-flex gap-2 align-items-center"
                >
                  <input
                    type="radio"
                    className="d-none"
                    placeholder=""
                    value={"1"}
                    name="userType"
                    onChange={(e) => {
                      formik.setFieldValue("userType", e.target.value);
                    }}
                  />
                  <Image
                    src={`/assets/img/${
                      formik.values.userType === "1"
                        ? "RadioSelected.png"
                        : "radioUnselect.png"
                    }`}
                    alt=""
                    width={18}
                    height={18}
                    quality={100}
                    priority
                  />
                  User
                </label>
                <label
                  role="button"
                  className="d-flex gap-2 align-items-center"
                >
                  <input
                    type="radio"
                    className="d-none"
                    placeholder=""
                    value={"2"}
                    name="userType"
                    onChange={(e) => {
                      formik.setFieldValue("userType", e.target.value);
                    }}
                  />
                  <Image
                    src={`/assets/img/${
                      formik.values.userType === "2"
                        ? "RadioSelected.png"
                        : "radioUnselect.png"
                    }`}
                    alt=""
                    width={18}
                    height={18}
                    quality={100}
                    priority
                  />
                  Broker
                </label>
                {formik.errors.userType && formik.touched.userType && (
                  <div className="text-danger"> {formik.errors.userType}</div>
                )}
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
