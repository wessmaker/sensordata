import React from "react";
import { DarkGray, LightGray } from "../../utils/Colors.ts";

const MarkerEditWindow = ({ open }) => {
  if (!open) return null;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 750,
        top: 400,
      }}
    >
      <div
        className="Background"
        style={{
          width: 544,
          height: 267,
          left: 0,
          top: 0,
          position: "absolute",
          background: DarkGray,
          borderRadius: 10,
          boxShadow: "0 0 5px black",
        }}
      />
      <div
        className="EditWindowContainer"
        style={{
          width: 538,
          height: 261,
          left: 3,
          top: 3,
          position: "absolute",
          background: LightGray,
          borderRadius: 10,
        }}
      />
    </div>
  );
};

export { MarkerEditWindow };
