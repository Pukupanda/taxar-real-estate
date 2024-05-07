"use client";
import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

function Confirmation(props) {
  // console.log(props.keyName, "otem");
  return (
    <Modal show={props.show} onHide={props.handleShow} centered size="lg">
      <Modal.Header>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-5">
        <p>
          Are you sure you want to{" "}
          {props.modalName === "delete modal"
            ? "delete"
            : props.isActive === "0"
            ? "inactive"
            : props.isActive === "1"
            ? "active"
            : ""}{" "}
          this {props.page}?
        </p>
      </Modal.Body>
      <Modal.Footer>
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
      </Modal.Footer>
    </Modal>
  );
}

export default Confirmation;
