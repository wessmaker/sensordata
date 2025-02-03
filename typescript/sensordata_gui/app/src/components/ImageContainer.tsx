import React, { useState } from "react";
import CloseIcon from "../assets/closeicon.png";
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
  const [selectImageVisible, setSelectImageVisible] = useState(true);
  const [closeButtonVisible, setCloseButtonVisible] = useState(false);

  const [image, setImage] = useState();
  const onCloseButtonClick = () => {
    setImage(undefined);
    setCloseButtonBg(Orange);
  };
  const [closeButtonBg, setCloseButtonBg] = useState(Orange);

  let imageProps = {
    width: 50,
    height: 50,
    top: 50,
    left: 50,
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    const newImage = URL.createObjectURL(e.target.files[0]);
    setImage(newImage);
  };

  const onImageLoad = (e) => {
    console.log(e);

    // let scaledHeight = 0;
    // let scaledWidth = 0;
    // if (img.height > img.width) {
    //   scaledHeight = imageContainerProps.height;
    //   scaledWidth = (img.height * img.width) / scaledHeight;
    // } else if (img.height <= img.width) {
    //   scaledWidth = imageContainerProps.width;
    //   scaledHeight = (img.height * img.width) / scaledWidth;
    // }
    // imageProps = {
    //   width: scaledWidth,
    //   height: scaledHeight,
    //   top: imageContainerProps.height / 2 - scaledHeight / 2,
    //   left: imageContainerProps.width / 2 - scaledWidth / 2,
    // };
    // console.log(imageProps);
    // setImage(newImage); //Error squiqles don't matter
  };

  const imageContainerProps = {
    width: 1500,
    height: 1000,
    x: 12,
    y: 23,
    position: "absolute",
    borderRadius: 20,
  };

  if (image) {
    return (
      <>
        <div
          className="CloseButton"
          style={{
            width: 96,
            height: 96,
            right: imageContainerProps.y / 2,
            top: imageContainerProps.y,
            position: "absolute",
            background: closeButtonBg,
            borderRadius: 20,
          }}
          onMouseEnter={() => setCloseButtonBg(HoverOrange)}
          onMouseLeave={() => setCloseButtonBg(Orange)}
          onClick={onCloseButtonClick}
        >
          <img
            alt="icon"
            className="CloseButtonIcon"
            style={{
              width: 96,
              height: 96,
              left: 0,
              top: 0,
              position: "absolute",
              borderRadius: 20,
            }}
            src={CloseIcon}
            onMouseEnter={() => setCloseButtonBg(HoverOrange)}
            onMouseLeave={() => setCloseButtonBg(Orange)}
            onClick={onCloseButtonClick}
          />
        </div>
        <img
          src={image}
          alt="img"
          style={{
            width: imageProps.width,
            height: imageProps.height,
            left: imageProps.left,
            top: imageProps.top,
            justifyContent: "center",
            position: "absolute",
            borderRadius: 200,
            objectFit: "contain",

            // background: "red",
          }}
          onLoad={onImageLoad}
        />
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
          hidden={!selectImageVisible}
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
            onChange={(e) => handleImageChange(e)}
          ></input>
        </div>
      </div>
    </>
  );
};

export { ImageContainer };
