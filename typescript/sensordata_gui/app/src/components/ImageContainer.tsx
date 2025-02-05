import React, { useState } from "react";
import closeIcon from "../assets/closeicon.png";
import { getImageSize, useImageSize } from "react-image-size";
import {
  FontBlack,
  HoverLightGray,
  HoverOrange,
  LightGray,
  Orange,
} from "../utils/Colors.ts";

const ImageContainer = () => {
  const onSelectImageClick = () => {};
  const [selectImageBg, setSelectImageBg] = useState(LightGray);
  const [imageSrc, setImageSrc] = useState("");
  const [image, setImage] = useState(new Image());
  const onCloseButtonMouseEnter = () => {
    setCloseButtonProps({
      width: 80,
      height: 80,
      top: 0,
      right: 0,
      borderRadius: "0px 20px 0px 20px",
      background: HoverOrange,
      showIcon: true,
    });
  };
  const onCloseButtonMouseLeave = () => {
    setCloseButtonProps(initialCloseButtonProps);
  };

  const initialCloseButtonProps = {
    width: 40,
    height: 40,
    top: 0,
    right: 0,
    borderRadius: "0px 20px 0px 20px",
    background: Orange,
    showIcon: false,
  };

  const [closeButtonProps, setCloseButtonProps] = useState(
    initialCloseButtonProps
  );

  const imageContainerProps = {
    width: 1600,
    height: 1000,
    x: 15,
    y: 15,
    position: "absolute",
    borderRadius: 20,
  };
  const initialImageProps = {
    width: 50,
    height: 50,
    top: 50,
    left: 50,
    borderRadius: 20,
  };
  const [imageProps, setImageProps] = useState(initialImageProps);
  const onCloseButtonClick = () => {
    setImageSrc("");
    setCloseButtonProps(initialCloseButtonProps);
  };

  const onImageInput = (e) => {
    const src = URL.createObjectURL(e.target.files[0]);
    setImageSrc(src);
    let img = new Image();
    img.src = src;
    setImage(img);
  };

  const onImageLoad = () => {
    if (image) {
      image.src = imageSrc;
      let scaledHeight = 0;
      let scaledWidth = 0;
      if (image.height > image.width) {
        scaledHeight = imageContainerProps.height;
        scaledWidth = (scaledHeight * image.width) / image.height;
      } else if (image.height < image.width) {
        scaledWidth = imageContainerProps.width;
        scaledHeight = (scaledWidth * image.height) / image.width;
      } else {
        scaledHeight = imageContainerProps.height;
        scaledWidth = imageContainerProps.width;
      }
      let newProps = {
        width: scaledWidth,
        height: scaledHeight,
        top:
          Math.floor(imageContainerProps.height / 2 - scaledHeight / 2) +
          imageContainerProps.y,
        left:
          Math.floor(imageContainerProps.width / 2 - scaledWidth / 2) +
          imageContainerProps.x,
        borderRadius: 20,
      };
      setImageProps(newProps);
    }
  };

  if (imageSrc) {
    return (
      <>
        <img
          src={imageSrc}
          alt="img"
          style={{
            width: imageProps.width,
            height: imageProps.height,
            left: imageProps.left,
            top: imageProps.top,
            justifyContent: "center",
            position: "absolute",
            borderRadius: imageProps.borderRadius,
          }}
          onLoad={onImageLoad}
        />
        <div
          className="CloseButton"
          style={{
            width: closeButtonProps.width,
            height: closeButtonProps.height,
            right: closeButtonProps.right,
            top: closeButtonProps.top,
            position: "absolute",
            background: closeButtonProps.background,
            borderRadius: closeButtonProps.borderRadius,
          }}
          onMouseEnter={onCloseButtonMouseEnter}
          onMouseLeave={onCloseButtonMouseLeave}
          onClick={onCloseButtonClick}
        >
          <img
            alt="icon"
            className="CloseButtonIcon"
            hidden={!closeButtonProps.showIcon}
            style={{
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
              position: "absolute",
              borderRadius: 20,
            }}
            src={closeIcon}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className="ImageContainer"
        style={{
          width: imageContainerProps.width,
          height: imageContainerProps.height,
          left: imageContainerProps.x,
          top: imageContainerProps.y,
          position: "absolute",
          background: Orange,
          borderRadius: imageContainerProps.borderRadius,
        }}
      >
        <div
          className="SelectButtonContainer"
          style={{
            width: 297,
            height: 135,
            left: 600,
            top: 450,
            position: "absolute",
            background: selectImageBg,
            borderRadius: 20,
          }}
          onMouseEnter={() => setSelectImageBg(HoverLightGray)}
          onMouseLeave={() => setSelectImageBg(LightGray)}
          onClick={onSelectImageClick}
        >
          <div
            className="SelectButtonText"
            style={{
              width: "100%",
              height: 10,
              left: 0,
              top: 41,
              position: "absolute",
              textAlign: "center",
              color: FontBlack,
              fontSize: 40,
              fontFamily: "Arial",
              fontWeight: "500",
              wordWrap: "break-word",
              cursor: "default",
              borderRadius: 20,
            }}
          >
            Select image
          </div>

          <input
            type="file"
            accept="image/png, image/jpg"
            style={{
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              borderRadius: 20,
              opacity: 0, //Hack that makes input hidden but clickable
            }}
            onChange={onImageInput}
          ></input>
        </div>
      </div>
    </>
  );
};

export { ImageContainer };
