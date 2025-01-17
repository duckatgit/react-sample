import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";

const CustomSwitch = withStyles((theme) => ({
  switchBase: {
    color: "grey",
    "&$checked": {
      color: "green",
    },
    "&$checked + $track": {
      backgroundColor: "green",
    },
  },
  checked: {},
  track: {},
}))(Switch);

const ToggleButton = ({ status, onStatusChange }) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleChange = () => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    setCurrentStatus(newStatus);
    onStatusChange(newStatus);
  };
  if (status === "pending") {
    return null;
  }

  return (
    <CustomSwitch
      checked={currentStatus === "active"}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export default ToggleButton;
