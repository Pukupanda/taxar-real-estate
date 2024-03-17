"use client";
import { uploadImageApi } from "@/api/apiCall";
import { useDataStore } from "@/api/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { toast } from "react-toastify";

function PaymentModal(props) {
  const [progressBar, setProgressBar] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (progressBar && time < 100) {
      interval = setInterval(() => {
        // if (time < 100)
        setTime((seconds) => (seconds < 99 ? seconds + 1 : seconds));
      }, 10);
    }
    return () => clearInterval(interval);
  }, [progressBar, time]);

  const handleImage = (val) => {
    setTime(100);
    setProgressBar(true);
    uploadImageApi({
      image: val,
      isCloudinary: 1,
    }).then((res) => {
      if (res?.code === 1) {
        // console.log(res?.data?.webpUrl, "res");
        props.formik.setFieldValue(props.inputKey, res?.data?.webpUrl);
        setTime(0);
        setProgressBar(false);
        // toast.success(res.message);
      } else {
        // toast.error(res.message);
        setTime(0);
        setProgressBar(false);
      }
    });
  };
  return (
    <Modal show={props.show} onHide={props.handleShow} centered size="md">
      <Modal.Header>
        <Modal.Title>Booking Payment</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4">
        <p className="text-center">
          As per the company policy, in order to book a property, you need to
          make an initial down payment<b>(रु 1,00,000)</b>. Kindly make the
          payment using below QR code.
        </p>
        <div className="text-center">
          <Image
            src={
              props.BarCode?.includes("http")
                ? props.BarCode
                : "/assets/img/paymentQR.png"
            }
            alt=""
            quality={100}
            fill
            priority
            className="PaymentQRStyle position-static"
          />
        </div>
        <div className="single shadow p-3 mt-2">
          <h6>upload Payment Sceenshot</h6>
          <input
            type="file"
            accept="image/*"
            // name={props.inputKey}
            onChange={(e) => {
              handleImage(e.target.files[0]);
            }}
          />
        </div>
        {time > 0 && progressBar && (
          <Progress type="line" width={100} percent={time} />
        )}
        <div className="mt-4 text-center">
          <Button
            variant="success"
            onClick={() => {
              if (props.imageValue) {
                props.handleShow();
                // props.BookingPayment();
              } else {
                toast.error("Please Upload Payment Screenshot");
              }
            }}
          >
            Book Now
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PaymentModal;
