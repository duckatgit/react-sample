import React from "react";
import { Link } from "react-router-dom";
import { Badge, Input, Label, UncontrolledTooltip } from "reactstrap";
import moment from "moment-timezone";
import ToggleButton from "adminPanel/adminComponents/Common/ToggelButton";
import Avatar from "assets/images/user-icon.png"

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
  toggleConfirm,
  handleStatusChange,
  handleViewDetails,
  handleDeletion,
  handleSort,
  setPreview,
  t,
}) => [
  {
    dataField: "image",
    text: t("image"),
    formatter: (_, row) => (
      <Link to="#">
        <img
          onClick={() => {
            setPreview({ image: row?.profileImage||Avatar, isOpen: true });
          }}
          src={row?.profileImage||Avatar}
          alt="profile Image"
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
    dataField: "firstName",
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
      handleSort(order, "firstName");
    },
    formatter: (_, row) => (
      <span>
        {row.firstName} {row.lastName}
      </span>
    ),
  },
  {
    dataField: "email",
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
      handleSort(order, "email");
    },
  },
  {
    dataField: "mobileNumber",
    text: t("mobileNumber"),
  },
  {
    dataField: "role",
    text: t("role"),
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
      handleSort(order, "role");
    },
    formatter: (cell, row) => (
      <span>{cell.charAt(0).toUpperCase() + cell.slice(1)}</span>
    ),
  },

  {
    text: t("status"),
    dataField: "status",
    formatter: (cell, row) => (
      <ToggleButton
        status={cell}
        onStatusChange={(newStatus) => handleStatusChange(row?.id, newStatus)}
      />
    ),
  },
  {
    dataField: "createdAt",
    text: t("registeredAt"),
    formatter: (_, row) => moment(row.createdAt).format("DD MMM YYYY"),
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
            handleViewDetails(row?.id);
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

        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            handleDeletion(row?.id, true);
          }}
          className="text-danger delete_icon"
        >
          <i
            className="fas fa-trash-alt mr-3"
            id={`delete-${row._id}-tooltip`}
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
];

Columns.defaultProps = {
  toggleConfirm: (evt) => evt.preventDefault(),
};

export default Columns;
