import React from "react";
import { Badge, Input, Label, UncontrolledTooltip } from "reactstrap";
import Currency from "utils/currency";
import { Link } from "react-router-dom";
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

const Columnsview = ({ t }) => [
  {
    dataField: "subProductData.subProductImage",
    text: t("image"),
    formatter: (image, row) => (
      <Link to="#">
        <img
          src={image}
          alt="image"
          style={{
            minWidth: "45px",
            maxWidth: "45px",
            height: "45px",
            minHeight: "45px",
            objectFit: "contain",
          }}
        />
      </Link>
    ),
  },
  {
    dataField: "subProductData.subProductTitle",
    text: t("name"),
  },

  {
    dataField: "quantity",
    text: t("quantity"),
  },
];

Columnsview.defaultProps = {
  toggleConfirm: (evt) => evt.preventDefault(),
};

export default Columnsview;
