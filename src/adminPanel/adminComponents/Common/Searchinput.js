import React, { useState } from "react";
import { Button } from "reactstrap";

const SearchInput = ({
  onEnterKeyPress,
  placeholder,
  searchText,
  className,
}) => {
  const [inputValue, setInputValue] = useState(searchText || "");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEnterKey = (e) => {
    if (["Enter", "NumpadEnter"].includes(e.code)) {
      onEnterKeyPress(inputValue);
    }
  };

  return (
    <div className={`search-box inline-button d-inline-block ${className}`}>
      <div className="position-relative d-flex align-items-center">
        <label htmlFor="search-bar-0" className="search-label mb-0 flex-grow-1">
          <span id="search-bar-0-label" className="sr-only">
            Search this table
          </span>
          <input
            id="search-bar-0"
            aria-labelledby="search-bar-0-label"
            className="form-control"
            type="text"
            placeholder={placeholder}
            onKeyPress={handleEnterKey}
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>

        {inputValue !== "" ? (
          <Button
            type="button"
            color="secondary"
            className="btn-sm btn-rounded clear-icon-btn"
            onClick={() => {
              setInputValue("");
              onEnterKeyPress("");
            }}
          >
            <i className="bx bx-x"></i>
          </Button>
        ) : (
          <Button
            type="button"
            color="primary"
            className="btn-sm btn-rounded search-icon-btn colo"
            onClick={() => onEnterKeyPress(inputValue)}
          >
            <i className="bx bx-search-alt" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
