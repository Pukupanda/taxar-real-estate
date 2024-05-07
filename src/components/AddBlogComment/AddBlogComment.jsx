"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import { useDataStore } from "@/api/store/store";
import ImageUploadInput from "../ImageUploadInput/ImageUploadInput";
import { addCommentApi } from "@/api/apiCall";

function AddBlogComment(props) {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    userName: "",
    email: "",
    profilePicture: "",
    message: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      userName: Yup.string().required("Required"),
      message: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: (values, { isSubmitting, resetForm }) => {
      setLoading(true);
      const payload = {
        email: values.email,
        name: values.userName,
        message: values.message,
        image: values.profilePicture,
        blogId: props.id,
      };

      addCommentApi(payload).then((data) => {
        if (data?.code === 1) {
          toast.success(data.message);
          props.fetchBlogDetails({ id: props.id });
          setLoading(false);
          formik.setFieldValue("userName", "");
          formik.setFieldValue("email", "");
          formik.setFieldValue("profilePicture", "");
          formik.setFieldValue("message", "");
        } else {
          setLoading(false);
          toast.error(data.message);
        }
      });
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-floating text-center mb-3">
          <ImageUploadInput
            imageURL={formik.values.profilePicture}
            defaultImg="employe.png"
            inputKey="profilePicture"
            formik={formik}
            mainClass="upload-btn-wrapper"
          />
          {formik.errors.profilePicture && formik.touched.profilePicture && (
            <div className="text-danger"> {formik.errors.profilePicture}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            {...formik.getFieldProps("userName")}
          />
          {formik.errors.userName && formik.touched.userName && (
            <div className="text-danger"> {formik.errors.userName}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Your Email"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-danger"> {formik.errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <textarea
            class="form-control"
            rows="7"
            placeholder="Write a comment"
            {...formik.getFieldProps("message")}
          ></textarea>
          {formik.errors.message && formik.touched.message && (
            <div className="text-danger"> {formik.errors.message}</div>
          )}
        </div>
        <div class="text-start mb-3">
          <button
            type="submit"
            class="btn loginBtn"
            disabled={loading ? "disabled" : ""}
          >
            {loading ? <Loader /> : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}

export default AddBlogComment;
