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

const Columns = ({
  handleDeletion,
  addCustomerModal,
  handleViewSection,
  setPreview,
  handleSort,
  t,
}) => [
  {
    dataField: "orderData.userName",
    text: t("userName"),
    sort: true,
    sortCaret: (order, column) => {
      if (!order)
        return <i className="custom-icon sort-icon fas fa-arrow-up" />;
      else if (order === "asc")
        return <i className="custom-icon sort-icon fas fa-arrow-up" />;
      else if (order === "desc")
        return <i className="custom-icon sort-icon fas fa-arrow-down" />;
      return null;
    },
    onSort: (field, order) => {
      // Call the handleSort function passed from props
      handleSort(order, "name");
    },
  },
  {
    dataField: "orderData.mobileNo",
    text: t("mobile"),
    sort: true,
    sortCaret: (order, column) => {
      if (!order)
        return <i className="custom-icon sort-icon fas fa-arrow-up" />;
      else if (order === "asc")
        return <i className="custom-icon sort-icon fas fa-arrow-up" />;
      else if (order === "desc")
        return <i className="custom-icon sort-icon fas fa-arrow-down" />;
      return null;
    },
    onSort: (field, order) => {
      // Call the handleSort function passed from props
      handleSort(order, "name");
    },
  },

  {
    dataField: "orderData.id",
    text: t("orderId"),
    sort: true,
    sortCaret: (order, column) => {
      if (!order)
        return <i className="custom-icon sort-icon fas fa-arrow-up" />;
      else if (order === "asc")
        return <i className="custom-icon sort-icon fas fa-arrow-up" />;
      else if (order === "desc")
        return <i className="custom-icon sort-icon fas fa-arrow-down" />;
      return null;
    },
    onSort: (field, order) => {
      handleSort(order, "productData");
    },
    formatter: (cell, row) => {
      return row.orderData.id;
    },
  },
  {
    dataField: "issue",
    text: t("issue"),
    sort: true,
    sortCaret: (order, column) => {
      if (!order)
        return <i className="custom-icon sort-icon fas fa-arrow-up" />;
      else if (order === "asc")
        return <i className="custom-icon sort-icon fas fa-arrow-up" />;
      else if (order === "desc")
        return <i className="custom-icon sort-icon fas fa-arrow-down" />;
      return null;
    },
    onSort: (field, order) => {
      // Call the handleSort function passed from props
      handleSort(order, "issue");
    },
  },
  {
    dataField: "orderData.image",
    text: t("image"),
    formatter: (_, row) => (
      <Link to="#">
        <img
          onClick={() => {
            setPreview({ image: row?.image, isOpen: true });
          }}
          src={row?.image}
          alt="Product Image"
          style={{
            minWidth: "45px",
            maxWidth: "45px",
            height: "45px",
            minHeight: "45px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </Link>
    ),
  },
  {
    dataField: "status",
    text: t("status"),
    sort: true,
    sortCaret: (order, column) => {
      if (!order)
        return <i className="custom-icon sort-icon fas fa-arrow-up" />;
      else if (order === "asc")
        return <i className="custom-icon sort-icon fas fa-arrow-up" />;
      else if (order === "desc")
        return <i className="custom-icon sort-icon fas fa-arrow-down" />;
      return null;
    },
    onSort: (field, order) => {
      // Call the handleSort function passed from props
      handleSort(order, "status");
    },
    formatter: (_, row) => {
      const capitalizeFirstLetter = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
      };

      const capitalizedStatus = capitalizeFirstLetter(row.status);

      return <span>{capitalizedStatus}</span>;
    },
  },

  {
    dataField: "createdAt",
    text: t("createdAt"),
    formatter: (_, row) => (
      <Link to={`/admin/product/${row?.id}`}>
        {moment(row.createdAt).format("DD MMM YYYY")}
      </Link>
    ),
  },

  {
    isDummyField: true,
    text: t("action"),
    dataField: "action",
    csvExport: false,
    formatter: (_, row) => (
      <>
        <Link to="#" className="text-secondary delete_icon">
          <i
            className="far fa-eye"
            onClick={() => handleViewSection(row)}
            id={`view2-${row._id}-tooltip`}
          />
          <UncontrolledTooltip
            placement="top"
            target={`view2-${row._id}-tooltip`}
          >
            {t("viewDetails")}
          </UncontrolledTooltip>
        </Link>
        <Link to="#" className="text-danger delete_icon">
          <i
            className="fas fa-trash-alt mr-3"
            id={`delete-${row._id}-tooltip`}
            onClick={() => handleDeletion(row.id)}
          />
          <UncontrolledTooltip
            placement="top"
            target={`delete-${row._id}-tooltip`}
          >
            {t("delete")}
          </UncontrolledTooltip>
        </Link>
      </>
    ),
  },
  {
    text: t("changeStatus"),
    formatter: (_, row) => (
      <Link to="#" className="text-success add_icon">
        <button
          id={`Change-Status-${row._id}-button`}
          onClick={() => addCustomerModal(row.id, row.status)}
          style={{
            backgroundColor: "#34C38F",
            padding: "5px 7px",
            fontSize: "12px",
            borderRadius: "3px",
            color: "white",
            border: "none",
          }}
        >
          {t("changeStatus")}
        </button>
        <UncontrolledTooltip
          placement="top"
          target={`Change-Status-${row._id}-button`}
        >
          {t("changeStatus")}
        </UncontrolledTooltip>
      </Link>
    ),
  },
];

Columns.defaultProps = {
  toggleConfirm: (evt) => evt.preventDefault(),
};

export default Columns;
