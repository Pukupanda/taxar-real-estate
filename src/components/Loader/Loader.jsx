"use client";
import React from "react";
import { Bars } from "react-loader-spinner";

function Loader(props) {
  return (
    <>
      <Bars
        height="30"
        width="80"
        color={props.color ? props.color : "#e0ae3a"}
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass="justify-content-center"
        visible={true}
      />
    </>
  );
}

export default Loader;
