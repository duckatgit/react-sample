import React, { useCallback, useEffect, useState } from "react";

// Package Module
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// component
import Breadcrumbs from "adminPanel/adminComponents/Common/Breadcrumb";
import Table from "adminPanel/adminComponents/Table";
import AddEditCustomer from "../AddEdit";
import Columns from "./Columns";
import ConfirmModal from "adminPanel/adminComponents/ConfirmModal";

import { deleteUser, getUsers, updateStatus } from "Store/Users/thunks";
import * as ACTION from "Store/Users/userSlice";
import { Pagination } from "react-bootstrap";
import SearchInput from "adminPanel/adminComponents/Common/Searchinput";
import { debounce } from "utils/common";
import PaginationContainer from "utils/paginationCommon";
import { useTranslation } from "react-i18next";
import ImagePreview from "adminPanel/adminComponents/Common/ImagePreview";

function CustomerList({ props }) {
  document.title = "Volca | Admin";
  const { t } = useTranslation();
  const { userData, isError, isSuccess, message, pagination } = useSelector(
    (state) => state?.users
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [preview, setPreview] = useState({
    isOpen: false,
    image: "",
  });


  const [columns, setcolumns] = useState([{ dataField: "", text: "" }]);
  const [confirm, setConfirm] = useState({ isOpen: false, id: null });
  const [sorting, setSorting] = useState({
    type: "",
    column: "",
  });
  const [filter, setfilter] = useState({
    role: ["user"],
    pagination: {
      page: currentPage,
      take: itemsPerPage,
    },
    sort: sorting,
  });
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTextValue, setsearchTextValue] = useState("");

  const toggleConfirm = useCallback((customer_id) => {}, []);

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
        role: ["user"],
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
        role: ["user"],
        sort: newSorting,
        pagination: {
          page: currentPage,
          take: itemsPerPage,
        },
      })
    );
  };


  useEffect(() => {
    setcolumns(
      Columns({
        toggleConfirm,
        handleStatusChange,
        handleViewDetails,
        handleDeletion,
        setPreview,
        handleSort,
        t,
      })
    );
  }, [toggleConfirm, t]);

  useEffect(() => {
    if (filter) {
      dispatch(getUsers(filter));
    }
  }, [filter]);

  useEffect(() => {
    if (userData?.length > 0) {
      setIsSearchVisible(true);
    }
  }, [userData]);

  const [addToggle, setaddToggle] = useState(false);

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

  const handleViewDetails = (id) => {
    const stringId = String(id);
    const userId = btoa(stringId);
    navigate(`/admin/user-management/user/${userId}`);
  };

  useEffect(() => {
    // Update pagination parameters in the filter state
    setfilter((prevFilter) => ({
      ...prevFilter,
      sort: sorting,
      pagination: {
        page: currentPage,
        take: itemsPerPage,
      },
    }));
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message, {
        autoClose: 5000,
      });
      dispatch(
        getUsers({
          role: ["user"],
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

      <ImagePreview
      isOpen={preview.isOpen}
      image={preview.image}
      setPreview={setPreview}
      isImageTrue={true}
    />

      {addToggle && (
        <AddEditCustomer
          addToggle={addToggle}
          handleCloseModal={handleCloseModal}
          setaddToggle={setaddToggle}
        />
      )}

      {/* {loading ? <Loader /> : ""} */}

      <div className="page-content">
        <Container fluid>
          <div className="d-flex align-items-center searchboxissue">
            <Breadcrumbs title={t("customers")} />
            {isSearchVisible && (
              <SearchInput
                onEnterKeyPress={handleEnterKeyPress}
                placeholder={t("searchCustomer")}
                searchText={searchTextValue}
              />
            )}
          </div>
          <Table
            data={userData}
            columns={columns || []}
            filter={filter}
            setFilter={setfilter}
          >
            <div className="no_data_found">
              {userData.length === 0 && (
                <h5 className="text-primary">No Data Found!!</h5>
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

export default CustomerList;
