"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import OtpInput from "react-otp-input";
import { ForgotPasswordApi, OTPVerificationApi } from "@/api/apiCall";
import Cookies from "js-cookie";
import "./style.css";

function OTP() {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const email = Cookies.get("email");

  const [seconds, setSeconds] = useState(30);
  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
  }, [seconds]);

  const resendCode = () => {
    ForgotPasswordApi({
      email: email,
      serType: 1,
    }).then((data) => {
      if (data?.code === 1) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    });
  };

  const initialValues = {
    otp: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      otp: Yup.string()
        .required("Required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(6, "Kindly enter valid otp.")
        .max(6, "Kindly enter valid otp."),
    }),
    enableReinitialize: true,
    onSubmit: (values, { isSubmitting, resetForm }) => {
      setLoading(true);
      const payload = {
        email: email,
        otp: parseInt(values.otp),
        serType: 1,
      };
      OTPVerificationApi(payload).then((data) => {
        if (data?.code === 1) {
          toast.success(data.message);
          Cookies.set("Taxar", data?.data?.token);
          Cookies.remove("email");
          push("/reset-password");
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
                <h3>OTP Verification</h3>
              </div>
              <div className="form-floating mb-3">
                <OtpInput
                  containerStyle="passcode-wrapper"
                  value={formik.values.otp}
                  onChange={(val) => {
                    formik.setFieldValue("otp", val);
                  }}
                  inputStyle={"otpInputs"}
                  numInputs={6}
                  separator={<span> </span>}
                  keyboardType={"numeric"}
                  shouldAutoFocus={true}
                  renderInput={(props) => <input {...props} />}
                />
                {formik.errors.otp && formik.touched.otp && (
                  <div className="text-danger"> {formik.errors.otp}</div>
                )}
              </div>
              <div className="text-center mb-2">
                <p className="otp-timing">
                  {" "}
                  <span>00:{seconds > 9 ? seconds : `0${seconds}`} </span>
                </p>
              </div>
              <div className="text-center mb-3">
                <button
                  type="submit"
                  className="btn btn-save w-50 fs-4"
                  disabled={loading ? "disabled" : ""}
                >
                  {loading ? <Loader /> : "Verify"}
                </button>
              </div>
              <div className="form-group col-sm-12 col-md-12 text-center mb-4">
                <span
                  className={
                    seconds === 0 ? "forgot-pass p-0" : "forgot-pass d-none p-0"
                  }
                  onClick={() => {
                    resendCode();
                    setSeconds(30);
                  }}
                  role="button"
                >
                  Resend Code
                </span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default OTP;
