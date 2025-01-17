import React, { useCallback, useEffect, useState } from "react";

// Package Module
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import * as ACTION from "Store/Users/userSlice";

// component
import Breadcrumbs from "adminPanel/adminComponents/Common/Breadcrumb";
import ConfirmModal from "adminPanel/adminComponents/ConfirmModal";
import Table from "adminPanel/adminComponents/Table";
import AddEditCustomer from "../AddEdit/invite";
import Columns from "./Columns";
import PermissionPopup from "../AddEdit/Permission";
import { Pagination } from "react-bootstrap";
import SearchInput from "adminPanel/adminComponents/Common/Searchinput";
import PaginationContainer from "utils/paginationCommon";

// Store
import { deleteUser, getUsers, updateStatus } from "Store/Users/thunks";
import { toast } from "react-toastify";
import { debounce } from "utils/common";
import { useTranslation } from "react-i18next";
import ImagePreview from "adminPanel/adminComponents/Common/ImagePreview";

function AdminList({}) {
  document.title = "Volca | Admin";
  const { t } = useTranslation();
  const { userData, isSuccess, isError, message, pagination } = useSelector(
    (state) => state?.users
  );

  const { admin } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [columns, setcolumns] = useState([{ dataField: "", text: "" }]);
  const [addToggle, setaddToggle] = useState(false);
  const [confirm, setConfirm] = useState({ isOpen: false, id: null });
  const [sorting, setSorting] = useState({ type: "", column: "" });

  const [preview, setPreview] = useState({
    isOpen: false,
    image: "",
  });

  const [userId, setuserId] = useState(null);
  const [isPermissionPopupOpen, setPermissionPopupOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTextValue, setsearchTextValue] = useState("");

  const [filter, setfilter] = useState({
    role: ["admin", "finance"],
    order: -1,
    pgae: 1,
    limit: 10,
    order_by: "createdAt",
    search: "",
    status: "",
  });

  const toggleConfirm = useCallback((customer_id) => {}, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(pagination.totalItems / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };
  const handleSearch = (searchText) => {
    dispatch(
      getUsers({
        role: ["admin", "finance", "business"],
        search: searchText,
        pagination: {
          page: currentPage,
          take: itemsPerPage,
        },
      })
    );
  };

  const handleEnterKeyPress = (searchText) => {
    setsearchTextValue(searchText);
    handleSearch(searchText);
  };
  const handleSort = (order, field) => {
    const newSorting = { type: order, column: field };
    setSorting(newSorting);
    dispatch(
      getUsers({
        role: ["admin", "finance", "business"],
        sort: newSorting,
        pagination: {
          page: currentPage,
          take: itemsPerPage,
        },
      })
    );
  };

  useEffect(() => {
    dispatch(
      getUsers({
        role: ["admin", "finance", "business"],
        sort: sorting,
        pagination: {
          page: currentPage,
          take: itemsPerPage,
        },
      })
    );
  }, [currentPage, itemsPerPage, sorting]);

  useEffect(() => {
    if (userData?.length > 0) {
      setIsSearchVisible(true);
    }
  }, [userData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message, {
        autoClose: 5000,
      });
      dispatch(
        getUsers({
          role: ["admin", "finance", "business"],
          pagination: {
            page: currentPage,
            take: itemsPerPage,
          },
        })
      );
      if (message == "Deleted successfully" && userData?.length <= 0) {
        setIsSearchVisible(false);
      }
    } else if (isError) {
      toast.error(message, {
        autoClose: 5000,
      });
    }
    dispatch(ACTION.changeSuccessStatus());
  }, [isSuccess, isError]);

  const handleDeletion = (id, status) => {
    setConfirm({ isOpen: status, id });
  };

  const handleDeleteUser = async () => {
    const { id } = confirm;
    try {
      await dispatch(deleteUser({ id }));
      handleDeletion(false, null);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const toggleSectionConfirm = useCallback((id) => {
    setConfirm((prevState) => ({
      isOpen: !prevState.isOpen,
      id,
    }));
  }, []);

  const addCustomerModal = () => {
    setaddToggle(true);
  };

  const handleCloseModal = () => {
    setaddToggle(false);
  };

  const handlePermissionPopup = (id) => {
    setuserId(id);
    setPermissionPopupOpen(true);
  };

  const closePermissionPopup = () => {
    setPermissionPopupOpen(false);
  };

  useEffect(() => {
    setcolumns(
      Columns({
        toggleConfirm,
        handlePermissionPopup,
        handleStatusChange,
        admin,
        handleDeletion,
        handleSort,
        setPreview,
        t,
      })
    );
  }, [toggleConfirm, t]);

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const payload = {
        userId: userId,
        status: newStatus,
      };
      await dispatch(updateStatus(payload));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <ConfirmModal
        cancelBtnText="Cancel"
        confirmBtnText="Delete"
        type="danger"
        title={t("areYouSureDelete")}
        isOpen={confirm.isOpen}
        toggle={toggleSectionConfirm}
        onConfirm={handleDeleteUser}
      />
      {addToggle && (
        <AddEditCustomer
          addToggle={addToggle}
          handleCloseModal={handleCloseModal}
          setaddToggle={setaddToggle}
        />
      )}
      <ImagePreview
      isOpen={preview.isOpen}
      image={preview.image}
      setPreview={setPreview}
      isImageTrue={true}
    />
      {isPermissionPopupOpen && (
        <PermissionPopup
          isPermissionPopupOpen={isPermissionPopupOpen}
          handleCloseModal={closePermissionPopup}
          userId={userId}
        />
      )}

      {/* {loading ? <Loader /> : ""} */}

      <div className="page-content">
        <Container fluid>
          <div className="d-flex align-items-center searchboxissue7">
            <Breadcrumbs title={t("adminSystemUsers")} />
            {isSearchVisible && (
              <SearchInput
                onEnterKeyPress={handleEnterKeyPress}
                placeholder="Search Admin"
                searchText={searchTextValue}
              />
            )}
          </div>
          <Table
            newButtonLink={addCustomerModal}
            newButtonText={"+ " + t("invite")}
            data={userData}
            columns={columns || []}
            filter={filter}
            setFilter={setfilter}
            handleStatusChange={handleStatusChange}
          >
            <div className="no_data_found">
              {userData?.length === 0 && (
                <h5 className="text-primary">{t("noDataFound")} </h5>
              )}
            </div>
          </Table>
          {userData?.length > 0 && (
            <PaginationContainer
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              handleItemsPerPageChange={handleItemsPerPageChange}
            />
          )}
        </Container>
      </div>
    </React.Fragment>
  );
}

export default AdminList;
