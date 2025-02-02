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
import { MarkerList } from "./markers/MarkerList.tsx";
import { Marker } from "./markers/Marker.tsx";
import { RefreshButton } from "./RefreshButton.tsx";
import { refreshTopics } from "../services/RestService.ts";
import { disconnectBroker } from "../services/MQTT.ts";

const leftPanelProps = {
  //Also controls marker width
  width: 250,
  height: 805,
};

function LayoutContainer() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [settingsIconBg, setSettingsIconBg] = useState(LightGray);
  const [cloudIconBg, setCloudIconBg] = useState(LightGray);
  const [markerIconBg, setMarkerIconBg] = useState(LightGray);
  const [selectImageBg, setSelectImageBg] = useState(LightGray);
  const [closeIconBg, setCloseIconBg] = useState(Orange);
  const [imageIconBg, setImageIconBg] = useState(Orange);
  const [closeButtonVisible, setCloseButtonVisible] = useState(false);
  const [markerListOpen, setMarkerListOpen] = useState(false);

  const onRefreshButtonClick = () => {
    refreshTopics();
    setMarkerListOpen(false);
    setTimeout(() => {
      setMarkerListOpen(true);
    }, 1);
  };
  const onSettingsIconClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  const closeSettingsDialog = () => {
    setSettingsOpen(false);
  };

  const onMarkerIconClick = () => {
    if (!markerListOpen) refreshTopics();
    setMarkerListOpen(!markerListOpen);
  };
  const closeMarkerList = () => {
    setMarkerListOpen(false);
  };

  const onCloudIconClick = () => {
    disconnectBroker();
  };

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
        role="button"
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
          width: leftPanelProps.width,
          height: leftPanelProps.height,
          left: 0,
          top: 167,
          position: "absolute",
          background: DarkGray,
        }}
      >
        <MarkerList
          x={10}
          y={0}
          width={leftPanelProps.width}
          height={leftPanelProps.height}
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
        >
          <img
            className="MarkerIcon"
            alt="icon"
            style={{
              width: 60,
              height: 60,
              left: 0,
              top: 0,
              position: "absolute",
              borderRadius: 10,
            }}
            src={MarkerIcon}
            onMouseEnter={() => setMarkerIconBg(HoverLightGray)}
            onMouseLeave={() => setMarkerIconBg(LightGray)}
            onClick={onMarkerIconClick}
          />
        </div>

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
        >
          <img
            className="CloudIcon"
            alt="icon"
            style={{
              width: 47,
              height: 47,
              left: 4,
              top: 4,
              position: "absolute",
              borderRadius: 10,
            }}
            src={CloudIcon}
          />
        </div>

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
        >
          <img
            className="SettingsIcon"
            alt="icon"
            style={{
              width: 58,
              height: 58,
              left: -1,
              top: -1,
              position: "absolute",
              borderRadius: 10,
            }}
            src={SettingsIcon}
            onMouseEnter={() => setSettingsIconBg(HoverLightGray)}
            onMouseLeave={() => setSettingsIconBg(LightGray)}
            onClick={onSettingsIconClick}
          />
        </div>
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
        alt="icon"
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
        onClick={imageIconClick()}
      >
        <img
          alt="icon"
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
      </div>
      <RefreshButton
        visible={markerListOpen}
        onButtonClick={() => {
          onRefreshButtonClick();
        }}
        x={10}
        y={986}
        height={30}
        width={leftPanelProps.width}
      ></RefreshButton>
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
