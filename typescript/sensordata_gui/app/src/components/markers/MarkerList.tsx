import React, { useEffect, useRef, useState } from "react";
import { DarkGray, FontBlack, LightGray, Orange } from "../../utils/Colors.ts";
import { Marker } from "./Marker.tsx";
import ReactDOM, { render } from "react-dom";

const MarkerList = ({ isOpen, onCloseButtonClick, x, y, width, height }) => {
  const dimmingProps = {
    height: 20,
    width: width,
    topBg: "linear-gradient(to bottom, black 0%, transparent 100%)",
    bottomBg: "linear-gradient(to top, black 0%, transparent 100%)",
    opacity: 0.5,
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [topScrollDimming, setTopScrollDimming] = useState(false);
  const [bottomScrollDimming, setBottomScrollDimming] = useState(true);

  const container = scrollContainerRef.current;
  let atTop: boolean = false;
  let atBottom: boolean = false;

  const handleScrolling = () => {
    if (container) {
      atTop = container?.scrollTop === 0;
      atBottom =
        container?.scrollHeight - container?.clientHeight ===
        container?.scrollTop;
    }
    setBottomScrollDimming(!atBottom);
    setTopScrollDimming(!atTop);
  };

  React.useEffect(() => {
    if (container !== null) {
      container.addEventListener("scroll", handleScrolling);
    }
  }, [container]);

  useEffect(() => {
    //Restore to default when opening
    setTopScrollDimming(false);
    setBottomScrollDimming(true);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={scrollContainerRef}
        style={{
          width: width,
          height: height,
          left: x,
          top: y,
          borderRadius: 10,
          position: "absolute",
          background: DarkGray,
          overflow: "scroll",
          overflowX: "hidden",
          scrollbarWidth: "none",
        }}
      >
        {[...Array(50)].map(() => (
          <>
            <div
              style={{
                display: "block",
                height: 90,
                textAlign: "left",
              }}
            >
              <Marker
                w={width}
                visible={true}
                name={"dsadasdasd"}
                value={"dsadasds"}
                handleMarkerCloseFunction={() => {
                  console.log("Closed marker in list!");
                }}
              />
            </div>
          </>
        ))}
      </div>
      <div
        className="TopScrollDimming"
        hidden={!topScrollDimming}
        style={{
          width: width,
          height: dimmingProps.height,
          left: x,
          top: 0,
          position: "absolute",
          background: dimmingProps.topBg,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          opacity: dimmingProps.opacity,
        }}
      ></div>
      <div
        className="BottomScrollDimming"
        hidden={!bottomScrollDimming}
        style={{
          width: width,
          height: dimmingProps.height,
          left: x,
          bottom: 0,
          position: "absolute",
          background: dimmingProps.bottomBg,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          opacity: dimmingProps.opacity,
        }}
      ></div>
    </>
  );
};

export { MarkerList };
