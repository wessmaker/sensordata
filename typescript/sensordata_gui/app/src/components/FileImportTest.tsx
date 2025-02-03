import React, { useRef, useState } from "react";

const FileImportTest = () => {
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0])); //Error squiqles don't matter
  }

  return <input type="file" onChange={handleChange} />;
};
export { FileImportTest };
