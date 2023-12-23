import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./style.css";

function ImageSliderWithThumnail(props) {
  const images = props.images?.map((item) => {
    return {
      original: item?.image?.includes("http")
        ? item?.image
        : "/assets/img/dummyImage.png",
      thumbnail: item?.image?.includes("http")
        ? item?.image
        : "/assets/img/dummyImage.png",
    };
  });

  return (
    <>
      <ImageGallery items={images} showPlayButton={false} />
    </>
  );
}

export default ImageSliderWithThumnail;
