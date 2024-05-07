"use client";
import Image from "next/image";
import "./inputStyle.css";
import { toast } from "react-toastify";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { useEffect, useState } from "react";
import { uploadImageApi } from "@/api/apiCall";

function ImageUploadInput(props) {
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
  // console.log(props.inputKey, "props.inputKey");
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
        toast.error(res.message);
        setTime(0);
        setProgressBar(false);
      }
    });
  };

  return (
    <>
      <div className={props.mainClass}>
        <span className="btn">
          <Image
            src={
              props.imageURL?.includes("http")
                ? props.imageURL
                : `/assets/img/${props.defaultImg}`
            }
            alt=""
            fill={true}
          />
        </span>
        <div
          className={
            props.showText === "yes" ? "textColor text-center" : "d-none"
          }
        >
          <h6 className="mb-0">{props.Text}</h6>
        </div>
        <input
          type="file"
          accept="image/*"
          name={props.inputKey}
          onChange={(e) => {
            // console.log(e.target.files[0]);
            handleImage(e.target.files[0]);
          }}
        />
      </div>
      {time > 0 && progressBar && (
        <Progress type="line" width={100} percent={time} />
      )}
    </>
  );
}

export default ImageUploadInput;
