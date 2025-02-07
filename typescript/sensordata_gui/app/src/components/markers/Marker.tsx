import React, { useEffect, useState } from "react";

import placeMarkerIcon from "../../assets/placemarkericon.png";
import editIcon from "../../assets/markerediticon.png";
import { MarkerEditWindow } from "./MarkerEditWindow.tsx";
import {
  FontBlack,
  HoverLightGray,
  LightGray,
  Orange,
} from "../../utils/Colors.ts";
import { getTopicDetailWithPath } from "../../services/MQTT.ts";

const Marker = ({ w, visible, value, name, handlePlaceMarker }) => {
  const [editContainerBg, setEditContainerBg] = useState(LightGray);
  const [placeMarkerContainerBg, setPlaceMarkerContainerBg] =
    useState(LightGray);
  const [nameText, setNameText] = useState("");
  const [valueText, setValueText] = useState("");
  // const topicDetails: TopicDetails | null =
  //   getTopicDetailWithPath(targetTopicPath);

  const [markerEditWindowOpen, setMarkerEditWindowOpen] = useState(false);
  useEffect(() => {
    setValueText(value !== "" ? value : "VALUE_NOT_FOUND");
  }, [value]);

  useEffect(() => {
    setNameText(name !== "" ? name : "NAME_NOT_FOUND");
  }, [name]);

  const openMarkerEditWindow = () => {
    setMarkerEditWindowOpen(!markerEditWindowOpen);
  };

  if (!visible) return null;
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div
        className="MarkerContentContainer"
        style={{
          width: w,
          height: 76,
          left: 0,
          top: 0,
          position: "absolute",
          background: Orange,
          borderRadius: 10,
        }}
      >
        <div
          className="MarkerTextContainer"
          style={{
            width: 201,
            height: 64,
            left: 7,
            top: 6,
            position: "absolute",
            background: LightGray,
            borderRadius: 10,
          }}
        />

        <div
          className="NameText"
          style={{
            width: 202,
            height: 33,
            left: 6,
            top: 8,
            position: "absolute",
            textAlign: "center",
            color: FontBlack,
            fontSize: 20,
            fontFamily: "Arial",
            cursor: "default",
          }}
        >
          {nameText}
        </div>
        <div
          style={{
            width: 202,
            height: 32,
            left: 6,
            top: 37,
            position: "absolute",
            textAlign: "center",
            color: FontBlack,
            fontSize: 20,
            fontFamily: "Arial",
            cursor: "default",
          }}
        >
          {valueText}
        </div>
        <div
          className="EditContainer"
          style={{
            width: 29,
            height: 29,
            left: 214,
            top: 6,
            position: "absolute",
            background: editContainerBg,
            borderRadius: 10,
          }}
          onMouseEnter={() => setEditContainerBg(HoverLightGray)}
          onMouseLeave={() => setEditContainerBg(LightGray)}
          onClick={() => {
            openMarkerEditWindow();
          }}
        >
          <img
            alt="icon"
            className="EditIcon"
            style={{
              width: 25,
              height: 25,
              left: 2,
              top: 1,
              position: "absolute",
              borderRadius: 10,
            }}
            src={editIcon}
            onMouseEnter={() => setEditContainerBg(HoverLightGray)}
            onMouseLeave={() => setEditContainerBg(LightGray)}
            onClick={() => {
              openMarkerEditWindow();
            }}
          />
        </div>

        <div
          className="PlaceMarkerContainer"
          style={{
            width: 29,
            height: 29,
            left: 214,
            top: 41,
            position: "absolute",
            background: placeMarkerContainerBg,
            borderRadius: 10,
          }}
          onMouseEnter={() => setPlaceMarkerContainerBg(HoverLightGray)}
          onMouseLeave={() => setPlaceMarkerContainerBg(LightGray)}
          onClick={() => {
            handlePlaceMarker();
          }}
        >
          <img
            alt="icon"
            className="PlaceMarkerIcon"
            style={{
              width: 25,
              height: 25,
              left: 2,
              top: 2,
              position: "absolute",
              borderRadius: 10,
            }}
            src={placeMarkerIcon}
            onMouseEnter={() => setPlaceMarkerContainerBg(HoverLightGray)}
            onMouseLeave={() => setPlaceMarkerContainerBg(LightGray)}
            onClick={() => {
              handlePlaceMarker();
            }}
          />
        </div>
        <MarkerEditWindow open={markerEditWindowOpen}></MarkerEditWindow>
      </div>
    </div>
  );
};

export { Marker };
