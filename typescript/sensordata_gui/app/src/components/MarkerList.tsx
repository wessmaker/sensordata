import React from "react";
import { LightGray, Orange } from "../utils/Colors.ts";

const MarkerList = ({ isOpen, onCloseButtonClick, x, y, w, h }) => {
  if (!isOpen) return null;

  const numbers = [
    "Simo Salminen",
    "Matti Tolvanen",
    "Tami Tamminnen",
    "Antti Raunio",
    "Pertti Pasanen",
  ];
  return (
    <div
      style={{
        width: w,
        height: h,
        left: x,
        top: y,
        borderRadius: 10,
        position: "absolute",
        background: Orange,
      }}
    >
      <li>{numbers}</li>
    </div>
  );
};

export { MarkerList };
