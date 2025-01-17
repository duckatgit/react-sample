import React from "react";
import { Link } from "react-router-dom";
import { Badge, Input, Label, UncontrolledTooltip } from "reactstrap";
import moment from "moment-timezone";

export const selectRow = (props) => ({
  mode: "checkbox",
  clickToSelect: true,
  hideSelectColumn: true,
  selectionHeaderRenderer: ({ indeterminate, mode, ...rest }) => (
    <div className="custom-control custom-checkbox">
      <Input
        type="checkbox"
        className="custom-control-input"
        ref={(input) => {
          if (input) input.indeterminate = indeterminate;
        }}
        {...rest}
      />
      <Label className="custom-control-label">&nbsp;</Label>
    </div>
  ),

  selectionRenderer: ({ mode, rowKey, ...rest }) => (
    <div className="custom-control custom-checkbox" key={rowKey}>
      <input type="checkbox" className="custom-control-input" {...rest} />
      <Label className="custom-control-label">&nbsp;</Label>
    </div>
  ),
  ...props,
});

const AddressColumns = ({ toggleConfirm, t }) => [
  {
    dataField: "address",
    text: t("address"),
    formatter: (_, row) => (
      <span>
        {row.address
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </span>
    ),
  },
  {
    dataField: "city",
    text: t("city"),
    formatter: (_, row) => (
      <span>
        {row.city
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </span>
    ),
  },
  {
    dataField: "state",
    text: t("state"),
    formatter: (_, row) => (
      <span>
        {row.state
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </span>
    ),
  },
  {
    dataField: "country",
    text: t("country"),
    formatter: (_, row) => (
      <span>
        {row.country
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </span>
    ),
  },

  {
    dataField: "pincode",
    text: t("pincode"),
  },
  {
    dataField: "createdAt",
    text: t("createdAt"),
    formatter: (_, row) => moment(row.createdAt).format("DD MMM YYYY "),
  },
];

AddressColumns.defaultProps = {
  toggleConfirm: (evt) => evt.preventDefault(),
};

export default AddressColumns;
