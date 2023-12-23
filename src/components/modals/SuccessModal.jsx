"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";

function SuccessModal(props) {
  const token = Cookies.get("Taxar");
  const { push } = useRouter();
  useEffect(() => {
    setTimeout(() => {
      if (props.page === "carrer") {
        push("/");
      } else if (token) {
        push("/my-booking");
      } else {
        push("/");
      }
    }, 3000);
  }, []);

  return (
    <Modal show={props.show} onHide={props.handleShow} centered size="lg">
      {/* <Modal.Header>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header> */}

      <Modal.Body className="p-5 text-center">
        <h3>Your Request has been successfully received</h3>
        <p>
          Thanks for Request, Our Admin team will review your Request and Get
          back to you soon.
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default SuccessModal;
