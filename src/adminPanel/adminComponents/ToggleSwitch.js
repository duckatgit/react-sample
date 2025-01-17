import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { uniqueId } from "lodash";

const SIZES = {
  xsm: "switch-xsm",
  sm: "switch-sm",
  md: "switch-md",
  l: "switch-l",
  default: "status-switch",
};

const Switch = (props) => {
  const handleChange = (event) => {
    let checked = props.checked;
    let value = checked ? props.offValue : props.onValue;
    props.onChange({
      target: {
        value: value,
        checked,
      },
    });
  };

  return (
    <div className={classNames("square-switch", { [SIZES[props.size]]: true })}>
      <input
        className={classNames("switch", props.inputType)}
        type="checkbox"
        id={props.id}
        checked={props.checked}
        onClick={handleChange}
      />

      <label
        htmlFor={props.id}
        data-on-label={props.onLabel}
        data-off-label={props.offLabel}
      />
    </div>
  );
};

Switch.propTypes = {
  id: PropTypes.string,
  size: PropTypes.oneOf(["xsm", "sm", "md", "l", "default"]),
  inputType: PropTypes.oneOf(["", "switcher"]),
  checked: PropTypes.bool,
  onLabel: PropTypes.string,
  offLabel: PropTypes.string,
  onValue: PropTypes.string,
  offValue: PropTypes.string,
};

Switch.defaultProps = {
  id: uniqueId("switch-"),
  size: "l",
  inputType: "",
  onChange: () => {},
};

export default React.memo(Switch);
