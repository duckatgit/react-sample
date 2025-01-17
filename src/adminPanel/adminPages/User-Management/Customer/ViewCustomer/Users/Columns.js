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

const UserColumns = ({ toggleConfirm, t }) => [
  {
    dataField: "firstName",
    text: t("name"),
    formatter: (_, row) => (
      <span>
        {row.firstName.charAt(0).toUpperCase() + row.firstName.slice(1)}{" "}
        {row.lastName.charAt(0).toUpperCase() + row.lastName.slice(1)}
      </span>
    ),
  },
  {
    dataField: "email",
    text: t("email"),
  },
  {
    dataField: "mobileNumber",
    text: t("mobileNumber"),
  },
  {
    dataField: "role",
    text: t("role"),
    formatter: (_, row) => (
      <p className="mb-0" style={{ textTransform: "capitalize" }}>
        {row?.role}
      </p>
    ),
  },
  {
    dataField: "status",
    text: t("status"),
    formatter: (_, row) => (
      <p className="mb-0" style={{ textTransform: "capitalize" }}>
        {row?.status}
      </p>
    ),
  },
  {
    dataField: "createdAt",
    text: t("registeredAt"),
    formatter: (_, row) => moment(row.createdAt).format("DD MMM YYYY hh:mm A"),
  },
];

UserColumns.defaultProps = {
  toggleConfirm: (evt) => evt.preventDefault(),
};

export default UserColumns;
