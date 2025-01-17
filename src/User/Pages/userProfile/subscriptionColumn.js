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
  handleSort,
  isUsedAdmin,
  handleViewDetails,
  t,
}) => [
  isUsedAdmin
    ? {
        dataField: "row?.userData?.firstName",
        text: t("name"),
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
          handleSort(order, "productData.title");
        },
        formatter: (_, row) => (
          <p className="mb-0" style={{ textTransform: "capitalize" }}>
            {row?.userData?.firstName} {row?.userData?.lastName}
          </p>
        ),
      }
    : "",
  isUsedAdmin
    ? {
        dataField: "row?.userData?.email",
        text: t("email"),
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
          handleSort(order, "userData?.email");
        },
        formatter: (_, row) => (
          <p className="mb-0" style={{ textTransform: "capitalize" }}>
            {row?.userData?.email}
          </p>
        ),
      }
    : "",
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
  },
  {
    dataField: "price",
    text: t("subscriptionPrice"),
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
      handleSort(order, "price");
    },
  },
  {
    dataField: "type",
    text: t("subscriptionType"),
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
      handleSort(order, "type");
    },
  },
  {
    dataField: "planType",
    text: t("planType"),
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
      handleSort(order, "planType");
    },
    formatter: (_, row) => (
      <p className="mb-0" style={{ textTransform: "capitalize" }}>
        {row?.planType}
      </p>
    ),
  },
  {
    dataField: "address",
    text: t("address"),
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
    formatter: (cell, row) => {
      return (
        <p className="longtext">
          {row.address} {row.city} {row.state} {row.country} {row.pincode}{" "}
        </p>
      );
    },
    onSort: (field, order) => {
      // Call the handleSort function passed from props
      handleSort(order, "address");
    },
  },
  {
    dataField: "createdAt",
    text: t("createdAt"),
    formatter: (_, row) => <>{moment(row.createdAt).format("DD MMM YYYY")}</>,
  },

  {
    isDummyField: true,
    text: t("action"),
    dataField: "action",
    csvExport: false,
    formatter: (_, row) => (
      <>
        <Link
          to="#"
          className="text-secondary delete_icon"
          onClick={(e) => {
            e.preventDefault();
            handleViewDetails(row.subscriptionDetails);
          }}
        >
          <i className="far fa-eye" id={`view2-${row._id}-tooltip`} />
          <UncontrolledTooltip
            placement="top"
            target={`view2-${row._id}-tooltip`}
          >
            {t("viewDetails")}
          </UncontrolledTooltip>
        </Link>
        {row.status!="cancelled"&&<Link>
        <button
          id={`add-variation-${row._id}-button`}
          onClick={() => handleDeletion(row.id)}
          style={{
            backgroundColor: "#34C38F",
            padding: "5px 7px",
            marginLeft: "12px",
            fontSize: "12px",
            borderRadius: "3px",
            color: "white",
            border: "none",
          }}
        >
        {t("cancel")}
        </button>
      </Link>}
      </>
    ),
  },
];

Columns.defaultProps = {
  toggleConfirm: (evt) => evt.preventDefault(),
};

export default Columns;
