import React, { useState } from "react";
import { LightGray, Orange } from "../utils/Colors.ts";

const MarkerList = ({ isOpen, onCloseButtonClick, x, y, w, h }) => {
  const [persons, setPersons] = useState([
    { firstName: "Valtteri", age: 12, homeTown: "Keuruu", id: 1 },
    { firstName: "Eemi", age: 56, homeTown: "Kattila", id: 2 },
    { firstName: "Jimi", age: 22, homeTown: "Junttila", id: 3 },
    { firstName: "Santeri", age: 45, homeTown: "Mikke", id: 4 },
  ]);

  if (!isOpen) return null;

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
      {persons.map((person) => (
        <>
          <div
            role="button"
            style={{
              display: "block",
              height: 20,
              textAlign: "left",
            }}
          >
            HELLO
          </div>
        </>
      ))}
    </div>
  );
};

export { MarkerList };
