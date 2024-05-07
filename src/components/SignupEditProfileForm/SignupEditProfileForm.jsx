"use client";
import { editProfileApi, signUpApi } from "@/api/apiCall";
import { registerBrokerApi, updatebrokerApi } from "@/api/broker/apis";
import { useDataStore } from "@/api/store/store";
import ImageUploadInput from "@/components/ImageUploadInput/ImageUploadInput";
import Loader from "@/components/Loader/Loader";
import MobileInput from "@/components/PhoneInput/MobileInput";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

function SignupEditProfileForm(props) {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const detail = useDataStore((store) => store.getDetail);
  const { fetchgetDetail } = useDataStore();

  const initialValues = {
    userType: detail?.userType ? detail?.userType?.toString() : "",
    userName: detail?.userName ? detail?.userName : "",
    firstName: detail?.firstName ? detail?.firstName : "",
    lastName: detail?.lastName ? detail?.lastName : "",
    countryCode: "",
    mobile: detail?.mobileNumber ? detail?.mobileNumber : "",
    email: detail?.email ? detail?.email : "",
    password: "",
    confirmPassword: "",
    profilePicture: detail?.profilePicture ? detail?.profilePicture : "",
    toggle: false,
    toggle1: false,
    idProofUrl: detail?.idProofUrl ? detail?.idProofUrl : "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      userType: Yup.string().required("Required"),
      userName:
        initialValues?.userType === "1" && Yup.string().required("Required"),
      firstName: Yup.string().required("Required"),
      mobile: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      idProofUrl:
        initialValues?.userType === "2" && Yup.string().required("Required"),
      password:
        props.pageName === "signup" && Yup.string().required("Required"),
      confirmPassword:
        props.pageName === "signup" &&
        Yup.string()
          .required("Required")
          .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    enableReinitialize: true,
    onSubmit: (values, { isSubmitting, resetForm }) => {
      setLoading(true);
      const payload = {
        userType: values.userType,
        email: values.email,
        password: props.pageName === "signup" ? values.password : null,
        userName: values.userName,
        firstName: values.firstName,
        lastName: values.lastName,
        mobileNumber: `${values.countryCode} ${values.mobile}`,
        profilePicture: values.profilePicture,
      };

      const brokerPaylod = {
        ...payload,
        idProofUrl: values.idProofUrl,
      };

      if (props.pageName === "signup") {
        if (values.userType === "1") {
          signUpApi(payload).then((data) => {
            if (data?.code === 1) {
              toast.success(data.message);
              push("/login");
              setLoading(false);
            } else {
              setLoading(false);
              toast.error(data.message);
            }
          });
        } else {
          registerBrokerApi(brokerPaylod).then((data) => {
            if (data?.code === 1) {
              toast.success(data.message);
              push("/login");
              setLoading(false);
            } else {
              setLoading(false);
              toast.error(data.message);
            }
          });
        }
      } else {
        if (values.userType === "1") {
          editProfileApi(payload).then((data) => {
            setLoading(false);
            if (data?.code === 1) {
              toast.success(data.message);
              fetchgetDetail();
              push("/");
            } else {
              setLoading(false);
              toast.error(data.message);
            }
          });
        } else {
          updatebrokerApi(brokerPaylod).then((data) => {
            setLoading(false);
            if (data?.code === 1) {
              toast.success(data.message);
              fetchgetDetail();
              push("/");
            } else {
              setLoading(false);
              toast.error(data.message);
            }
          });
        }
      }
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
        {props.pageName === "signup" && (
          <>
            <h6>Are You a</h6>
            <div className="d-flex justify-content-start gap-4 align-items-center mb-3">
              <label role="button" className="d-flex gap-2 align-items-center">
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
              <label role="button" className="d-flex gap-2 align-items-center">
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
          </>
        )}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder=""
            id="firstName"
            {...formik.getFieldProps("firstName")}
          />
          <label for="firstName">First Name</label>
          {formik.errors.firstName && formik.touched.firstName && (
            <div className="text-danger"> {formik.errors.firstName}</div>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder=""
            id="Last Name"
            {...formik.getFieldProps("lastName")}
          />
          <label for="Last Name">Last Name</label>
          {formik.errors.lastName && formik.touched.lastName && (
            <div className="text-danger"> {formik.errors.lastName}</div>
          )}
        </div>
        {formik.values.userType === "1" && (
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder=""
              id="UserName"
              {...formik.getFieldProps("userName")}
            />
            <label for="UserName">User Name</label>
            {formik.errors.userName && formik.touched.userName && (
              <div className="text-danger"> {formik.errors.userName}</div>
            )}
          </div>
        )}
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
          {/* <label for="email">Mobile Number</label> */}
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
        <div
          className={
            props.pageName === "signup" ? "form-floating mb-3" : "d-none"
          }
        >
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
        <div
          className={
            props.pageName === "signup" ? "form-floating mb-3" : "d-none"
          }
        >
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
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <div className="text-danger"> {formik.errors.confirmPassword}</div>
          )}
        </div>
        {formik.values.userType === "2" && (
          <div className="form-floating text-center mb-3">
            <ImageUploadInput
              imageURL={formik.values.idProofUrl}
              defaultImg="employe.png"
              inputKey="idProofUrl"
              formik={formik}
              mainClass="upload-btn-wrapper banner"
              showText="yes"
              Text="upload Id Proof"
            />
            {formik.errors.idProofUrl && formik.touched.idProofUrl && (
              <div className="text-danger"> {formik.errors.idProofUrl}</div>
            )}
          </div>
        )}
        <div className="text-center mb-3">
          <button
            type="submit"
            className="btn btn-save w-50 fs-4"
            disabled={loading ? "disabled" : ""}
          >
            {loading ? (
              <Loader />
            ) : props.pageName === "signup" ? (
              "Sign Up"
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default SignupEditProfileForm;
