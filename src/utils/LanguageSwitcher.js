import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import kuwait from "../assets/images/kuwait.jpg";
import British from "../assets/images/British.png";
import Dropdown from "react-bootstrap/Dropdown";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("selectedLanguage", selectedLanguage);
  }, [selectedLanguage, i18n]);

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="" id="dropdown-basic" className="custom-dropdown-toggle">
          <img
            className="demo-flag-show"
            src={selectedLanguage === "en" ? British : kuwait}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu className="custom-dropdown-menu">
          <Dropdown.Item onClick={() => changeLanguage("en")}>
            <img src={British} alt="English Flag" className="demo-flag" />{" "}
             <span>English</span> 
          </Dropdown.Item>
          <Dropdown.Item onClick={() => changeLanguage("ar")}>
            <img src={kuwait} alt="Kuwait Flag" className="demo-flag" /> 
            <span>Kuwait</span> 
          </Dropdown.Item>
        </Dropdown.Menu>
        
      </Dropdown>
    </div>
  );
};

export default LanguageSwitcher;
