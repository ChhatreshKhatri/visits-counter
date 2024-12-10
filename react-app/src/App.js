import React, { useState, useEffect } from "react";
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

  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copyLink, setCopyLink] = useState("");
  const [showGeneratedImage, setShowGeneratedImage] = useState(false);

  const handleButtonHover = () => {
    setIsButtonHovered(true);
  };

  const handleButtonLeave = () => {
    setIsButtonHovered(false);
  };
  // useEffect(() => {
  //   console.log("env var", process.env.REACT_APP_URL);
  // }
  // , []);

  useEffect(() => {
    console.log("Form state updated:", formState);
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
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold w-24" htmlFor={"uniqueID"}>
              Unique ID:
            </label>
            <input
              type="text"
              id={"uniqueID"}
              name={"uniqueID"}
              value={formState.uniqueID}
              className="shadow w-[150px] appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setFormState((prevState) => ({ ...prevState, uniqueID: e.target.value }))}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold w-24" htmlFor={"label"}>
              Label:
            </label>
            <input
              type="text"
              id={"label"}
              name={"label"}
              value={formState.label}
              className="shadow w-[150px] appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setFormState((prevState) => ({ ...prevState, label: e.target.value }))}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold w-24" htmlFor={"shadowLabelColor"}>
              Shadow Label Color:
            </label>
            <input
              type="text"
              id={"shadowLabelColor"}
              name={"shadowLabelColor"}
              value={formState.shadowLabelColor}
              className="shadow w-[150px] appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setFormState((prevState) => ({ ...prevState, shadowLabelColor: e.target.value }))}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold w-24" htmlFor={"shadowCountColor"}>
              Shadow Count Color:
            </label>
            <input
              type="text"
              id={"shadowCountColor"}
              name={"shadowCountColor"}
              value={formState.shadowCountColor}
              className="shadow w-[150px] appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setFormState((prevState) => ({ ...prevState, shadowCountColor: e.target.value }))}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold w-24" htmlFor={"opacity"}>
              Opacity:
            </label>
            <input
              type="text"
              id={"opacity"}
              name={"opacity"}
              value={formState.opacity}
              className="shadow w-[150px] appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setFormState((prevState) => ({ ...prevState, opacity: e.target.value }))}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold w-24" htmlFor={"swap"}>
              Swap:
            </label>
            <input
              type="text"
              id={"swap"}
              name={"swap"}
              value={formState.swap}
              className="shadow w-[150px] appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setFormState((prevState) => ({ ...prevState, swap: e.target.value }))}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold w-24" htmlFor={"labelBGColor"}>
              Label BG Color:
            </label>
            <input
              type="text"
              id={"labelBGColor"}
              name={"labelBGColor"}
              value={formState.labelBGColor}
              className="shadow w-[150px] appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setFormState((prevState) => ({ ...prevState, labelBGColor: e.target.value }))}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold w-24" htmlFor={"countBGColor"}>
              Count BG Color:
            </label>
            <input
              type="text"
              id={"countBGColor"}
              name={"countBGColor"}
              value={formState.countBGColor}
              className="shadow w-[150px] appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setFormState((prevState) => ({ ...prevState, countBGColor: e.target.value }))}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold w-24" htmlFor={"labelTextColor"}>
              Label Text Color:
            </label>
            <input
              type="text"
              id={"labelTextColor"}
              name={"labelTextColor"}
              value={formState.labelTextColor}
              className="shadow w-[150px] appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setFormState((prevState) => ({ ...prevState, labelTextColor: e.target.value }))}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold w-24" htmlFor={"countTextColor"}>
              Count Text Color:
            </label>
            <input
              type="text"
              id={"countTextColor"}
              name={"countTextColor"}
              value={formState.countTextColor}
              className="shadow w-[150px] appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setFormState((prevState) => ({ ...prevState, countTextColor: e.target.value }))}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold w-24" htmlFor={"passKey"}>
              Pass Key:
            </label>
            <input
              type="text"
              id={"passKey"}
              name={"passKey"}
              value={formState.passKey}
              className="shadow w-[150px] appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setFormState((prevState) => ({ ...prevState, passKey: e.target.value }))}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold w-24" htmlFor={"setCount"}>
              Set Count:
            </label>
            <input
              type="text"
              id={"setCount"}
              name={"setCount"}
              value={formState.setCount}
              className="shadow w-[150px] appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setFormState((prevState) => ({ ...prevState, setCount: e.target.value }))}
            />
          </div>
        </form>
      </div>
      {/* Generate and Copy buttons */}
      <div className="w-full col-span-2 flex flex-col">
        <div className="flex items-center justify-center">
          <button type="button" onClick={handleGenerateLink} className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded p-2 focus:outline-none focus:shadow-outline whitespace-nowrap">
            Generate Link
          </button>
          {showGeneratedImage && <img src={generatedLink} alt="Generated link" className=" h-12 m-2" />}
        </div>

        <div className="flex flex-col items-center">
          <button type="button" onClick={handleCopyLink} className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded mt-2 focus:outline-none focus:shadow-outline" onMouseEnter={handleButtonHover} onMouseLeave={handleButtonLeave}>
            Copy Link
          </button>
          {isButtonHovered && <div className="text-sm text-gray-500 whitespace-nowrap">{copyLink}</div>}
        </div>
      </div>
    </div>
  );
};

export default MyForm;
