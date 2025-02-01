import React, { useState } from "react";

import RefreshIcon from "../assets/refreshicon.png";
import { HoverOrange, Orange } from "../utils/Colors.ts";

const RefreshButton = ({ visible, onButtonClick, x, y, height, width }) => {
  const buttonProps = {
    width: width,
    height: height,
    borderRadius: 20,
    x: x,
    y: y,
  };
  const [refreshRectangleBg, setRefreshRectangleBg] = useState(Orange);

  const [refreshIconRotation, setRefreshIconRotation] = useState(0);

  let spinning = false;

  const refreshIconAnimation = () => {
    if (spinning) return;
    let newRotation = 0;
    spinning = true;
    const rotationInterval = setInterval(() => {
      newRotation += refreshIconRotation + 3;
      setRefreshIconRotation(newRotation);
      if (refreshIconRotation == 180) setRefreshIconRotation(0);
      console.log(refreshIconRotation);
    }, 1);

    setTimeout(() => {
      clearInterval(rotationInterval);
      setRefreshIconRotation(0);
      spinning = false;
    }, 370 * 5);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        width: buttonProps.width,
        height: buttonProps.height,
        position: "relative",
      }}
    >
      <div
        className="RefreshRectangle"
        style={{
          width: buttonProps.width,
          height: buttonProps.height,
          left: buttonProps.x,
          top: buttonProps.y,
          position: "absolute",
          background: refreshRectangleBg,
          borderRadius: 20,
        }}
        onMouseEnter={() => setRefreshRectangleBg(HoverOrange)}
        onMouseLeave={() => setRefreshRectangleBg(Orange)}
        onClick={() => {
          refreshIconAnimation();
          if (onButtonClick) onButtonClick();
        }}
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
          onMouseEnter={() => setRefreshRectangleBg(HoverOrange)}
          onMouseLeave={() => setRefreshRectangleBg(Orange)}
          onClick={() => {
            refreshIconAnimation();
            if (onButtonClick) onButtonClick();
          }}
        >
          REFRESH
        </div>
        <img
          style={{
            width: buttonProps.height,
            height: buttonProps.height,
            left: 179,
            top: 0,
            position: "absolute",
            borderRadius: 10,
            rotate: "0 0 1 " + refreshIconRotation + "deg",
          }}
          src={RefreshIcon}
          onMouseEnter={() => setRefreshRectangleBg(HoverOrange)}
          onMouseLeave={() => setRefreshRectangleBg(Orange)}
          onClick={() => {
            refreshIconAnimation();
            if (onButtonClick) onButtonClick();
          }}
        />
      </div>
    </div>
  );
};

export { RefreshButton };

// import React, { useState } from "react";
// import RefreshIcon from "../assets/refreshicon.png";

// const RefreshButton = () => {
//   const [rotation, setRotation] = useState(0);
//   const [spinning, setSpinning] = useState(false);

//   const handleClick = () => {
//     if (!spinning) {
//       setSpinning(true);
//       let newRotation = rotation;

//       const rotateInterval = setInterval(() => {
//         newRotation += 5; // Adjust this to control the speed of rotation
//         setRotation(newRotation);

//         if (newRotation >= 270) {
//           newRotation = 0; // Reset rotation to keep it going smoothly
//         }
//       }, 30); // Adjust this interval for smoother animation

//       // Stop the spinning after 3 seconds
//       setTimeout(() => {
//         clearInterval(rotateInterval);
//         setSpinning(false);
//       }, 10000); // Spin for 3 seconds (can be adjusted)
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleClick} disabled={spinning}>
//         Rotate Image
//       </button>
//       <img
//         src={RefreshIcon}
//         alt="Spinning"
//         style={{
//           width: "150px",
//           height: "150px",
//           transform: `rotate(${rotation}deg)`,
//           transition: "transform 0.1s ease-out",
//         }}
//       />
//     </div>
//   );
// };

// export { RefreshButton };
