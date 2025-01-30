import React, { useState } from "react";

import MarkerIcon from "../assets/markericon.png";
import CloudIcon from "../assets/cloudicon.png";
import CloseIcon from "../assets/closeicon.png";
import SettingsIcon from "../assets/settingsicon.png";
import ImageIcon from "../assets/imageicon.png";
import SettingsDialog from "./SettingsDialog.tsx";
import {
  DarkGray,
  LightGray,
  HoverLightGray,
  Orange,
  HoverOrange,
  FontBlack,
} from "../utils/Colors.ts";
import { MarkerList } from "./MarkerList.tsx";

function LayoutContainer() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [settingsIconBg, setSettingsIconBg] = useState(LightGray);
  const [cloudIconBg, setCloudIconBg] = useState(LightGray);
  const [markerIconBg, setMarkerIconBg] = useState(LightGray);
  const [selectImageBg, setSelectImageBg] = useState(LightGray);
  const [closeIconBg, setCloseIconBg] = useState(Orange);
  const [imageIconBg, setImageIconBg] = useState(Orange);
  const [closeButtonVisible, setCloseButtonVisible] = useState(false);
  const [markerListOpen, setMarkerListOpen] = useState(true);

  const onSettingsIconClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  const closeSettingsDialog = () => {
    setSettingsOpen(false);
  };

  const onMarkerIconClick = () => {
    setMarkerListOpen(!markerListOpen);
  };
  const closeMarkerList = () => {
    setMarkerListOpen(false);
  };

  const onCloudIconClick = () => {};

  const onSelectImageClick = () => {
    setCloseButtonVisible(!closeButtonVisible);
  };
  const closeIconClick = () => {};
  const imageIconClick = () => {};
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        position: "absolute",
        background: DarkGray,
      }}
    >
      <div
        className="Background"
        style={{
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          position: "absolute",
          background: DarkGray,
        }}
      />
      <div
        className="ImageContainerContainer"
        style={{
          width: 1630,
          height: 1050,
          left: 275,
          top: 15,
          position: "absolute",
          background: LightGray,
          borderRadius: 20,
        }}
      />
      <div
        className="ImageContainer"
        style={{
          width: 1475,
          height: 1000,
          left: 301,
          top: 38,
          position: "absolute",
          background: Orange,
          borderRadius: 20,
        }}
      />
      <div
        className="LeftPanel"
        style={{
          width: 260,
          height: 1000,
          left: 0,
          top: 0,
          position: "absolute",
          background: DarkGray,
        }}
      >
        <MarkerList
          x={15}
          y={167}
          w={242}
          h={840}
          isOpen={markerListOpen}
          onCloseButtonClick={closeMarkerList}
        ></MarkerList>
      </div>
      <div
        className="LeftPanelIconContainer"
        style={{
          width: 260,
          height: 100,
          left: 0,
          top: 50,
          position: "absolute",
          background: Orange,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <div
          className="MarkerIconContainer"
          style={{
            width: 60,
            height: 60,
            left: 180,
            top: 23,
            position: "absolute",
            background: markerIconBg,
            borderRadius: 10,
          }}
          onMouseEnter={() => setMarkerIconBg(HoverLightGray)}
          onMouseLeave={() => setMarkerIconBg(LightGray)}
          onClick={onMarkerIconClick}
        />
        <img
          className="MarkerIcon"
          style={{
            width: 60,
            height: 60,
            left: 180,
            top: 24,
            position: "absolute",
            borderRadius: 10,
          }}
          src={MarkerIcon}
          onMouseEnter={() => setMarkerIconBg(HoverLightGray)}
          onMouseLeave={() => setMarkerIconBg(LightGray)}
          onClick={onMarkerIconClick}
        />
        <div
          className="CloudIconContainer"
          style={{
            width: 56,
            height: 56,
            left: 102,
            top: 23,
            position: "absolute",
            background: cloudIconBg,
            borderRadius: 10,
          }}
          onMouseEnter={() => setCloudIconBg(HoverLightGray)}
          onMouseLeave={() => setCloudIconBg(LightGray)}
          onClick={onCloudIconClick}
        />
        <img
          className="CloudIcon"
          style={{
            width: 47,
            height: 47,
            left: 107,
            top: 28,
            position: "absolute",
            borderRadius: 10,
          }}
          src={CloudIcon}
          onMouseEnter={() => setCloudIconBg(HoverLightGray)}
          onMouseLeave={() => setCloudIconBg(LightGray)}
          onClick={onCloudIconClick}
        />
        <div
          className="SettingsIconContainer"
          style={{
            width: 56,
            height: 56,
            left: 22,
            top: 23,
            position: "absolute",
            background: settingsIconBg,
            borderRadius: 10,
          }}
          onMouseEnter={() => setSettingsIconBg(HoverLightGray)}
          onMouseLeave={() => setSettingsIconBg(LightGray)}
          onClick={onSettingsIconClick}
        />
        <img
          className="SettingsIcon"
          style={{
            width: 58,
            height: 58,
            left: 21,
            top: 22,
            position: "absolute",
            borderRadius: 10,
          }}
          src={SettingsIcon}
          onMouseEnter={() => setSettingsIconBg(HoverLightGray)}
          onMouseLeave={() => setSettingsIconBg(LightGray)}
          onClick={onSettingsIconClick}
        />
      </div>
      <div
        hidden={!closeButtonVisible}
        className="CloseIconContainer"
        style={{
          width: 96,
          height: 96,
          left: 1792,
          top: 38,
          position: "absolute",
          background: closeIconBg,
          borderRadius: 20,
        }}
        onMouseEnter={() => setCloseIconBg(HoverOrange)}
        onMouseLeave={() => setCloseIconBg(Orange)}
        onClick={closeIconClick}
      />
      <img
        hidden={!closeButtonVisible}
        className="CloseIcon"
        style={{
          width: 96,
          height: 96,
          left: 1792,
          top: 38,
          position: "absolute",
          borderRadius: 20,
        }}
        src={CloseIcon}
        onMouseEnter={() => setCloseIconBg(HoverOrange)}
        onMouseLeave={() => setCloseIconBg(Orange)}
        onClick={closeIconClick}
      />
      <div
        className="ImageIconContainer"
        style={{
          width: 96,
          height: 96,
          left: 1792,
          top: 942,
          position: "absolute",
          background: imageIconBg,
          borderRadius: 20,
        }}
        onMouseEnter={() => setImageIconBg(HoverOrange)}
        onMouseLeave={() => setImageIconBg(Orange)}
        onClick={imageIconClick}
      >
        <img
          className="ImageIcon"
          style={{
            width: "90%",
            height: "90%",
            left: 5,
            top: 6,
            position: "absolute",
            borderRadius: 20,
          }}
          src={ImageIcon}
          onMouseEnter={() => setImageIconBg(HoverOrange)}
          onMouseLeave={() => setImageIconBg(Orange)}
          onClick={imageIconClick}
        />
      </div>
      <div
        className="SelectImageContainer"
        style={{
          width: 297,
          height: 135,
          left: 889,
          top: 472,
          position: "absolute",
          background: selectImageBg,
          borderRadius: 20,
        }}
        onMouseEnter={() => setSelectImageBg(HoverLightGray)}
        onMouseLeave={() => setSelectImageBg(LightGray)}
        onClick={onSelectImageClick}
      >
        <div
          className="SelectImageText"
          style={{
            width: "100%",
            height: "100%",
            left: 0,
            top: 42,
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
          onClick={onSelectImageClick}
          onMouseEnter={() => setSelectImageBg(HoverLightGray)}
          onMouseLeave={() => setSelectImageBg(LightGray)}
        >
          Select image
        </div>
      </div>
      <div
        className="VersionContainer"
        style={{
          width: 260,
          height: 50,
          left: 0,
          top: 1030,
          position: "absolute",
          background: "#FF6200",
          borderTopRightRadius: 20,
        }}
      />
      <div
        className="VersionText"
        style={{
          width: 260,
          height: 25,
          left: 0,
          top: 1040,
          position: "absolute",
          textAlign: "center",
          color: FontBlack,
          fontSize: 25,
          fontFamily: "Arial",
          fontWeight: "500",
          wordWrap: "break-word",
        }}
      >
        {require("../../package.json").version}
      </div>{" "}
      <div
        className="AppNameContainer"
        style={{
          width: 260,
          height: 32,
          left: 0,
          top: 0,
          position: "absolute",
          background: Orange,
          borderBottomRightRadius: 20,
        }}
      >
        <div
          className="AppNameText"
          style={{
            width: 260,
            height: 35,
            left: 0,
            top: 0,
            position: "absolute",
            textAlign: "center",
            color: FontBlack,
            fontSize: 24,
            fontFamily: "Arial",
            wordWrap: "break-word",
          }}
        >
          {require("../../package.json").name}
        </div>
        <SettingsDialog
          isOpen={settingsOpen}
          onCloseButtonClick={closeSettingsDialog}
        ></SettingsDialog>
      </div>
    </div>
  );
}

export default LayoutContainer;
