"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/Loader";
import MobileInput from "@/components/PhoneInput/MobileInput";
import { applyNowApi } from "@/api/apiCall";
import DocUpload from "../docUpload/DocUpload";

function ApplyNowModal(props) {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    userName: "",
    position: props.position,
    countryCode: "",
    mobile: "",
    email: "",
    experience: "",
    expectedCtc: "",
    currentLocation: "",
    message: "",
    cvUrl: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      userName: Yup.string().required("Required"),
      mobile: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      // property: Yup.string().required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: (values, { isSubmitting, resetForm }) => {
      setLoading(true);
      const payload = {
        email: values.email,
        fullName: values.userName,
        position: values.position,
        countryCode: values.countryCode,
        mobileNumber: values.mobile,
        expectedCtc: values.expectedCtc,
        currentLocation: values.currentLocation,
        message: values.message,
        expirence: values.experience,
        cvUrl: values.cvUrl,
      };

      applyNowApi(payload).then((data) => {
        setLoading(false);
        if (data?.code === 1) {
          // toast.success(data.message);
          props.setmodalName("success");
        } else {
          setLoading(false);
          toast.error(data.message);
        }
      });
    },
  });
  return (
    <>
      <Modal show={props.show} onHide={props.handleShow} centered size="lg">
        <Modal.Header>
          <Modal.Title>Apply Now</Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-5 text-center">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder=""
                id="Name"
                {...formik.getFieldProps("userName")}
              />
              <label for="Name">Full Name</label>
              {formik.errors.userName && formik.touched.userName && (
                <div className="text-danger"> {formik.errors.userName}</div>
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
              />
              {formik.errors.mobile && formik.touched.mobile && (
                <div className="text-danger"> {formik.errors.mobile}</div>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder=""
                id="position"
                {...formik.getFieldProps("position")}
                readOnly
              />
              <label for="position">Position</label>
              {formik.errors.position && formik.touched.position && (
                <div className="text-danger"> {formik.errors.position}</div>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder=""
                id="experience"
                {...formik.getFieldProps("experience")}
              />
              <label for="experience">Total Experience</label>
              {formik.errors.experience && formik.touched.experience && (
                <div className="text-danger"> {formik.errors.experience}</div>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder=""
                id="expectedCtc"
                {...formik.getFieldProps("expectedCtc")}
              />
              <label for="expectedCtc">Expected CTC</label>
              {formik.errors.expectedCtc && formik.touched.expectedCtc && (
                <div className="text-danger"> {formik.errors.expectedCtc}</div>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder=""
                id="currentLocation"
                {...formik.getFieldProps("currentLocation")}
              />
              <label for="currentLocation">Current Location</label>
              {formik.errors.currentLocation &&
                formik.touched.currentLocation && (
                  <div className="text-danger">
                    {" "}
                    {formik.errors.currentLocation}
                  </div>
                )}
            </div>
            <div className="form-floating mb-3">
              <textarea
                rows={5}
                className="form-control h-auto"
                placeholder=""
                id="message"
                {...formik.getFieldProps("message")}
              ></textarea>
              <label for="message">Message</label>
              {formik.errors.message && formik.touched.message && (
                <div className="text-danger"> {formik.errors.message}</div>
              )}
            </div>
            <div className="form-floating mb-3">
              <label for="message">Resume</label>
              <DocUpload
                mainClass="upload-btn-wrapper banner"
                imageURL={formik.values.cvUrl}
                inputKey="cvUrl"
                showText="yes"
                Text="Upload CV"
                cemaraIcon="no"
                formik={formik}
                defaultImg="uploadFile.png"
                file="doc"
              />
              {formik.errors.cvUrl && formik.touched.cvUrl && (
                <div className="text-danger"> {formik.errors.cvUrl}</div>
              )}
            </div>
            <div className="text-center mb-3">
              <button
                type="submit"
                className="btn btn-save w-50 fs-4"
                disabled={loading ? "disabled" : ""}
              >
                {loading ? <Loader /> : "Apply Now"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ApplyNowModal;
