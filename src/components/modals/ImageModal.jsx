"use client";
import Image from "next/image";
import React from "react";
import { Modal } from "react-bootstrap";

function ImageModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleShow} centered size="lg">
      {/* <Modal.Header>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header> */}

      <Modal.Body className="p-5 text-center">
        <Image
          src={props.img}
          alt=""
          fill
          quality={100}
          priority
          className="position-static"
        />
      </Modal.Body>
    </Modal>
  );
}

export default ImageModal;
