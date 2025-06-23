"use client";
import { useState } from "react";
import { SvgBadge } from "./components/SvgBadge";
import Image from "next/image";

export default function Home() {
  const [formState, setFormState] = useState({
    uniqueID: "uniqueID",
    label: "Visits",
    passKey: "passKey",
    setCount: "1",
    opacity: "30",
    swap: "0",
    labelBGColor: "#484848",
    countBGColor: "#1CA2F1",
    labelTextColor: "#FFFFFF",
    countTextColor: "#FFFFFF",
    shadowLabelColor: "#000000",
    shadowCountColor: "#000000",
  });

  const [previewQuery, setPreviewQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query =
      window.location.origin +
      "/" +
      formState.uniqueID +
      "?" +
      new URLSearchParams({
        PK: formState.passKey,
        label: formState.label,
        SETC: formState.setCount,
        SHWO: formState.opacity,
        swap: formState.swap,
        LBGC: formState.labelBGColor,
        CBGC: formState.countBGColor,
        LTC: formState.labelTextColor,
        CTC: formState.countTextColor,
        LSHW: formState.shadowLabelColor,
        CSHW: formState.shadowCountColor,
      }).toString();
    setPreviewQuery(query);
  };

  const copyLink = () => {
    const baseUrl = window.location.origin + "/" + formState.uniqueID;
    const query = new URLSearchParams({
      label: formState.label,
      SHWO: formState.opacity,
      swap: formState.swap,
      LBGC: formState.labelBGColor,
      CBGC: formState.countBGColor,
      LTC: formState.labelTextColor,
      CTC: formState.countTextColor,
      LSHW: formState.shadowLabelColor,
      CSHW: formState.shadowCountColor,
    }).toString();
    navigator.clipboard.writeText(`${baseUrl}?${query}`);
    setPreviewQuery("");
    alert("Link copied to clipboard!");
  };

  return (
    <div className="w-full px-2 py-6">
      <h1 className="text-2xl font-semibold text-center mb-2">Visits Counter Badge Generator</h1>

      {/* Live SVG Preview */}
      <div className="flex justify-center mb-4">
        <div
          className="h-20"
          dangerouslySetInnerHTML={{
            __html: SvgBadge(formState.label, formState.setCount, formState.swap === "1", parseInt(formState.opacity, 10), formState.shadowLabelColor, formState.shadowCountColor, formState.labelBGColor, formState.countBGColor, formState.labelTextColor, formState.countTextColor),
          }}
        />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-x-6 gap-y-4 justify-center max-w-2xl mx-auto">
        {[
          { id: "uniqueID", label: "Unique ID" },
          { id: "passKey", label: "Pass Key" },
          { id: "label", label: "Label" },
          { id: "setCount", label: "Set Count (Pass Key Required)", type: "number" },
          { id: "opacity", label: "Opacity", type: "number" },
          { id: "swap", label: "Swap 0 / 1" },
          { id: "labelBGColor", label: "Label BG Color", type: "color" },
          { id: "countBGColor", label: "Count BG Color", type: "color" },
          { id: "labelTextColor", label: "Label Text Color", type: "color" },
          { id: "countTextColor", label: "Count Text Color", type: "color" },
          { id: "shadowLabelColor", label: "Shadow Label Color", type: "color" },
          { id: "shadowCountColor", label: "Shadow Count Color", type: "color" },
        ].map(({ id, label, type }) => (
          <div key={id} className="w-full md:w-[48%] flex flex-col items-center md:items-center justify-center">
            <label htmlFor={id} className="text-sm font-medium mb-1">
              {label}:
            </label>

            {type === "color" ? (
              <div className="flex items-center gap-2 pr-2">
                <input id={id} name={id} type="color" value={formState[id as keyof typeof formState]} onChange={handleChange} className="w-14 h-10 border rounded cursor-pointer" />
                <span className="text-xs w-[72px] text-center">{formState[id as keyof typeof formState]}</span>
              </div>
            ) : (
              <input id={id} name={id} type={type || "text"} value={formState[id as keyof typeof formState]} onChange={handleChange} className="border rounded px-2 py-1 text-sm" />
            )}
          </div>
        ))}

        {/* Submit Button */}
        <div className="w-full flex justify-center mt-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition">
            Generate Badge
          </button>
        </div>
      </form>

      {previewQuery && (
        <div className="flex flex-col items-center justify-center text-center mt-2">
          <button onClick={copyLink} className="ml-4 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition">
            Copy Link
          </button>
          <Image unoptimized width={185} height={60} src={`${previewQuery}`} alt="Generated Badge" className="max-w-full h-auto mt-4" />
        </div>
      )}
    </div>
  );
}
