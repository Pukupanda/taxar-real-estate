"use client";
import React, { useState } from "react";
import "./style.css";
import MultiRangeSlider from "multi-range-slider-react";

function Filter() {
  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(2565575);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };
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
          />
          <label for="SearchCity">Search City, Locality, Project</label>
        </div>
        <div className="mb-3">
          <div className="radio-buttons">
            <div className="form-group">
              <input type="radio" id="Rent" name="type" />
              <label for="Rent">Rent</label>
            </div>
            <div className="form-group">
              <input type="radio" id="Buy" name="type" />
              <label for="Buy">Buy</label>
            </div>
          </div>
        </div>
        <h6>CATEGORIES</h6>
        <div className="radio-buttons mb-3">
          <div className="form-group">
            <input type="radio" id="land" name="cate" />
            <label for="land">land</label>
          </div>
          <div className="form-group">
            <input type="radio" id="flats" name="cate" />
            <label for="flats">flats</label>
          </div>
          <div className="form-group">
            <input type="radio" id="office" name="cate" />
            <label for="office">office</label>
          </div>
          <div className="form-group">
            <input type="radio" id="shop" name="cate" />
            <label for="shop">shop</label>
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder=""
            id="Location"
          />
          <label for="Location">Location</label>
        </div>
        <h6>PROPERTY TYPE</h6>
        <div className="radio-buttons mb-3">
          <div className="form-group">
            <input type="radio" id="2 BHK" name="prortyType" />
            <label for="2 BHK">2 BHK</label>
          </div>
          <div className="form-group">
            <input type="radio" id="bunglow" name="prortyType" />
            <label for="bunglow">bunglow</label>
          </div>
          <div className="form-group">
            <input type="radio" id="mansion" name="prortyType" />
            <label for="mansion">mansion</label>
          </div>
          <div className="form-group">
            <input type="radio" id="villa" name="prortyType" />
            <label for="villa">villa</label>
          </div>
        </div>
        <div className="form-floating mb-3">
          <h6>Price</h6>
          <div className="">
            <MultiRangeSlider
              min={0}
              max={10000000}
              step={100}
              minValue={minValue}
              maxValue={maxValue}
              onInput={(e) => {
                handleInput(e);
              }}
              ruler={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
