import React, { useState } from "react";

import RefreshIcon from "../assets/refreshicon.png";
import { HoverOrange, Orange } from "../utils/Colors.ts";

import "./RefreshAnimation.css";

const RefreshButton = ({ visible, onButtonClick, x, y, height, width }) => {
  const buttonProps = {
    width: width,
    height: height,
    borderRadius: 20,
    x: x,
    y: y,
  };
  const [refreshContainerBg, setRefreshContainerBg] = useState(Orange);
  const [refreshIconClassName, setRefreshIconClassName] =
    useState("RefreshIcon");

  const handleClick = () => {
    console.log(refreshIconClassName);
    if (refreshIconClassName !== "RefreshIconAnimated") {
      setRefreshIconClassName("RefreshIconAnimated");
      setTimeout(() => {
        setRefreshIconClassName("RefreshIcon");
      }, 1500);
      onButtonClick();
    }
  };

  if (!visible) return null;

  return (
    <div
      style={{
        width: buttonProps.width,
        height: buttonProps.height,
        position: "relative",
      }}
      onClick={() => {
        if (onButtonClick) handleClick();
      }}
    >
      <div
        className="RefreshContainer"
        style={{
          width: buttonProps.width,
          height: buttonProps.height,
          left: buttonProps.x,
          top: buttonProps.y,
          position: "absolute",
          background: refreshContainerBg,
          borderRadius: 20,
        }}
        onMouseEnter={() => setRefreshContainerBg(HoverOrange)}
        onMouseLeave={() => setRefreshContainerBg(Orange)}
      >
        <div
          className="RefreshText"
          style={{
            width: buttonProps.width,
            height: buttonProps.height,
            left: 0,
            top: 3,
            position: "absolute",
            color: "black",
            fontSize: 20,
            fontFamily: "Arial",
            textAlign: "center",
            margin: "auto",
            verticalAlign: "middle",
            cursor: "default",
          }}
          onMouseEnter={() => setRefreshContainerBg(HoverOrange)}
          onMouseLeave={() => setRefreshContainerBg(Orange)}
        >
          REFRESH
        </div>
        <img
          alt="icon"
          className={refreshIconClassName}
          style={{
            width: buttonProps.height,
            height: buttonProps.height,
            left: 179,
            top: 0,
            position: "absolute",
            borderRadius: 10,
          }}
          src={RefreshIcon}
          onMouseEnter={() => setRefreshContainerBg(HoverOrange)}
          onMouseLeave={() => setRefreshContainerBg(Orange)}
        />
      </div>
    </div>
  );
};

export { RefreshButton };
