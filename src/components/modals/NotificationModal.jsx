"use client";
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDataStore } from "../../api/store/store";

function NotificationModal(props) {
  const list = useDataStore((store) => store.priorityMessage);
  const { fetchpriorityMessage } = useDataStore();

  useEffect(() => {
    fetchpriorityMessage();
  }, []);
  return (
    <Modal show={props.show} onHide={props.handleShow} centered size="lg">
      <Modal.Body className="p-0">
        {list?.blogs?.map((item, i) => (
          <h5 key={i}>{item?.title}</h5>
        ))}
      </Modal.Body>
    </Modal>
  );
}

export default NotificationModal;
