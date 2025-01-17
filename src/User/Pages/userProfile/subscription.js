import React, { useState, useEffect, useCallback } from "react";
import { Container, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import nProgress from "nprogress";
import Table from "adminPanel/adminComponents/Table";
import * as ACTION from "Store/Subscription/subscriptionSlice";
import {
  cancelSubscription,
  cancelSubscriptionByAdmin,
  deleteSubscription,
  deleteSubscriptionByAdmin,
  getAllSubscription,
  getSubscription,
} from "Store/Subscription/thunks";
import AddSubscription from "User/Components/Auth/SubscriptionModal";
import Columns from "./subscriptionColumn";
import ConfirmModal from "adminPanel/adminComponents/ConfirmModal";
import { getProducts } from "Store/Product/thunks";
import { Pagination } from "react-bootstrap";
import SearchInput from "adminPanel/adminComponents/Common/Searchinput";
import BreadCrumbs from "adminPanel/adminComponents/Common/Breadcrumb";
import { debounce } from "utils/common";
import PaginationContainer from "utils/paginationCommon";
import ViewPopupSubscription from "./viewPopupSubscription";
import { useTranslation } from "react-i18next";
const Subscription = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { userSubscriptionList, isError, isSuccess, message, pagination } =
    useSelector((state) => state?.subscription);
  const [addToggle, setaddToggle] = useState(false);
  const [isUsedAdmin, setIsUsedAdmin] = useState(
    window?.location?.href?.includes("setting") ? false : true
  );
  const [sorting, setSorting] = useState({
    type: "",
    column: "",
  });
  const [view, setView] = useState({
    isOpen: false,
    list: [],
  });

  const [columns, setcolumns] = useState([{ dataField: "", text: "" }]);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    id: null,
  });
  const [filter, setfilter] = useState({
    order: -1,
    page: 1,
    limit: 10,
    order_by: "createdAt",
    search: "",
    status: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTextValue, setsearchTextValue] = useState("");

  const totalPages = Math.ceil(pagination.totalItems / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };
  const handleSearch = (searchText) => {
    const actionToDispatch = isUsedAdmin
      ? getAllSubscription({
          search: searchText,
          pagination: {
            page: currentPage,
            take: itemsPerPage,
          },
        })
      : getSubscription({
          search: searchText,
          pagination: {
            page: currentPage,
            take: itemsPerPage,
          },
        });

    dispatch(actionToDispatch);
  };

  const handleEnterKeyPress = (searchText) => {
    setsearchTextValue(searchText);
    handleSearch(searchText);
  };

  const handleSort = (order, field) => {
    const newSorting = { type: order, column: field };
    setSorting(newSorting);
    if (isUsedAdmin) {
      dispatch(
        getAllSubscription({
          sort: newSorting,
          pagination: {
            page: currentPage,
            take: itemsPerPage,
          },
        })
      );
    } else {
      dispatch(
        getSubscription({
          sort: newSorting,
          pagination: {
            page: currentPage,
            take: itemsPerPage,
          },
        })
      );
    }
  };

  const handleDeletion = (id) => {
    setConfirmModal({ isOpen: true, id });
  };
  const toggleConfirm = useCallback((id) => {
    setConfirmModal((prevState) => ({
      isOpen: !prevState.isOpen,
      id,
    }));
  }, []);

  const handleAddSubscription = () => {
    setSubscriptionPopupOpen(true);
  };

  const handleViewDetails = (data) => {
    setView({
      isOpen: true,
      list: data,
    });
  };

  useEffect(() => {
    if (isUsedAdmin) {
      dispatch(
        getAllSubscription({
          sort: sorting,
          pagination: {
            page: currentPage,
            take: itemsPerPage,
          },
        })
      );
      dispatch(getProducts());
    } else {
      dispatch(
        getSubscription({
          sort: sorting,
          pagination: {
            page: currentPage,
            take: itemsPerPage,
          },
        })
      );
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (userSubscriptionList?.length > 0) {
      setIsSearchVisible(true);
    }
  }, [userSubscriptionList]);

  useEffect(() => {
    setcolumns(
      Columns({
        toggleConfirm,
        handleSort,
        handleDeletion,
        handleAddSubscription,
        isUsedAdmin,
        handleViewDetails,
        t,
      })
    );
  }, [toggleConfirm, t]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message, {
        autoClose: 5000,
      });
      if (isUsedAdmin) {
        dispatch(
          getAllSubscription({
            pagination: {
              page: currentPage,
              take: itemsPerPage,
            },
          })
        );
      } else {
        dispatch(
          getSubscription({
            pagination: {
              page: currentPage,
              take: itemsPerPage,
            },
          })
        );
      }

      if (
        message == "Subscription deleted successfully" &&
        userSubscriptionList?.length <= 0
      ) {
        setIsSearchVisible(false);
      }
    } else if (isError) {
      toast.error(message, {
        autoClose: 5000,
      });
    }
    dispatch(ACTION.changeSuccessStatus());
  }, [isSuccess, isError]);

  const addCustomerModal = () => {
    setaddToggle(true);
  };

  const handleCloseModal = () => {
    setaddToggle(false);
  };
  const handleCloseModals = (msg) => {
    setView({
      isOpen: false,
      list: [],
    });
  };

  const handleConfirm = async (evt) => {
    evt.preventDefault();
    const { id, isOpen } = confirmModal;

    try {
      nProgress.configure({ showSpinner: false });
      nProgress.start();
      if (isUsedAdmin) {
        await dispatch(cancelSubscriptionByAdmin({ id }));
      } else {
        await dispatch(cancelSubscription({ id }));
      }
      setConfirmModal({ isOpen: !isOpen, id: null });
    } catch (error) {
      console.log(error);
    } finally {
      nProgress.done();
    }
  };

  return (
    <React.Fragment>
      <ConfirmModal
        cancelBtnText={t("no")}
        confirmBtnText={t("yes")}
        type="danger"
        title="Are you sure want to cancel the subscription?"
        isOpen={confirmModal.isOpen}
        toggle={toggleConfirm}
        onConfirm={handleConfirm}
      />
      {addToggle && (
        <AddSubscription
          addToggle={addToggle}
          isUsedAdmin={isUsedAdmin}
          handleCloseModal={handleCloseModal}
        />
      )}

      <div style={{ minHeight: "400px" }}>
        <Container fluid>
          <div className="d-flex align-items-center searchBox issue10">
            <BreadCrumbs title={t("subscriptions")} />
            {isSearchVisible && (
              <SearchInput
                onEnterKeyPress={handleEnterKeyPress}
                placeholder={t("searchSubscription")}
                searchText={searchTextValue}
              />
            )}
          </div>
          <Table
            newButtonLink={addCustomerModal}
            newButtonText={t("addNewSubscription")}
            data={userSubscriptionList ? userSubscriptionList : []}
            columns={columns || []}
            filter={filter}
            setFilter={setfilter}
          >
            <div className="no_data_found">
              {typeof userSubscriptionList === "undefined" ||
              userSubscriptionList === null ||
              (Array.isArray(userSubscriptionList) &&
                userSubscriptionList.length === 0) ? (
                <h5 className="text-primary"> {t("noDataFound")}</h5>
              ) : null}
            </div>
          </Table>
          {userSubscriptionList?.length > 0 && (
            <PaginationContainer
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              handleItemsPerPageChange={handleItemsPerPageChange}
            />
          )}
          {view.isOpen && (
            <ViewPopupSubscription
              addToggle={view.isOpen}
              handleCloseModal={handleCloseModals}
              list={view.list}
              editId={""}
            />
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Subscription;
