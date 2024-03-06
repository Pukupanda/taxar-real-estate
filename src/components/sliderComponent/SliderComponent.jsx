"use client";
import React from "react";
import Slider from "react-slick";

function SliderComponent(props) {
  return (
    <>
      <Slider {...props.setting} className={props.className && props.className}>
        {props.children}
      </Slider>
    </>
  );
}

export default SliderComponent;
