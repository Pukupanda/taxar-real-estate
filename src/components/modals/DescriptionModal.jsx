import Image from "next/image";
import React from "react";
import { Modal } from "react-bootstrap";

function DescriptionModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleShow} centered size="lg">
      {/* <Modal.Header>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header> */}

      <Modal.Body className="p-5">
        <div className="d-grid text-center gap-3">
          <Image
            src={
              props.data?.profilePicture?.includes("http")
                ? props.data?.profilePicture
                : "/assets/img/dummyImage.png"
            }
            alt=""
            quality={100}
            priority
            width={100}
            height={100}
            className="rounded-circle ob-cover m-auto"
          />
          <div>
            <h5 className="text-capitalize">{props.data?.fullName}</h5>
            <h6>
              <i>{props.data?.designation}</i>
            </h6>
          </div>
        </div>
        <div
          className="text-center"
          dangerouslySetInnerHTML={{
            __html: props.data?.message
              ? props.data?.message
              : props.data?.description,
          }}
        ></div>
      </Modal.Body>
    </Modal>
  );
}

export default DescriptionModal;
