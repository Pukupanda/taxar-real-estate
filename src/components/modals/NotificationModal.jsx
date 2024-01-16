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
    <Modal show={props.show} onHide={props.handleShow} centered size="md">
      <Modal.Body className="">
        {list?.blogs?.length > 0 ? (
          <>
            <h3>Latest Blog</h3>
            {list?.blogs?.map((item, i) => (
              <h5 key={i}>{item?.title}</h5>
            ))}
          </>
        ) : null}
        {list?.careers?.length > 0 ? (
          <>
            <h3>Latest careers</h3>
            {list?.careers?.map((item, i) => (
              <h5 key={i}>{item?.title}</h5>
            ))}
          </>
        ) : null}
        {list?.newsEvents?.length > 0 ? (
          <>
            <h3>Latest News & Events</h3>
            {list?.newsEvents?.map((item, i) => (
              <h5 key={i}>{item?.title}</h5>
            ))}
          </>
        ) : null}
        {list?.publications?.length > 0 ? (
          <>
            <h3>Latest Publications</h3>
            {list?.publications?.map((item, i) => (
              <h5 key={i}>{item?.title}</h5>
            ))}
          </>
        ) : null}
      </Modal.Body>
    </Modal>
  );
}

export default NotificationModal;
