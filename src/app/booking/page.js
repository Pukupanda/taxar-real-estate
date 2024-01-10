"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/Loader";
import MobileInput from "@/components/PhoneInput/MobileInput";
import { createBookingApi } from "@/api/apiCall";
import SuccessModal from "@/components/modals/SuccessModal";
import { useDataStore } from "@/api/store/store";

function Booking() {
  const [loading, setLoading] = useState(false);
  const [show, setshow] = useState(false);
  const [modalName, setmodalName] = useState("");
  const [projectId, setProjectId] = useState("");
  const handleShow = () => {
    setshow(!show);
  };

  const projectList = useDataStore((store) => store.ProjectList);
  const { fetchProjectList } = useDataStore();

  const propertyList = useDataStore((store) => store.ProjectDetails);
  const { fetchProjectDetails } = useDataStore();

  const detail = useDataStore((store) => store.getDetail);

  const initialValues = {
    userName: detail?.userName ? detail?.userName : "",
    project: "",
    property: "",
    countryCode: "",
    mobile: detail?.mobileNumber ? detail?.mobileNumber : "",
    email: detail?.email ? detail?.email : "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      userName: Yup.string().required("Required"),
      mobile: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      project: Yup.string().required("Required"),
      property: Yup.string().required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: (values, { isSubmitting, resetForm }) => {
      setLoading(true);
      const payload = {
        email: values.email,
        name: values.userName,
        propertyId: values.property,
        contactNumber: `${values.countryCode} ${values.mobile}`,
      };

      createBookingApi(payload).then((data) => {
        setLoading(false);
        if (data?.code === 1) {
          // toast.success(data.message);
          setmodalName("success");
          handleShow();
        } else {
          setLoading(false);
          toast.error(data.message);
        }
      });
    },
  });

  useEffect(() => {
    fetchProjectList();
  }, []);
  useEffect(() => {
    if (projectId) {
      fetchProjectDetails(projectId);
    }
  }, [projectId]);

  return (
    <>
      <section className="">
        <div className="singleBoxBg">
          <div className="singleBoxStyle p-3">
            <form onSubmit={formik.handleSubmit}>
              {/* <div className="text-center">
                <h3>Booking</h3>
              </div> */}
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
                <select
                  className="form-control form-select text-capitalize"
                  placeholder=""
                  id="project"
                  onChange={(e) => {
                    setProjectId(e.target.value);
                    formik.setFieldValue("project", e.target.value);
                    formik.setFieldValue("property", "");
                  }}
                  onBlur={formik.handleBlur}
                >
                  <option>Select Project</option>
                  {projectList?.Project?.map((item, i) => (
                    <option value={item?._id} key={i}>
                      {item?.title}
                    </option>
                  ))}
                </select>
                <label for="project">Project</label>
                {formik.errors.project && formik.touched.project && (
                  <div className="text-danger"> {formik.errors.project}</div>
                )}
              </div>
              <div className="form-floating mb-3">
                <select
                  className="form-control form-select"
                  placeholder=""
                  id="Property"
                  {...formik.getFieldProps("property")}
                >
                  <option>Select Property</option>
                  {propertyList?.properties?.map((item, i) => (
                    <option value={item?._id} key={i}>
                      {item?.propertyCode}, Area-{item?.area}
                      {item?.unit}, Price-{item?.price}, Plot No-{item?.plotNo}
                    </option>
                  ))}
                </select>
                <label for="Property">Property</label>
                {formik.errors.property && formik.touched.property && (
                  <div className="text-danger"> {formik.errors.property}</div>
                )}
              </div>
              <div className="text-center mb-3">
                <button
                  type="submit"
                  className="btn btn-save w-50 fs-4"
                  disabled={loading ? "disabled" : ""}
                >
                  {loading ? <Loader /> : "Book Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {show && modalName === "success" && (
        <SuccessModal show={show} handleShow={handleShow} />
      )}
    </>
  );
}

export default Booking;
