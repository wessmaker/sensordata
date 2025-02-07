import React, { useState } from "react";

import MarkerIcon from "../assets/markericon.png";
import CloudIcon from "../assets/cloudicon.png";
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
import { disconnectBroker, getTopicDetailList } from "../services/MQTT.ts";
import { ImageContainer } from "./ImageContainer.tsx";

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
  const [imageIconBg, setImageIconBg] = useState(Orange);
  const [markerListOpen, setMarkerListOpen] = useState(false);
  const [refreshButtonVisible, setRefreshButtonVisible] = useState(false);

  const onRefreshButtonClick = () => {
    setMarkerListOpen(false);
    refreshTopics();
    setTimeout(() => {
      setMarkerListOpen(true);
    }, 1500);
  };
  const onSettingsIconClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  const closeSettingsDialog = () => {
    setSettingsOpen(false);
  };

  const onMarkerIconClick = () => {
    refreshTopics();
    let isOpen: boolean = !markerListOpen;
    setMarkerListOpen(isOpen);
    setRefreshButtonVisible(isOpen);
  };

  const onCloudButtonClick = () => {
    disconnectBroker();
  };

  const onImageButtonClick = () => {};

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
          height: 1030,
          left: 275,
          top: 15,
          position: "absolute",
          background: LightGray,
          borderRadius: 20,
        }}
      >
        <ImageContainer></ImageContainer>
      </div>
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
          onClick={onCloudButtonClick}
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
        className="ImageIconContainer"
        hidden={true}
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
        onClick={onImageButtonClick}
      >
        hidden={true}
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
        visible={refreshButtonVisible}
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
