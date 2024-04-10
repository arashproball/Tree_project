import React, { useState, useEffect } from "react";
import { FaFloppyDisk } from "react-icons/fa6";
import { IoMdPrint } from "react-icons/io";
import { FaFont } from "react-icons/fa";

function MultiPurposeButton() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState(() => {
    return localStorage.getItem("selectedFont") || "Arial";
  });

  useEffect(() => {
    localStorage.setItem("selectedFont", selectedFont);
  }, [selectedFont]);

  const handleFontToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFontSelect = (font: string) => {
    setSelectedFont(font);
    setIsDropdownOpen(false);
  };

  return (
    <div className="main-button">
      <div className="nested-section">
        <FaFloppyDisk />
        <span>
          <b>&nbsp;ذخیره</b>
        </span>
      </div>
      <div className="nested-section">
        <IoMdPrint />
        <span>
          <b>&nbsp;چاپ</b>
        </span>
      </div>
      <div
        className="dropdown"
        onMouseEnter={handleFontToggle}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <div
          className="nested-section"
          onClick={handleFontToggle}
          style={{ fontFamily: selectedFont }}
        >
          <FaFont />
          <span>&nbsp;{selectedFont}</span>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <ul>
              <li
                className="dropdown-choice"
                style={{ fontFamily: "Arial" }}
                onClick={() => handleFontSelect("Arial")}
              >
                Arial
              </li>
              <li
                className="dropdown-choice"
                style={{ fontFamily: "Verdana" }}
                onClick={() => handleFontSelect("Verdana")}
              >
                Verdana
              </li>
              <li
                className="dropdown-choice"
                style={{ fontFamily: "Times New Roman" }}
                onClick={() => handleFontSelect("Times New Roman")}
              >
                Times New Roman
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MultiPurposeButton;
