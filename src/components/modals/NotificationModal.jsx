"use client";
import { Modal } from "react-bootstrap";

function NotificationModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleShow} centered size="md">
      <Modal.Body className="">
        {props.list?.blogs?.length > 0 ? (
          <>
            <h3>Latest Blog</h3>
            {props.list?.blogs?.map((item, i) => (
              <h5 key={i}>{item?.title}</h5>
            ))}
          </>
        ) : null}
        {props.list?.careers?.length > 0 ? (
          <>
            <h3>Latest careers</h3>
            {props.list?.careers?.map((item, i) => (
              <h5 key={i}>{item?.title}</h5>
            ))}
          </>
        ) : null}
        {props.list?.newsEvents?.length > 0 ? (
          <>
            <h3>Latest News & Events</h3>
            {props.list?.newsEvents?.map((item, i) => (
              <h5 key={i}>{item?.title}</h5>
            ))}
          </>
        ) : null}
        {props.list?.publications?.length > 0 ? (
          <>
            <h3>Latest Publications</h3>
            {props.list?.publications?.map((item, i) => (
              <h5 key={i}>{item?.title}</h5>
            ))}
          </>
        ) : null}
      </Modal.Body>
    </Modal>
  );
}

export default NotificationModal;
