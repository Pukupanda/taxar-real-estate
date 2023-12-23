"use client";
import React, { useRef } from "react";
import { FieldArray, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import Loader from "../Loader/Loader";
import ImageUploadInput from "../ImageUploadInput/ImageUploadInput";

function AddEditProperty() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    images: [{ image: "" }],
    title: "",
    propertyCode: "",
    propertyFor: "",
    category: "",
    subCategory: "",
    displayImage: "",
    price: "",
    priceInWords: "",
    area: "",
    unit: "",
    contactNo: "",
    secondaryContactNo: "",
    location: "",
    city: "",
    lat: "",
    long: "",
    features: "",
    details: "",
    pArea: "",
    isFeatured: "",
    facingDirection: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      propertyType: Yup.string().required("Required"),
      sellingType: Yup.string().required("Required"),
      title: Yup.string().required("Required"),
      price: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: (values, { isSubmitting, resetForm }) => {
      setLoading(true);
      const payload = {
        images: [{ image: "" }],
        title: "",
        propertyCode: "",
        propertyFor: "",
        category: "",
        subCategory: "",
        displayImage: "",
        price: "",
        priceInWords: "",
        area: "",
        unit: "",
        contactNo: "",
        secondaryContactNo: "",
        location: "",
        city: "",
        lat: "",
        long: "",
        features: "",
        details: "",
        pArea: "",
        isFeatured: "",
        facingDirection: "",
      };

      const Editpayload = {
        images: [{ image: "" }],
        title: "",
        propertyCode: "",
        propertyFor: "",
        category: "",
        subCategory: "",
        displayImage: "",
        price: "",
        priceInWords: "",
        area: "",
        unit: "",
        contactNo: "",
        secondaryContactNo: "",
        location: "",
        city: "",
        lat: "",
        long: "",
        features: "",
        details: "",
        pArea: "",
        isFeatured: "",
        facingDirection: "",
        propertyId: id,
      };

      console.log(id ? Editpayload : payload, "dataPay");

      // if (id) {
      //   dispatch(AddEditPropertiesReducer(Editpayload)).then((data) => {
      //     setLoading(false);
      //     if (data?.payload?.code === 1) {
      //       toast.success(data.payload.message);
      //       navigate("/property", {
      //         replace: true,
      //       });
      //     } else {
      //       setLoading(false);
      //       toast.error(data.payload.message);
      //     }
      //   });
      // } else {
      //   dispatch(AddEditPropertiesReducer(payload)).then((data) => {
      //     setLoading(false);
      //     if (data?.payload?.code === 1) {
      //       toast.success(data.payload.message);
      //       navigate("/property", {
      //         replace: true,
      //       });
      //     } else {
      //       setLoading(false);
      //       toast.error(data.payload.message);
      //     }
      //   });
      // }
    },
  });

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-10 col-lg-8">
            <div className="text-center mt-3">
              <h2 className="offcanvas-title mb-3">
                {id ? "Edit" : "Add"} Property
              </h2>
            </div>
            <form className="p-3 px-sm-5 shadow" onSubmit={formik.handleSubmit}>
              <div className="row">
                <FormikProvider value={formik}>
                  <FieldArray
                    name="images"
                    render={(arrayHelpers) => (
                      <>
                        {formik.values?.images?.map((item, i) => (
                          <div
                            className="col-sm-12 col-md-6 mb-4 position-relative"
                            key={i}
                          >
                            <div className="form-group text-center">
                              <ImageUploadInput
                                mainClass="upload-btn-wrapper banner"
                                imageURL={item?.image}
                                inputKey={`images.${i}.image`}
                                showText="yes"
                                Text="Upload Image"
                                cemaraIcon="no"
                                formik={formik}
                                defaultImg="employe.png"
                              />
                            </div>
                            <div
                              className="remove arr"
                              onClick={() => {
                                let arr = [...formik.values?.images];
                                arr.splice(i, 1);
                                formik.setFormikState((prev) => {
                                  return {
                                    ...prev,
                                    values: {
                                      ...prev.values,
                                      images: arr,
                                    },
                                  };
                                });
                              }}
                            >
                              <img src="/assets/img/delete.png" alt="" />
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  />
                </FormikProvider>

                <div className="col-sm-12 col-md-12 mb-4">
                  <div className="form-group text-end">
                    <h6
                      className="textColor d-inline-block cursor-pointer AddtoList"
                      onClick={() => {
                        //setTimeSlotIndex(timeSlotIndex + 1);
                        let arr = [...formik.values?.images];
                        arr.push({
                          image: "",
                        });
                        formik.setFormikState((prev) => {
                          //console.log(prev);
                          return {
                            ...prev,
                            values: {
                              ...prev.values,
                              images: arr,
                            },
                          };
                        });
                        //console.log(arr);
                      }}
                    >
                      + Add More Image
                    </h6>
                  </div>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        {...formik.getFieldProps("title")}
                      />
                    </div>
                  </div>
                  {formik.errors.title && formik.touched.title && (
                    <div className="text-danger"> {formik.errors.title}</div>
                  )}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <select
                        className="form-control form-select text-capitalize"
                        name="propertyType"
                        value={formik.values.propertyType}
                        {...formik.getFieldProps("propertyType")}
                      >
                        <option value="">Select Property Type</option>
                      </select>
                    </div>
                  </div>
                  {formik.errors.propertyType &&
                    formik.touched.propertyType && (
                      <div className="text-danger">
                        {" "}
                        {formik.errors.propertyType}
                      </div>
                    )}
                </div>

                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <select
                        className="form-control form-select text-capitalize"
                        name="sellingType"
                        {...formik.getFieldProps("sellingType")}
                      >
                        <option value="">Select Property Listing</option>
                      </select>
                    </div>
                  </div>
                  {formik.errors.sellingType && formik.touched.sellingType && (
                    <div className="text-danger">
                      {" "}
                      {formik.errors.sellingType}
                    </div>
                  )}
                </div>

                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="No of Rooms"
                        {...formik.getFieldProps("noRooms")}
                      />
                    </div>
                  </div>
                  {formik.errors.noRooms && formik.touched.noRooms && (
                    <div className="text-danger"> {formik.errors.noRooms}</div>
                  )}
                </div>

                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="No of Bathrooms"
                        {...formik.getFieldProps("noBathrooms")}
                      />
                    </div>
                  </div>
                  {formik.errors.noBathrooms && formik.touched.noBathrooms && (
                    <div className="text-danger">
                      {" "}
                      {formik.errors.noBathrooms}
                    </div>
                  )}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="No of Floors"
                        {...formik.getFieldProps("noFloor")}
                      />
                    </div>
                  </div>
                  {formik.errors.noFloor && formik.touched.noFloor && (
                    <div className="text-danger"> {formik.errors.noFloor}</div>
                  )}
                </div>

                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Area"
                        {...formik.getFieldProps("area")}
                      />
                    </div>
                  </div>
                  {formik.errors.area && formik.touched.area && (
                    <div className="text-danger"> {formik.errors.area}</div>
                  )}
                </div>

                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Price"
                        name="price"
                        {...formik.getFieldProps("price")}
                      />
                    </div>
                  </div>
                  {formik.errors.price && formik.touched.price && (
                    <div className="text-danger"> {formik.errors.price}</div>
                  )}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Location"
                        {...formik.getFieldProps("location")}
                      />
                      {/* <Autocomplete
                    apiKey={mapApiKey}
                    name="location"
                    value={formik.values.location}
                    ref={autocompleteRef}
                    className="form-control"
                    placeholder="Location"
                    onChange={() => {
                      // console.log(autocompleteRef);
                      formik.setFieldValue(
                        "location",
                        autocompleteRef.current.value
                      );
                      formik.setFieldValue("lat", "");
                      formik.setFieldValue("lng", "");
                    }}
                    onPlaceSelected={(place, inputRef, autocompleteRef) => {
                      //console.log(place, inputRef, autocompleteRef);
                      if (place) {
                        let lat = place.geometry.location.lat();
                        let lng = place.geometry.location.lng();
                        let address = place.formatted_address;

                        formik.setFieldValue("location", address);
                        formik.setFieldValue("lat", lat);
                        formik.setFieldValue("lng", lng);
                      }
                    }}
                    options={{
                      types: ["(regions)"],
                      componentRestrictions: { country: "in" },
                    }}
                  /> */}
                    </div>
                  </div>
                  {formik.errors.location && formik.touched.location && (
                    <div className="text-danger"> {formik.errors.location}</div>
                  )}
                </div>
                <div className="col-sm-12 col-md-12 text-center mb-5">
                  <button type="submit" className="btn btn-save w-50">
                    {loading ? <Loader /> : id ? "Update" : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEditProperty;
