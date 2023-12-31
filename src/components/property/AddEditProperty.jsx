"use client";
import React from "react";
import { FieldArray, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import Loader from "../Loader/Loader";
import ImageUploadInput from "../ImageUploadInput/ImageUploadInput";
import MobileInput from "@/components/PhoneInput/MobileInput";
import TextEditor from "@/components/TextEditor/TextEditor";
import { AddPropertyApi } from "@/api/apiCall";
import { useDataStore } from "@/api/store/store";
import CreatableSelect from "react-select/creatable";
import { category, propertyFor, subCategory } from "@/Utils";

function AddEditProperty() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const detail = useDataStore((store) => store.propertyDetail);
  const { fetchPropertyDetail } = useDataStore();
  useEffect(() => {
    if (id) {
      fetchPropertyDetail({ id: id });
    }
  }, [id]);

  const FeatureList = useDataStore((store) => store.propertyFeatureList);
  const { fetchpropertyFeatureList } = useDataStore();
  useEffect(() => {
    fetchpropertyFeatureList();
  }, [id]);

  const ProjectList = useDataStore((store) => store.ProjectList);
  const { fetchProjectList } = useDataStore();
  useEffect(() => {
    fetchProjectList();
  }, [id]);

  const mob1 = id && detail?.propertyDetails?.contactNo?.split(" ");

  const countryCode = mob1?.[0];
  const contactNo = mob1?.[1];

  const mob2 = id && detail?.propertyDetails?.secondaryContactNo?.split(" ");

  const secondarycountryCode = mob2?.[0];
  const secondaryContactNo = mob2?.[1];

  // console.log(mob1, "mob1");

  const Feature = FeatureList?.Feature?.map((item) => {
    return {
      label: item?.label,
      value: item?.value,
      icon: item?.icon,
      _id: item?._id,
      checked: false,
    };
  });

  const initialValues = {
    images: id
      ? detail?.propertyDetails?.images?.map((item) => {
          return {
            image: item?.image,
          };
        })
      : [],
    title: id ? detail?.propertyDetails?.title : "",
    propertyCode: id ? detail?.propertyDetails?.propertyCode : "",
    propertyFor: id ? detail?.propertyDetails?.propertyFor : "",
    category: id ? detail?.propertyDetails?.category : "",
    subCategory: id ? detail?.propertyDetails?.subCategory : "",
    displayImage: id ? detail?.propertyDetails?.displayImage : "",
    price: id ? detail?.propertyDetails?.price : "",
    priceInWords: id ? detail?.propertyDetails?.priceInWords : "",
    area: id ? detail?.propertyDetails?.area : "",
    unit: id ? detail?.propertyDetails?.unit : "",
    countryCode: id ? countryCode : "",
    contactNo: id ? contactNo : "",
    secondaryCountryCode: id ? secondarycountryCode : "",
    secondaryContactNo: id ? secondaryContactNo : "",
    location: id ? detail?.propertyDetails?.location : "",
    city: id ? detail?.propertyDetails?.city : "",
    lat: id ? detail?.propertyDetails?.lat : "76.47564",
    long: id ? detail?.propertyDetails?.long : "72.867484",
    features: id
      ? detail?.propertyDetails?.features?.length > 0
        ? Feature?.map((fd) => {
            let arr = [...detail?.propertyDetails?.features];
            let isfound = arr.find((it) => it?._id === fd?._id);
            if (isfound) {
              return {
                _id: isfound?._id,
                label: fd?.label,
                value: fd?.value,
                icon: fd?.icon,
                checked: true,
              };
            }
            return fd;
          })
        : Feature
      : Feature,
    otherFeatures: detail?.propertyDetails?.otherFeatures || "",
    shortDetails: id ? detail?.propertyDetails?.shortDescription : "",
    details: id ? detail?.propertyDetails?.details : "",
    pArea: id ? detail?.propertyDetails?.pArea : "",
    isFeatured: id ? detail?.propertyDetails?.isFeatured : false,
    facingDirection: id ? detail?.propertyDetails?.facingDirection : "",
    projectId: id ? detail?.propertyDetails?.projectId : "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      category: Yup.string().required("Required"),
      subCategory: Yup.string().required("Required"),
      title: Yup.string().required("Required"),
      price: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      propertyCode: Yup.string().required("Required"),
      area: Yup.string().required("Required"),
      unit: Yup.string().required("Required"),
      pArea: Yup.string().required("Required"),
      facingDirection: Yup.string().required("Required"),
      propertyFor: Yup.string().required("Required"),
      details: Yup.string().required("Required"),
      shortDetails: Yup.string().required("Required"),
      displayImage: Yup.string().required("Required"),
      contactNo: Yup.string().required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: (values, { isSubmitting, resetForm }) => {
      setLoading(true);

      let arr = values.features
        ?.filter((item) => item?.checked)
        ?.map((fd) => {
          return {
            label: fd?.label,
            value: fd?.value,
            icon: fd?.icon,
            _id: fd?._id,
          };
        });

      const payload = {
        propertyId: "",
        projectId: values.projectId || null,
        title: values.title,
        propertyCode: values.propertyCode,
        propertyFor: values.propertyFor,
        category: values.category,
        subCategory: values.subCategory,
        displayImage: values.displayImage,
        images: values.images,
        price: values.price,
        priceInWords: values.priceInWords,
        area: parseInt(values.area),
        unit: values.unit,
        contactNo: `${values.countryCode} ${values.contactNo}`,
        secondaryContactNo: `${values.secondaryCountryCode} ${values.secondaryContactNo}`,
        location: values.location,
        city: values.city,
        lat: values.lat,
        long: values.long,
        features: arr,
        details: values.details,
        pArea: values.pArea,
        noOfProperty: "",
        isFeatured: values.isFeatured,
        shortDescription: values.shortDetails,
        facingDirection: values.facingDirection,
        otherFeatures:
          values.otherFeatures?.length > 0
            ? values.otherFeatures?.map((item) => {
                return {
                  label: item?.label,
                  value: item?.value,
                };
              })
            : [],
      };

      const Editpayload = {
        propertyId: id,
        projectId: values.projectId || null,
        title: values.title,
        propertyCode: values.propertyCode,
        propertyFor: values.propertyFor,
        category: values.category,
        subCategory: values.subCategory,
        displayImage: values.displayImage,
        images: values.images,
        price: values.price,
        priceInWords: values.priceInWords,
        area: parseInt(values.area),
        unit: values.unit,
        contactNo: `${values.countryCode} ${values.contactNo}`,
        secondaryContactNo: `${values.secondaryCountryCode} ${values.secondaryContactNo}`,
        location: values.location,
        city: values.city,
        lat: values.lat,
        long: values.long,
        features: arr,
        details: values.details,
        pArea: values.pArea,
        noOfProperty: "",
        isFeatured: values.isFeatured,
        shortDescription: values.shortDetails,
        facingDirection: values.facingDirection,
        otherFeatures:
          values.otherFeatures?.length > 0
            ? values.otherFeatures?.map((item) => {
                return {
                  label: item?.label,
                  value: item?.value,
                };
              })
            : [],
      };

      // console.log(id ? Editpayload : payload, "dataPay");

      if (id) {
        AddPropertyApi(Editpayload).then((data) => {
          setLoading(false);
          if (data?.code === 1) {
            toast.success(data?.message);
            push("/my-property", {
              replace: true,
            });
          } else {
            setLoading(false);
            toast.error(data?.message);
          }
        });
      } else {
        AddPropertyApi(payload).then((data) => {
          setLoading(false);
          if (data?.code === 1) {
            toast.success(data?.message);
            push("/my-property", {
              replace: true,
            });
          } else {
            setLoading(false);
            toast.error(data?.message);
          }
        });
      }
    },
  });

  return (
    <>
      <div className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-10 col-lg-8">
            <div className="text-center mt-3">
              <h2 className="offcanvas-title mb-3">
                {id ? "Edit" : "Add"} Property
              </h2>
            </div>
            <form
              className="p-3 px-sm-5 formStyle shadow"
              onSubmit={formik.handleSubmit}
            >
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <ImageUploadInput
                        mainClass="upload-btn-wrapper banner"
                        imageURL={formik.values.displayImage}
                        inputKey={`displayImage`}
                        showText="yes"
                        Text="Upload Display Image"
                        cemaraIcon="no"
                        formik={formik}
                        defaultImg="employe.png"
                      />
                    </div>
                  </div>
                  {formik.errors.displayImage &&
                    formik.touched.displayImage && (
                      <div className="text-danger">
                        {" "}
                        {formik.errors.displayImage}
                      </div>
                    )}
                </div>

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
                      role="button"
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
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Property Code"
                        {...formik.getFieldProps("propertyCode")}
                      />
                    </div>
                  </div>
                  {formik.errors.propertyCode &&
                    formik.touched.propertyCode && (
                      <div className="text-danger">
                        {" "}
                        {formik.errors.propertyCode}
                      </div>
                    )}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <select
                        className="form-control form-select text-capitalize"
                        {...formik.getFieldProps("projectId")}
                      >
                        <option value="">Select Project</option>
                        {ProjectList?.Project?.map((item, i) => (
                          <option value={item?._id} key={i}>
                            {item?.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {formik.errors.projectId && formik.touched.projectId && (
                    <div className="text-danger">
                      {" "}
                      {formik.errors.projectId}
                    </div>
                  )}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <select
                        className="form-control form-select text-capitalize"
                        {...formik.getFieldProps("propertyFor")}
                      >
                        <option value="">Select property For</option>
                        {propertyFor?.map((item, i) => (
                          <option value={item?.value} key={i}>
                            {item?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {formik.errors.propertyFor && formik.touched.propertyFor && (
                    <div className="text-danger">
                      {" "}
                      {formik.errors.propertyFor}
                    </div>
                  )}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <select
                        className="form-control form-select text-capitalize"
                        {...formik.getFieldProps("category")}
                      >
                        <option value="">Select Catagory</option>
                        {category?.map((item, i) => (
                          <option value={item?.value} key={i}>
                            {item?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {formik.errors.category && formik.touched.category && (
                    <div className="text-danger"> {formik.errors.category}</div>
                  )}
                </div>

                {formik.values.category && (
                  <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                    <div className="form-group">
                      <div className="input-container">
                        <select
                          className="form-control form-select text-capitalize"
                          {...formik.getFieldProps("subCategory")}
                        >
                          <option value="">Select sub Category</option>
                          {subCategory
                            ?.filter(
                              (it) => it?.category === formik.values.category
                            )
                            ?.map((item, i) => (
                              <option value={item?.value} key={i}>
                                {item?.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    {formik.errors.subCategory &&
                      formik.touched.subCategory && (
                        <div className="text-danger">
                          {" "}
                          {formik.errors.subCategory}
                        </div>
                      )}
                  </div>
                )}

                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <input
                        type="number"
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
                      <select
                        className="form-control form-select"
                        {...formik.getFieldProps("unit")}
                      >
                        <option value="">Select Unit</option>
                        <option value="sq.ft">sq.ft</option>
                        <option value="meter">meter</option>
                        <option value="cm">cm</option>
                      </select>
                    </div>
                  </div>
                  {formik.errors.unit && formik.touched.unit && (
                    <div className="text-danger"> {formik.errors.unit}</div>
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

                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        {...formik.getFieldProps("city")}
                      />
                    </div>
                  </div>
                  {formik.errors.city && formik.touched.city && (
                    <div className="text-danger"> {formik.errors.city}</div>
                  )}
                </div>

                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <input
                        type="number"
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
                        placeholder="Popular Area"
                        {...formik.getFieldProps("pArea")}
                      />
                    </div>
                  </div>
                  {formik.errors.pArea && formik.touched.pArea && (
                    <div className="text-danger"> {formik.errors.pArea}</div>
                  )}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <select
                        className="form-control form-select"
                        {...formik.getFieldProps("facingDirection")}
                      >
                        <option value={""}>Facing Direction</option>
                        <option value={"East"}>East</option>
                        <option value={"West"}>West</option>
                        <option value={"South"}>South</option>
                        <option value={"North"}>North</option>
                        <option value={"North East"}>North East</option>
                        <option value={"South East"}>South East</option>
                        <option value={"South West"}>South West</option>
                        <option value={"South East"}>South East</option>
                      </select>
                    </div>
                  </div>
                  {formik.errors.facingDirection &&
                    formik.touched.facingDirection && (
                      <div className="text-danger">
                        {" "}
                        {formik.errors.facingDirection}
                      </div>
                    )}
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12 mb-4">
                  <h5>Features</h5>
                  <div className="">
                    <div className="radio-buttons mb-3">
                      {formik?.values?.features?.map((item, i) => (
                        <div className="form-group" key={i}>
                          <input
                            type="checkbox"
                            id={item?._id}
                            name={`features.${i}.checked`}
                            checked={item?.checked}
                            onChange={(e) => {
                              let checked = e.target.checked;
                              formik.setFieldValue(
                                `features.${i}.checked`,
                                checked
                              );
                            }}
                          />
                          <label htmlFor={item?._id}>{item?.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {formik.errors.features && formik.touched.features && (
                    <div className="text-danger"> {formik.errors.features}</div>
                  )}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 mb-4">
                  <h5>Other Features</h5>
                  <div className="">
                    <CreatableSelect
                      value={formik.values.otherFeatures}
                      isClearable
                      isMulti
                      onChange={(newValue) => {
                        // setotherFeaturesArr(newValue);
                        formik.setFieldValue("otherFeatures", newValue);
                      }}
                      placeholder="Type Other Features and press enter..."
                    />
                  </div>
                  {formik.errors.features && formik.touched.features && (
                    <div className="text-danger"> {formik.errors.features}</div>
                  )}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <h6>Contact No</h6>
                  <div className="form-group">
                    <div className="input-container">
                      <MobileInput
                        mobile="contactNo"
                        countryCode="countryCode"
                        valueMobile={formik.values.contactNo}
                        valueCountryCode={formik.values.countryCode}
                        formik={formik}
                      />
                    </div>
                  </div>
                  {formik.errors.contactNo && formik.touched.contactNo && (
                    <div className="text-danger">
                      {" "}
                      {formik.errors.contactNo}
                    </div>
                  )}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                  <h6>Secondary Contact No</h6>
                  <div className="form-group">
                    <div className="input-container">
                      <MobileInput
                        mobile="secondaryContactNo"
                        countryCode="secondaryCountryCode"
                        valueMobile={formik.values.secondaryContactNo}
                        valueCountryCode={formik.values.secondaryCountryCode}
                        formik={formik}
                      />
                    </div>
                  </div>
                  {formik.errors.secondaryContactNo &&
                    formik.touched.secondaryContactNo && (
                      <div className="text-danger">
                        {" "}
                        {formik.errors.secondaryContactNo}
                      </div>
                    )}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 mb-4">
                  <div className="">
                    <div className="input-container">
                      <textarea
                        rows={5}
                        className="form-control"
                        placeholder="Short Description"
                        {...formik.getFieldProps("shortDetails")}
                      />
                    </div>
                  </div>
                  {formik.errors.shortDetails &&
                    formik.touched.shortDetails && (
                      <div className="text-danger">
                        {" "}
                        {formik.errors.shortDetails}
                      </div>
                    )}
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 mb-4">
                  <div className="form-group">
                    <div className="input-container">
                      <TextEditor
                        name="details"
                        value={formik.values.details}
                        formik={formik}
                        placeholder="Description"
                        onBlur={formik.onBlur}
                      />
                    </div>
                  </div>
                  {formik.errors.details && formik.touched.details && (
                    <div className="text-danger"> {formik.errors.details}</div>
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
