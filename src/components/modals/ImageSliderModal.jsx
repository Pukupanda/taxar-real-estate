"use client";
import React from "react";
import { Modal } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function ImageSliderModal(props) {
  const images = props.images?.map((item) => {
    return {
      original: item?.image?.includes("http")
        ? item?.image
        : "/assets/img/dummyImage.png",
      thumbnail: item?.image?.includes("http")
        ? item?.image
        : "/assets/img/dummyImage.png",
    };
  });
  return (
    <Modal
      show={props.show}
      onHide={props.handleShow}
      centered
      size="xl"
      dialogClassName="modal-100w"
    >
      {/* <Modal.Header closeButton></Modal.Header> */}

      <Modal.Body className="p-0 text-center">
        <div>
          {" "}
          <ImageGallery items={images} showPlayButton={true} />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ImageSliderModal;
