"use client";
import { Modal } from "react-bootstrap";
import Image from "next/image";

function NotificationModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleShow} centered size="lg">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="">
        {props.list?.blogs?.length > 0 ? (
          <>
            <h3>Latest Blog</h3>
            {props.list?.blogs?.map((item, i) => (
              <div className="d-flex align-items-center gap-2" key={i}>
                {item?.image?.includes("http") && (
                  <Image
                    src={item?.image}
                    alt=""
                    width={45}
                    height={45}
                    priority
                    quality={100}
                  />
                )}
                <h5 className="mb-0">{item?.title}</h5>
              </div>
            ))}
          </>
        ) : null}
        {props.list?.careers?.length > 0 ? (
          <>
            <h3>Latest careers</h3>
            {props.list?.careers?.map((item, i) => (
              <div className="d-flex align-items-center gap-2" key={i}>
                {item?.image?.includes("http") && (
                  <Image
                    src={item?.image}
                    alt=""
                    width={45}
                    height={45}
                    priority
                    quality={100}
                  />
                )}
                <h5 className="mb-0">{item?.title}</h5>
              </div>
            ))}
          </>
        ) : null}
        {props.list?.newsEvents?.length > 0 ? (
          <>
            <h3>Latest News & Events</h3>
            {props.list?.newsEvents?.map((item, i) => (
              <div className="d-flex align-items-center gap-2" key={i}>
                {item?.image?.includes("http") && (
                  <Image
                    src={item?.image}
                    alt=""
                    width={45}
                    height={45}
                    priority
                    quality={100}
                  />
                )}
                <h5 className="mb-0">{item?.title}</h5>
              </div>
            ))}
          </>
        ) : null}
        {props.list?.publications?.length > 0 ? (
          <>
            <h3>Latest Publications</h3>
            {props.list?.publications?.map((item, i) => (
              <div className="d-flex align-items-center gap-2" key={i}>
                {item?.image?.includes("http") && (
                  <Image
                    src={item?.image}
                    alt=""
                    width={45}
                    height={45}
                    priority
                    quality={100}
                  />
                )}
                <h5 className="mb-0">{item?.title}</h5>
              </div>
            ))}
          </>
        ) : null}
      </Modal.Body>
    </Modal>
  );
}

export default NotificationModal;
