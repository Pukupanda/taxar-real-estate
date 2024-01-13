"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

function PaymentModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleShow} centered size="md">
      <Modal.Header>
        <Modal.Title>Booking Payment</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4">
        <p className="text-center">
          As per the company policy, in order to book a property, you need to
          make an initial down payment. Kindly make the payment using below QR
          code.
        </p>
        <div className="position-relative">
          <Image
            src="/assets/img/paymentQR.jpeg"
            alt=""
            quality={100}
            fill
            priority
            className="w-100 h-auto position-static"
          />
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={props.handleShow}>
          Cancel
        </Button>
        {props.modalName === "delete modal" ? (
          <Button
            variant="danger"
            onClick={() => {
              props.confirmDelete({ [props.keyName]: props.itemId });
              props.handleShow();
            }}
          >
            Delete
          </Button>
        ) : (
          <Button
            variant="success"
            onClick={() => {
              props.UpdateStatus({
                [props.keyName]: props.itemId,
                // [props.keyisActive]: props.isActive,
              });
              props.handleShow();
            }}
          >
            {props.isActive === "0"
              ? "Inactive"
              : props.isActive === "1"
              ? "Active"
              : ""}
          </Button>
        )}
      </Modal.Footer> */}
    </Modal>
  );
}

export default PaymentModal;
