import React, { useEffect, useState } from "react";

import closeIcon from "../../assets/markercloseicon.png";
import editIcon from "../../assets/markerediticon.png";
import { MarkerEditWindow } from "./MarkerEditWindow.tsx";
import {
  FontBlack,
  HoverLightGray,
  LightGray,
  Orange,
} from "../../utils/Colors.ts";

const Marker = ({ w, visible, value, name, handleMarkerCloseFunction }) => {
  const [editRectangleBg, setEditRectangleBg] = useState(LightGray);
  const [closeRectangleBg, setCloseRectangleBg] = useState(LightGray);
  const [nameText, setNameText] = useState("");
  const [valueText, setValueText] = useState("");
  const [markerEditWindowOpen, setMarkerEditWindowOpen] = useState(false);
  useEffect(() => {
    setValueText(value !== "" ? value : "VALUE_NOT_FOUND");
  }, [value]);

  useEffect(() => {
    setNameText(name !== "" ? name : "NAME_NOT_FOUND");
  }, [name]);

  const openMarkerEditWindow = () => {
    setMarkerEditWindowOpen(!markerEditWindowOpen);
    console.log("OPEN MARKER SETTINGS");
  };

  if (!visible) return null;
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div
        className="MarkerContentRectangle"
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
          className="MarkerTextRectangle"
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
          style={{
            width: 202,
            height: 32,
            left: 6,
            top: 39,
            position: "absolute",
            textAlign: "center",
            color: FontBlack,
            fontSize: 20,
            fontFamily: "Arial",
            fontWeight: "500",
            wordWrap: "break-word",
            cursor: "default",
          }}
        >
          {valueText}
        </div>
        <div
          className="NameText"
          style={{
            width: 202,
            height: 33,
            left: 6,
            top: 6,
            position: "absolute",
            textAlign: "center",
            color: FontBlack,
            fontSize: 20,
            fontFamily: "Arial",
            fontWeight: "500",
            wordWrap: "break-word",
            cursor: "default",
          }}
        >
          {nameText}
        </div>
        <div
          className="EditRectangle"
          style={{
            width: 29,
            height: 29,
            left: 214,
            top: 6,
            position: "absolute",
            background: editRectangleBg,
            borderRadius: 10,
          }}
          onMouseEnter={() => setEditRectangleBg(HoverLightGray)}
          onMouseLeave={() => setEditRectangleBg(LightGray)}
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
            onMouseEnter={() => setEditRectangleBg(HoverLightGray)}
            onMouseLeave={() => setEditRectangleBg(LightGray)}
            onClick={() => {
              openMarkerEditWindow();
            }}
          />
        </div>

        <div
          className="CloseRectangle"
          style={{
            width: 29,
            height: 29,
            left: 214,
            top: 41,
            position: "absolute",
            background: closeRectangleBg,
            borderRadius: 10,
          }}
          onMouseEnter={() => setCloseRectangleBg(HoverLightGray)}
          onMouseLeave={() => setCloseRectangleBg(LightGray)}
          onClick={() => {
            handleMarkerCloseFunction();
          }}
        >
          <img
            alt="icon"
            className="CloseIcon"
            style={{
              width: 25,
              height: 25,
              left: 2,
              top: 2,
              position: "absolute",
              borderRadius: 10,
            }}
            src={closeIcon}
            onMouseEnter={() => setCloseRectangleBg(HoverLightGray)}
            onMouseLeave={() => setCloseRectangleBg(LightGray)}
            onClick={() => {
              handleMarkerCloseFunction();
            }}
          />
        </div>
        <MarkerEditWindow open={markerEditWindowOpen}></MarkerEditWindow>
      </div>
    </div>
  );
};

export { Marker };
