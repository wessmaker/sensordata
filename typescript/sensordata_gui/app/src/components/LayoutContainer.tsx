import React, { useState } from "react";
import { FunctionComponent } from "react";

import MarkerIcon from "../img/markericon.png";
import CloudIcon from "../img/cloudicon.png";
import CloseIcon from "../img/closeicon.png";
import SettingsIcon from "../img/settingsicon.png";
import ImageIcon from "../img/imageicon.png";
import SettingsDialog from "./SettingsDialog.tsx";
import {
  DarkGray,
  LightGray,
  HoverGray,
  Orange,
  HoverOrange,
  FontBlack,
} from "./common/Colors.ts";

function LayoutContainer() {
  const [settingsIconBg, setSettingsIconBg] = useState(LightGray);
  const [cloudIconBg, setCloudIconBg] = useState(LightGray);
  const [markerIconBg, setMarkerIconBg] = useState(LightGray);
  const [selectImageBg, setSelectImageBg] = useState(LightGray);
  const [closeIconBg, setCloseIconBg] = useState(Orange);
  const [imageIconBg, setImageIconBg] = useState(Orange);

  const onSettingsIconClick = () => {
    console.log("SETTINGS BUTTON CLICK!");
    return (
      <dialog
        style={{
          width: 1920,
          height: 1080,
          left: 0,
          top: 0,
          position: "absolute",
          background: DarkGray,
        }}
      ></dialog>
    );
  };

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
        onMouseEnter={() => setMarkerIconBg(HoverGray)}
        onMouseLeave={() => setMarkerIconBg(LightGray)}
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
        onMouseEnter={() => setMarkerIconBg(HoverGray)}
        onMouseLeave={() => setMarkerIconBg(LightGray)}
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
        onMouseEnter={() => setCloudIconBg(HoverGray)}
        onMouseLeave={() => setCloudIconBg(LightGray)}
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
        onMouseEnter={() => setCloudIconBg(HoverGray)}
        onMouseLeave={() => setCloudIconBg(LightGray)}
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
        onMouseEnter={() => setSettingsIconBg(HoverGray)}
        onMouseLeave={() => setSettingsIconBg(LightGray)}
        onClick={onSettingsIconClick}
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
        onMouseEnter={() => setSettingsIconBg(HoverGray)}
        onMouseLeave={() => setSettingsIconBg(LightGray)}
        onClick={onSettingsIconClick}
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
        onMouseEnter={() => setSelectImageBg(HoverGray)}
        onMouseLeave={() => setSelectImageBg(LightGray)}
      />
      <div
        className="SelectImageText"
        style={{
          width: 297,
          height: 80,
          left: 889,
          top: 508,
          position: "absolute",
          textAlign: "center",
          color: FontBlack,
          fontSize: 40,
          fontFamily: "Arial",
          fontWeight: "500",
          wordWrap: "break-word",
        }}
        onMouseEnter={() => setSelectImageBg(HoverGray)}
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
    </div>
  );
}

export default LayoutContainer;
