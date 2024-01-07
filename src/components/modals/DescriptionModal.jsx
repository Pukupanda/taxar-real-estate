import React from "react";
import { Modal } from "react-bootstrap";

function DescriptionModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleShow} centered size="lg">
      {/* <Modal.Header>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header> */}

      <Modal.Body className="p-5">
        <div>{props.data}</div>
      </Modal.Body>
    </Modal>
  );
}

export default DescriptionModal;
