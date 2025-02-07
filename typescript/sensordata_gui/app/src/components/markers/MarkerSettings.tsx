import React, { useState } from "react";
import CloseIcon from "../../assets/closeicon.png";
import {
  Orange,
  HoverOrange,
  LightGray,
  DarkGray,
  HoverDarkGray,
  FontWhite,
  ConnectedGreen,
  DisconnectedRed,
  ConnectingYellow,
} from "../../utils/Colors.ts";
import { getTopicDetailWithPath } from "../../services/MQTT.ts";
import { TopicDetails } from "../../types/TopicDetails.ts";

const MarkerSettingsProps = {
  headerFontSize: 15,
  propertyFontSize: 12,
  buttonBottom: 10,
  buttonHeight: 30,
  buttonWidth: 75,
  buttonStartLeft: 250,
  buttonSpacing: 10,
  saveTextColor: ConnectedGreen,
  cancelTextColor: DisconnectedRed,
  resetTextColor: ConnectingYellow,
  buttonTextTop: 7,
  buttonTextLeft: 0,
};
const MarkerSettings = ({
  closeButtonCallBack,
  saveButtonCallBack,
  cancelButtonCallBack,
  resetButtonCallBack,
  targetTopicPath,
}) => {
  const [closeButtonBg, setCloseButtonBg] = useState(Orange);
  const [saveButtonBg, setSaveButtonBg] = useState(DarkGray);
  const [cancelButtonBg, setCancelButtonBg] = useState(DarkGray);
  const [resetButtonBg, setResetButtonBg] = useState(DarkGray);
  const topicDetails: TopicDetails | null =
    getTopicDetailWithPath(targetTopicPath);

  const onCloseButtonClick = () => {
    if (closeButtonCallBack) closeButtonCallBack();
    console.log("CLSOE BUTTON");
  };
  const onSaveButtonClick = () => {
    if (saveButtonCallBack) saveButtonCallBack();
    console.log("SAVE BUTTON");
  };
  const onCancelButtonClick = () => {
    if (cancelButtonCallBack) cancelButtonCallBack();
    console.log("CANCEL BUTTON");
  };
  const onResetButtonClick = () => {
    if (resetButtonCallBack) resetButtonCallBack();
    console.log("RESET BUTTON");
  };

  if (!topicDetails) return;

  return (
    <>
      <div
        className="SettingsContainerContainer"
        style={{
          width: 544,
          height: 267,
          left: 0,
          top: 0,
          position: "absolute",
          background: DarkGray,
          borderRadius: 10,
        }}
      >
        <div
          className="SettingsContainer"
          style={{
            width: 535,
            height: 258,
            left: 4,
            top: 0,
            position: "absolute",
            background: LightGray,
            borderRadius: 10,
          }}
        >
          <div
            className="CloseButtonContainerContainer"
            style={{
              width: 61,
              height: 64,
              right: 0,
              top: 0,
              position: "absolute",
              background: DarkGray,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <div
              className="CloseButtonContainer"
              style={{
                width: 56,
                height: 56,
                right: 0,
                top: 4,
                position: "absolute",
                background: closeButtonBg,
                borderRadius: 10,
              }}
              onMouseEnter={() => setCloseButtonBg(HoverOrange)}
              onMouseLeave={() => setCloseButtonBg(Orange)}
              onClick={() => onCloseButtonClick()}
            >
              <img
                className="CloseIcon"
                alt="icon"
                style={{
                  width: 56,
                  height: 56,
                  right: 0,
                  top: 0,
                  position: "absolute",
                }}
                onMouseEnter={() => setCloseButtonBg(HoverOrange)}
                onMouseLeave={() => setCloseButtonBg(Orange)}
                onClick={() => onCloseButtonClick()}
                src={CloseIcon}
              />
            </div>
          </div>
        </div>
        <div
          className="SaveButtonContainer"
          style={{
            width: MarkerSettingsProps.buttonWidth,
            height: MarkerSettingsProps.buttonHeight,
            left: MarkerSettingsProps.buttonStartLeft,
            bottom: MarkerSettingsProps.buttonBottom,
            position: "absolute",
            background: saveButtonBg,
            borderRadius: 20,
          }}
          onMouseEnter={() => setSaveButtonBg(HoverDarkGray)}
          onMouseLeave={() => setSaveButtonBg(DarkGray)}
          onClick={() => onSaveButtonClick()}
        >
          <div
            className="SaveButtonText"
            style={{
              width: MarkerSettingsProps.buttonWidth,
              height: 30,
              left: MarkerSettingsProps.buttonTextLeft,
              top: MarkerSettingsProps.buttonTextTop,
              position: "absolute",
              textAlign: "center",
              color: MarkerSettingsProps.saveTextColor,
              cursor: "default",
              fontSize: 14,
              fontFamily: "Arial",
            }}
            onMouseEnter={() => setSaveButtonBg(HoverDarkGray)}
            onMouseLeave={() => setSaveButtonBg(DarkGray)}
            onClick={() => onSaveButtonClick()}
          >
            SAVE
          </div>
        </div>
        <div
          className="CancelButtonContainer"
          style={{
            width: MarkerSettingsProps.buttonWidth,
            height: MarkerSettingsProps.buttonHeight,
            left:
              MarkerSettingsProps.buttonStartLeft +
              MarkerSettingsProps.buttonWidth +
              MarkerSettingsProps.buttonSpacing,
            bottom: MarkerSettingsProps.buttonBottom,
            position: "absolute",
            background: cancelButtonBg,
            borderRadius: 20,
          }}
          onMouseEnter={() => setCancelButtonBg(HoverDarkGray)}
          onMouseLeave={() => setCancelButtonBg(DarkGray)}
          onClick={() => onCancelButtonClick()}
        >
          <div
            className="CancelButtonText"
            style={{
              width: MarkerSettingsProps.buttonWidth,
              height: MarkerSettingsProps.buttonHeight,
              left: MarkerSettingsProps.buttonTextLeft,
              top: MarkerSettingsProps.buttonTextTop,
              position: "absolute",
              textAlign: "center",
              color: MarkerSettingsProps.cancelTextColor,
              cursor: "default",
              fontSize: 14,
              fontFamily: "Arial",
            }}
            onMouseEnter={() => setCancelButtonBg(HoverDarkGray)}
            onMouseLeave={() => setCancelButtonBg(DarkGray)}
            onClick={() => onCancelButtonClick()}
          >
            CANCEL
          </div>
        </div>

        <div
          className="ResetButtonContainer"
          style={{
            width: MarkerSettingsProps.buttonWidth,
            height: MarkerSettingsProps.buttonHeight,
            left:
              MarkerSettingsProps.buttonStartLeft +
              MarkerSettingsProps.buttonWidth * 2 +
              MarkerSettingsProps.buttonSpacing * 2,
            bottom: MarkerSettingsProps.buttonBottom,
            position: "absolute",
            background: resetButtonBg,
            borderRadius: 20,
          }}
          onMouseEnter={() => setResetButtonBg(HoverDarkGray)}
          onMouseLeave={() => setResetButtonBg(DarkGray)}
          onClick={() => onResetButtonClick()}
        >
          <div
            className="ResetButtonText"
            style={{
              width: MarkerSettingsProps.buttonWidth,
              height: MarkerSettingsProps.buttonHeight,
              left: MarkerSettingsProps.buttonTextLeft,
              top: MarkerSettingsProps.buttonTextTop,
              position: "absolute",
              textAlign: "center",
              color: MarkerSettingsProps.resetTextColor,
              cursor: "default",
              fontSize: 14,
              fontFamily: "Arial",
            }}
            onMouseEnter={() => setResetButtonBg(HoverDarkGray)}
            onMouseLeave={() => setResetButtonBg(DarkGray)}
            onClick={() => onResetButtonClick()}
          >
            RESET
          </div>
        </div>
      </div>

      <div
        className="MarkerPropertiesText"
        style={{
          width: 135,
          height: 30,
          left: 23,
          top: 17,
          textAlign: "left",
          position: "absolute",
          color: FontWhite,
          fontSize: MarkerSettingsProps.headerFontSize,
          fontFamily: "Arial",
        }}
      >
        Marker properties
      </div>
      <div
        className="ValueText"
        style={{
          width: 135,
          height: 30,
          left: 165,
          top: 17,
          position: "absolute",
          textAlign: "right",
          color: FontWhite,
          fontSize: MarkerSettingsProps.headerFontSize,
          fontFamily: "Arial",
        }}
      >
        Value
      </div>
      <div
        className="TopicText"
        style={{
          width: 50,
          height: 30,
          left: 23,
          top: 127,
          position: "absolute",
          textAlign: "right",
          color: FontWhite,
          fontSize: MarkerSettingsProps.propertyFontSize,
          fontFamily: "Arial",
        }}
      >
        Topic
      </div>
      <div
        className="UnitText"
        style={{
          width: 50,
          height: 30,
          left: 250,
          top: 75,
          position: "absolute",
          textAlign: "right",
          color: FontWhite,
          fontSize: MarkerSettingsProps.propertyFontSize,
          fontFamily: "Arial",
        }}
      >
        Unit
      </div>
      <div
        className="ColorText"
        style={{
          width: 50,
          height: 30,
          left: 250,
          top: 127,
          position: "absolute",
          textAlign: "right",
          color: FontWhite,
          fontSize: MarkerSettingsProps.propertyFontSize,
          fontFamily: "Arial",
        }}
      >
        Color
      </div>
      <div
        className="NameText"
        style={{
          width: 50,
          height: 30,
          left: 23,
          top: 79,
          position: "absolute",
          textAlign: "right",
          color: FontWhite,
          fontSize: MarkerSettingsProps.propertyFontSize,
          fontFamily: "Arial",
        }}
      >
        Name
      </div>
    </>
  );
};

export { MarkerSettings };
