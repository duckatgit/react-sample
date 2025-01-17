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

const OrderColumns = ({ toggleConfirm, t }) => [
  {
    dataField: "subProductData",
    text: t("subProductName"),
    formatter: (_, row) => {
      const subProductName = row?.subProductData?.subProductTitle;
      return subProductName.charAt(0).toUpperCase() + subProductName.slice(1);
    },
  },
  {
    dataField: "purchasedPrice",
    text: t("purchasedPrice"),
  },
  {
    dataField: "purchasedQuantity",
    text: t("purchasedQuantity"),
  },
  {
    dataField: "weight",
    text: t("weight"),
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
    text: t("orderedOn"),
    formatter: (_, row) => moment(row.createdAt).format("DD MMM YYYY "),
  },
];

OrderColumns.defaultProps = {
  toggleConfirm: (evt) => evt.preventDefault(),
};

export default OrderColumns;
