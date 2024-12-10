import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import SvgBadge from "./svgBadge";

const MyForm = () => {
  const [formState, setFormState] = useState({
    uniqueID: "unique ID",
    label: "Visits",
    shadowLabelColor: "000000",
    shadowCountColor: "000000",
    opacity: "30",
    swap: "0",
    labelBGColor: "484848",
    countBGColor: "1CA2F1",
    labelTextColor: "FFFFFF",
    countTextColor: "FFFFFF",
    passKey: "pass Key",
    setCount: "1",
  });

  const [activeColorField, setActiveColorField] = useState(null); // Track which color field is active
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copyLink, setCopyLink] = useState("");
  const [showGeneratedImage, setShowGeneratedImage] = useState(false);

  useEffect(() => {
    // console.log("Form state updated:", formState);
    setGeneratedLink(generateLink(formState));
  }, [formState]);

  const generateCopyLink = (formData) => {
    return `${process.env.REACT_APP_URL}/${formData.uniqueID}?label=${formData.label}&LSHW=${formData.shadowLabelColor}&CSHW=${formData.shadowCountColor}&SHWO=${formData.opacity}&swap=${formData.swap}&LBGC=${formData.labelBGColor}&CBGC=${formData.countBGColor}&LTC=${formData.labelTextColor}&CTC=${formData.countTextColor}`;
  };

  const handleGenerateLink = () => {
    setGeneratedLink(generateLink(formState));
    setCopyLink(generateCopyLink(formState));
    setShowGeneratedImage(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(copyLink)
      .then(() => {
        console.log("Link copied to clipboard:", copyLink);
      })
      .catch((err) => {
        console.error("Error copying link to clipboard:", err);
      });
  };

  const generateLink = (formData) => {
    return `${process.env.REACT_APP_URL}/${formData.uniqueID}?label=${formData.label}&LSHW=${formData.shadowLabelColor}&CSHW=${formData.shadowCountColor}&SHWO=${formData.opacity}&swap=${formData.swap}&LBGC=${formData.labelBGColor}&CBGC=${formData.countBGColor}&LTC=${formData.labelTextColor}&CTC=${formData.countTextColor}&PK=${formData.passKey}&SETC=${formData.setCount}`;
  };

  const handleColorChange = (color, field) => {
    setFormState((prevState) => ({ ...prevState, [field]: color.hex.slice(1) })); // Save the hex value without the #
  };

  const handleCloseColorPicker = () => {
    setActiveColorField(null); // Close the color picker
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGenerateLink();
  };

  return (
    <div className="flex flex-col items-center justify-center container mx-auto gap-y-6">
      <div className="flex sticky justify-center items-center h-20 w-full">
        <SvgBadge
          label={formState.label}
          shadowLabelColor={formState.shadowLabelColor}
          shadowCountColor={formState.shadowCountColor}
          opacity={formState.opacity}
          swap={formState.swap}
          labelBGColor={formState.labelBGColor}
          countBGColor={formState.countBGColor}
          labelTextColor={formState.labelTextColor}
          countTextColor={formState.countTextColor}
          visits={formState.setCount}
        />
      </div>
      <div className="flex">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-[320px] whitespace-nowrap">
          {Object.keys(formState).map((key) => {
            if (key.toLowerCase().includes("color")) {
              return (
                <div key={key} className="flex flex-col">
                  <label className="text-gray-700 text-sm font-bold w-24" htmlFor={key}>
                    {key}:
                  </label>
                  <div className="relative">
                    <input type="text" id={key} name={key} value={formState[key]} className="shadow w-[150px] appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onClick={() => setActiveColorField(key)} readOnly />
                    {activeColorField === key && (
                      <div className="absolute z-10 bg-white p-2 border rounded shadow-lg">
                        <SketchPicker color={`#${formState[key]}`} onChange={(color) => handleColorChange(color, key)} />
                        <button type="button" onClick={handleCloseColorPicker} className="mt-2 bg-red-500 text-white px-2 py-1 rounded focus:outline-none hover:bg-red-700">
                          Close
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            return (
              <div key={key} className="flex flex-col">
                <label className="text-gray-700 text-sm font-bold w-24" htmlFor={key}>
                  {key}:
                </label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={formState[key]}
                  className="shadow w-[150px] appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      [key]: e.target.value,
                    }))
                  }
                />
              </div>
            );
          })}
        </form>
      </div>
      <div className="w-full col-span-2 flex flex-col">
        <div className="flex items-center justify-center">
          <button type="button" onClick={handleGenerateLink} className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded p-2 focus:outline-none focus:shadow-outline whitespace-nowrap">
            Generate Link
          </button>
          {showGeneratedImage && <img src={generatedLink} alt="Generated link" className=" h-12 m-2" />}
        </div>
        <div className="flex flex-col items-center">
          <button type="button" onClick={handleCopyLink} className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded mt-2 focus:outline-none focus:shadow-outline" onMouseEnter={() => setIsButtonHovered(true)} onMouseLeave={() => setIsButtonHovered(false)}>
            Copy Link
          </button>
          {isButtonHovered && <div className="text-sm text-gray-500 whitespace-nowrap">{copyLink}</div>}
        </div>
      </div>
    </div>
  );
};

export default MyForm;
