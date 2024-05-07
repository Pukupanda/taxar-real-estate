"use client";
import React, { useState } from "react";
import Pagination from "react-js-pagination";
import "./style.css";

function Paginations({ handlePage, page, total, limit }) {
  const [counter, setCounter] = useState(page);

  const onChangeHandler = (value) => {
    setCounter(value);
    handlePage(value);
  };
  //console.log(total)
  return (
    <>
      <div className="d-flex justify-content-center mt-4">
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          itemsCountPerPage={limit || 10}
          activePage={Number(counter)}
          totalItemsCount={Number(total)}
          pageRangeDisplayed={5}
          onChange={onChangeHandler}
        />
      </div>
    </>
  );
}

export default Paginations;
