"use client";
import React, { useState } from "react";
import "./style.css";
import MultiRangeSlider from "multi-range-slider-react";
import { useFormik } from "formik";
import * as Yup from "yup";

function Filter(props) {
  const [loading, setloading] = useState(false);
  const initialValues = {
    search: "",
    propertyFor: "",
    city: "",
    category: "",
    subCategory: "",
    budgetMin: 10,
    budgetMax: 50000,
    isFeatured: "",
    location: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      // category: Yup.string().required("Required"),
      // subCategory: Yup.string().required("Required"),
      // title: Yup.string().required("Required"),
      // price: Yup.string().required("Required"),
      // location: Yup.string().required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: (values, { isSubmitting, resetForm }) => {
      setloading(true);

      const payload = {
        page: props.page,
        limit: 10,
        search: values.search,
        propertyFor: values.propertyFor,
        city: values.city,
        category: values.category,
        subCategory: values.subCategory,
        budgetMin: values.budgetMin,
        budgetMax: values.budgetMax,
        location: values.location,
        isFeatured: values.isFeatured,
      };

      console.log(payload, "dataPay");
      props.apiCall(props.id, payload).then(() => {
        setloading(false);
      });
    },
  });

  return (
    <>
      <div className="bg-white shadow rounded p-3 prertyFilter">
        <div className="d-flex justify-content-between gap-2 mb-2">
          <h6>FILTER YOUR SEARCH</h6>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder=""
            id="SearchCity"
            value={props.city}
            onChange={(e) => {
              props.setcity(e.target.value);
            }}
          />
          <label htmlFor="SearchCity">Search City, Locality, Project</label>
        </div>
        <div className="mb-3">
          <div className="radio-buttons">
            <div className="form-group">
              <input
                type="radio"
                id="Rent"
                name="propertyFor"
                value={"rent"}
                checked={props.propertyFor === "rent" ? "checked" : ""}
                onChange={(e) => {
                  props.setpropertyFor(e.target.value);
                }}
              />
              <label htmlFor="Rent">Rent</label>
            </div>
            <div className="form-group">
              <input
                type="radio"
                id="Buy"
                name="propertyFor"
                value={"buy"}
                checked={props.propertyFor === "buy" ? "checked" : ""}
                onChange={(e) => {
                  props.setpropertyFor(e.target.value);
                }}
              />
              <label htmlFor="Buy">Buy</label>
            </div>
          </div>
        </div>
        <h6>CATEGORIES</h6>
        <div className="radio-buttons mb-3">
          <div className="form-group">
            <input
              type="radio"
              id="land"
              name="category"
              value={"land"}
              checked={props.category === "land" ? "checked" : ""}
              onChange={(e) => {
                props.setcategory(e.target.value);
              }}
            />
            <label htmlFor="land">land</label>
          </div>
          <div className="form-group">
            <input
              type="radio"
              id="house"
              name="category"
              value={"house"}
              checked={props.category === "house" ? "checked" : ""}
              onChange={(e) => {
                props.setcategory(e.target.value);
              }}
            />
            <label htmlFor="house">house</label>
          </div>
        </div>

        {props.category !== "" && <h6>SUBCATEGORY</h6>}
        <div className="radio-buttons mb-3">
          {props.category === "house" ? (
            <>
              <div className="form-group">
                <input
                  type="radio"
                  id="mansion"
                  name="subCategory"
                  value={"mansion"}
                  checked={props.subCategory === "mansion" ? "checked" : ""}
                  onChange={(e) => {
                    props.setsubCategory(e.target.value);
                  }}
                />
                <label htmlFor="mansion">mansion</label>
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  id="bungalow"
                  name="subCategory"
                  value={"bungalow"}
                  checked={props.subCategory === "bungalow" ? "checked" : ""}
                  onChange={(e) => {
                    props.setsubCategory(e.target.value);
                  }}
                />
                <label htmlFor="bungalow">bungalow</label>
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  id="triplex"
                  name="subCategory"
                  value={"triplex"}
                  checked={props.subCategory === "triplex" ? "checked" : ""}
                  onChange={(e) => {
                    props.setsubCategory(e.target.value);
                  }}
                />
                <label htmlFor="triplex">triplex</label>
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  id="duplex"
                  name="subCategory"
                  value={"duplex"}
                  checked={props.subCategory === "duplex" ? "checked" : ""}
                  onChange={(e) => {
                    props.setsubCategory(e.target.value);
                  }}
                />
                <label htmlFor="duplex">duplex</label>
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  id="villa"
                  name="subCategory"
                  value={"villa"}
                  checked={props.subCategory === "villa" ? "checked" : ""}
                  onChange={(e) => {
                    props.setsubCategory(e.target.value);
                  }}
                />
                <label htmlFor="villa">villa</label>
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  id="cottage"
                  name="subCategory"
                  value={"cottage"}
                  checked={props.subCategory === "cottage" ? "checked" : ""}
                  onChange={(e) => {
                    props.setsubCategory(e.target.value);
                  }}
                />
                <label htmlFor="cottage">cottage</label>
              </div>
            </>
          ) : props.category === "land" ? (
            <>
              <div className="form-group">
                <input
                  type="radio"
                  id="agricultural"
                  name="subCategory"
                  value={"agricultural"}
                  checked={
                    props.subCategory === "agricultural" ? "checked" : ""
                  }
                  onChange={(e) => {
                    props.setsubCategory(e.target.value);
                  }}
                />
                <label htmlFor="agricultural">agricultural</label>
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  id="residential"
                  name="subCategory"
                  value={"residential"}
                  checked={props.subCategory === "residential" ? "checked" : ""}
                  onChange={(e) => {
                    props.setsubCategory(e.target.value);
                  }}
                />
                <label htmlFor="residential">residential</label>
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  id="commercial"
                  name="subCategory"
                  value={"commercial"}
                  checked={props.subCategory === "commercial" ? "checked" : ""}
                  onChange={(e) => {
                    props.setsubCategory(e.target.value);
                  }}
                />
                <label htmlFor="commercial">commercial</label>
              </div>
            </>
          ) : null}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder=""
            id="Location"
            value={props.location}
            onChange={(e) => {
              props.setlocation(e.target.value);
            }}
          />
          <label htmlFor="Location">Location</label>
        </div>
        <div className="form-floating mb-3">
          <h6>Price</h6>
          <div className="">
            <MultiRangeSlider
              min={0}
              max={10000000}
              step={100}
              minValue={props.budgetMin}
              maxValue={props.budgetMax}
              onInput={(e) => {
                props.setbudgetMin(e.minValue);
                props.setbudgetMax(e.maxValue);
              }}
              ruler={false}
            />
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-save"
            onClick={() => {
              props.apiCall();
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}

export default Filter;
