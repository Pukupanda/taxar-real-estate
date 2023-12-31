"use client";
import React, { useState } from "react";
import "./style.css";
import MultiRangeSlider from "multi-range-slider-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { category, propertyFor, subCategory } from "@/Utils";

function Filter(props) {
  return (
    <>
      <div className="bg-white shadow rounded p-3 prertyFilter mb-4">
        <div className="d-flex justify-content-between gap-2 mb-2">
          <h6>FILTER YOUR SEARCH</h6>
          <span
            onClick={() => {
              props.setcity("");
              props.setpropertyFor("");
              props.setcategory("");
              props.setbudgetMax("");
              props.setbudgetMin("");
              props.setlocation("");
              props.setsubCategory("");
              props.ResetApi();
            }}
            role="button"
            className="themeOrg"
          >
            Reset
          </span>
        </div>
        <div className="form-floating mb-2">
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
            {propertyFor?.map((item, i) => (
              <div className="form-group" key={i}>
                <input
                  type="radio"
                  id={item?.value}
                  name="propertyFor"
                  value={item?.value}
                  checked={props.propertyFor === item?.value ? "checked" : ""}
                  onChange={(e) => {
                    props.setpropertyFor(e.target.value);
                  }}
                />
                <label htmlFor={item?.value}>{item?.name}</label>
              </div>
            ))}
          </div>
        </div>
        <h6>CATEGORIES</h6>
        <div className="radio-buttons mb-2">
          {category?.map((item, i) => (
            <div className="form-group" key={i}>
              <input
                type="radio"
                id={item?.value}
                name="category"
                value={item?.value}
                checked={props.category === item?.value ? "checked" : ""}
                onChange={(e) => {
                  props.setcategory(e.target.value);
                }}
              />
              <label htmlFor={item?.value}>{item?.name}</label>
            </div>
          ))}
        </div>

        {props.category !== "" && <h6>SUBCATEGORY</h6>}
        <div className="radio-buttons mb-2">
          {subCategory
            ?.filter((it) => it?.category === props.category)
            ?.map((item, i) => (
              <div className="form-group" key={i}>
                <input
                  type="radio"
                  id={item?.value}
                  name="subCategory"
                  value={item?.value}
                  checked={props.subCategory === item?.value ? "checked" : ""}
                  onChange={(e) => {
                    props.setsubCategory(e.target.value);
                  }}
                />
                <label htmlFor={item?.value}>{item?.name}</label>
              </div>
            ))}
        </div>
        <div className="form-floating mb-2">
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
        <div className="form-floating mb-2">
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
