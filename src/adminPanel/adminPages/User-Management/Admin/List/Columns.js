import React from "react";
import { Link } from "react-router-dom";
import { Badge, Input, Label, UncontrolledTooltip } from "reactstrap";
import moment from "moment-timezone";
import ToggleButton from "adminPanel/adminComponents/Common/ToggelButton";
import Avatar from "assets/images/user-icon.png";

export const selectRow = (props) => ({
  mode: "checkbox",
  clickToSelect: true,
  hideSelectColumn: true,
  selectionHeaderRenderer: ({ indeterminate, mode, ...rest }) => (
    <div className="custom-control custom-checkbox">
      <Input
        type="checkbox"
        classNasme="custom-control-input"
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
  handlePermissionPopup,
  admin,
  handleStatusChange,
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
      <div>
        {row.firstName && (
          <>
            <span id={`view-${row._id}-nametooltip`}>
              {row.firstName} {row.lastName}
            </span>
          </>
        )}
      </div>
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
      handleSort(order, "mobileNumber");
    },
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
  },

  {
    dataField: "createdAt",
    text: t("registeredAt"),
    formatter: (_, row) => moment(row.createdAt).format("DD MMM YYYY"),
  },
  {
    text: t("activeInactive"),
    dataField: "status",
    formatter: (cell, row) => (
      <ToggleButton
        status={cell}
        onStatusChange={(newStatus) => handleStatusChange(row?.id, newStatus)}
      />
    ),
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
          onClick={(e) => {
            e.preventDefault();
            handleDeletion(row?.id, true);
          }}
          className="text-danger delete_icon"
        >
          <i
            className="fas fa-trash-alt mr-3"
            id={`delete-${row?._id}-tooltip`}
          />
          <UncontrolledTooltip
            placement="top"
            target={`delete-${row?._id}-tooltip`}
          >
            {t("delete")}
          </UncontrolledTooltip>
        </Link>
      </>
    ),
  },

  admin && admin?.id == 1
    ? {
        text: t("permission"),
        formatter: (_, row) => (
          <>
            {row?.role == "finance" || row?.role == "business" ? (
              ""
            ) : (
              <Link to="#" className="mr-3 text-success add_icon">
                <button
                  id={`add-permissions-${row?._id}-button`}
                  onClick={() => handlePermissionPopup(row?.id)}
                  style={{
                    backgroundColor: "#34C38F",
                    padding: "5px 7px",
                    fontSize: "12px",
                    borderRadius: "3px",
                    color: "white",
                    border: "none",
                  }}
                >
                  Add Permission
                </button>
                <UncontrolledTooltip
                  placement="top"
                  target={`add-permissions-${row?._id}-button`}
                >
                  {"Add Permissions"}
                </UncontrolledTooltip>
              </Link>
            )}
          </>
        ),
      }
    : "",
];

Columns.defaultProps = {
  toggleConfirm: (evt) => evt.preventDefault(),
};

export default Columns;
