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

function LayoutContainer() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [settingsIconBg, setSettingsIconBg] = useState(LightGray);
  const [cloudIconBg, setCloudIconBg] = useState(LightGray);
  const [markerIconBg, setMarkerIconBg] = useState(LightGray);
  const [selectImageBg, setSelectImageBg] = useState(LightGray);
  const [closeIconBg, setCloseIconBg] = useState(Orange);
  const [imageIconBg, setImageIconBg] = useState(Orange);

  const openSettingsDialog = () => {
    setSettingsOpen(true);
  };

  const closeSettingsDialog = () => {
    setSettingsOpen(false);
  };

  const onCloudIconClick = () => {};
  const onMarkerIconClick = () => {};
  const onSelectImageClick = () => {};
  const closeIconClick = () => {};
  const imageIconClick = () => {};
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: DarkGray,
      }}
    >
      <div
        className="Background"
        style={{
          width: 1920,
          height: 1080,
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
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: 20,
        }}
      />
      <div
        className="LeftPanel"
        style={{
          width: 260,
          height: 1080,
          left: 0,
          top: 0,
          position: "absolute",
          background: DarkGray,
        }}
      />
      <div
        className="LeftPanelIconContainer"
        style={{
          width: 260,
          height: 100,
          left: 0,
          top: 38,
          position: "absolute",
          background: Orange,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />
      <div
        className="MarkerIconContainer"
        style={{
          width: 60,
          height: 60,
          left: 180,
          top: 58,
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
          top: 58,
          position: "absolute",
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
          top: 60,
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
          width: 46,
          height: 46,
          left: 107,
          top: 65,
          position: "absolute",
        }}
        src={CloudIcon}
        onMouseEnter={() => setCloudIconBg(HoverLightGray)}
        onMouseLeave={() => setCloudIconBg(LightGray)}
        onClick={onCloudIconClick}
      />
      <div
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
        className="CloseIcon"
        style={{
          width: 96,
          height: 96,
          left: 1792,
          top: 38,
          position: "absolute",
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
      />
      <img
        className="ImageIcon"
        style={{
          width: 86,
          height: 86,
          left: 1797,
          top: 947,
          position: "absolute",
        }}
        src={ImageIcon}
        onMouseEnter={() => setImageIconBg(HoverOrange)}
        onMouseLeave={() => setImageIconBg(Orange)}
        onClick={imageIconClick}
      />
      <div
        className="SettingsIconContainer"
        style={{
          width: 56,
          height: 56,
          left: 22,
          top: 60,
          position: "absolute",
          background: settingsIconBg,
          borderRadius: 10,
        }}
        onMouseEnter={() => setSettingsIconBg(HoverLightGray)}
        onMouseLeave={() => setSettingsIconBg(LightGray)}
        onClick={openSettingsDialog}
      />
      <img
        className="SettingsIcon"
        style={{
          width: 58,
          height: 58,
          left: 21,
          top: 59,
          position: "absolute",
        }}
        src={SettingsIcon}
        onMouseEnter={() => setSettingsIconBg(HoverLightGray)}
        onMouseLeave={() => setSettingsIconBg(LightGray)}
        onClick={openSettingsDialog}
      />
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
      />
      <div
        className="SelectImageText"
        style={{
          width: 297,
          height: 80,
          left: 889,
          top: 513,
          position: "absolute",
          textAlign: "center",
          color: FontBlack,
          fontSize: 40,
          fontFamily: "Arial",
          fontWeight: "500",
          wordWrap: "break-word",
        }}
        onMouseEnter={() => setSelectImageBg(HoverLightGray)}
        onMouseLeave={() => setSelectImageBg(LightGray)}
      >
        Select image
      </div>
      <div
        className="VersionContainer"
        style={{
          width: 260,
          height: 70,
          left: 0,
          top: 1010,
          position: "absolute",
          background: "#FF6200",
          borderTopLeftRadius: 20,
        }}
      />
      <div
        className="VersionText"
        style={{
          width: 260,
          height: 27,
          left: 0,
          top: 1031,
          position: "absolute",
          textAlign: "center",
          color: FontBlack,
          fontSize: 20,
          fontFamily: "Arial",
          fontWeight: "500",
          wordWrap: "break-word",
        }}
      >
        Version UNKNOWN
      </div>
      <SettingsDialog
        isOpen={settingsOpen}
        onCloseButtonClick={closeSettingsDialog}
      ></SettingsDialog>
    </div>
  );
}

export default LayoutContainer;
