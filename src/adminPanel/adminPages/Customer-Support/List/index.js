import React, { useCallback, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

// Package Module
import { Container } from "reactstrap";
import StatusModel from "../StatusModel/index";
// component
import Breadcrumbs from "adminPanel/adminComponents/Common/Breadcrumb";
import ConfirmModal from "adminPanel/adminComponents/ConfirmModal";
import Table from "adminPanel/adminComponents/Table";
import Columns from "./Columns";
import { toast } from "react-toastify";
import { getIssue, deleteIssue } from "Store/Customer-Support/thunks";
import * as ACTION from "Store/Product/productSlice";
import StatusPopup from "../StatusModel/index";
import ViewTicketModal from "User/Components/editSettingModals/viewTicketModal";
import SearchInput from "adminPanel/adminComponents/Common/Searchinput";
import { debounce } from "utils/common";
import PaginationContainer from "utils/paginationCommon";
import ImagePreview from "adminPanel/adminComponents/Common/ImagePreview";
import { useTranslation } from "react-i18next";

function IssueLists({}) {
  document.title = "Volca | Admin";
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { issueList, isError, isSuccess, pagination } = useSelector(
    (state) => state?.issue
  );
  // const { _id } = useParams();
  const successVariation = useSelector((state) => state?.subproduct?.isSuccess);

  const [addToggle, setaddToggle] = useState(false);
  const [editId, setEditId] = useState("");
  const [columns, setcolumns] = useState([{ dataField: "", text: "" }]);
  const [status, setStatus] = useState("");
  const [sorting, setSorting] = useState({ type: "", column: "" });
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTextValue, setsearchTextValue] = useState("");
  const [preview, setPreview] = useState({
    isOpen: false,
    image: "",
  });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    id: null,
  });

  const [msgStatus, setMsgStatus] = useState({
    success: "Product successfully added",
    error: "Error occured",
  });
  const [selected, setSelected] = useState({});
  const [toggleView, setToggleView] = useState(false);
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

  const totalPages = Math.ceil(pagination?.totalItems / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
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

  const addCustomerModal = (id, status) => {
    setEditId(id);
    setaddToggle(true);
    setStatus(status);
  };

  const handleSearch = (searchText) => {
    dispatch(
      getIssue({
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
      getIssue({
        sort: newSorting,
        pagination: {
          page: currentPage,
          take: itemsPerPage,
        },
      })
    );
  };

  const handleCloseModal = (msg) => {
    setaddToggle(false);
    setMsgStatus({
      ...msgStatus,
      success: msg,
    });
  };

  useEffect(() => {
    if (issueList?.length > 0) {
      setIsSearchVisible(true);
    }
  }, [issueList]);
  useEffect(() => {
    if (isSuccess) {
      toast.success(msgStatus.success, {
        autoClose: 5000,
      });
      dispatch(
        getIssue({
          pagination: {
            page: currentPage,
            take: itemsPerPage,
          },
        })
      );
    } else if (isError) {
      toast.error(msgStatus.error, {
        autoClose: 5000,
      });
    }
    dispatch(ACTION.changeSuccessStatus());
  }, [isSuccess, isError, successVariation]);

  useEffect(() => {
    dispatch(
      getIssue({
        sort: sorting,
        pagination: {
          page: currentPage,
          take: itemsPerPage,
        },
      })
    );
  }, [currentPage, itemsPerPage]);

  const handleViewSection = (item) => {
    setToggleView(true);
    setSelected(item);
  };

  const handleConfirm = async (evt) => {
    evt.preventDefault();
    const { id, isOpen } = confirmModal;

    try {
      setMsgStatus({
        ...msgStatus,
        success: "Issue deleted successfully",
      });
      await dispatch(deleteIssue({ id: id }));
      setConfirmModal({ isOpen: !isOpen, id: null });
    } catch (error) {
      toast.error(error, {
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    setcolumns(
      Columns({
        toggleConfirm,
        handleDeletion,
        addCustomerModal,
        handleViewSection,
        handleSort,
        setPreview,
        t,
      })
    );
  }, [toggleConfirm, t]);

  return (
    <React.Fragment>
      <ConfirmModal
        cancelBtnText="Cancel"
        confirmBtnText="Delete"
        type="danger"
        title={t("areYouSureDelete")}
        isOpen={confirmModal.isOpen}
        toggle={toggleConfirm}
        onConfirm={handleConfirm}
      />

      <ImagePreview
        isOpen={preview.isOpen}
        image={preview.image}
        setPreview={setPreview}
        isImageTrue={true}
      />

      <StatusPopup
        addToggle={addToggle}
        handleCloseModal={handleCloseModal}
        editId={editId}
        editStatus={status}
      />

      {toggleView && (
        <ViewTicketModal
          selectedList={selected}
          toggleView={toggleView}
          settoggleView={setToggleView}
          t={t}
        />
      )}

      <div className="page-content">
        <Container fluid>
          <div className="d-flex align-items-center searchboxissue">
            <Breadcrumbs title={t("customerSupport")} />
            {isSearchVisible && (
              <SearchInput
                onEnterKeyPress={handleEnterKeyPress}
                placeholder={t("searchTicket")}
                searchText={searchTextValue}
              />
            )}
          </div>
          <Table
            data={issueList?.length > 0 ? issueList : []}
            columns={columns || []}
            filter={filter}
            setFilter={setfilter}
          >
            <div className="no_data_found">
              {typeof issueList === "undefined" ||
              issueList === null ||
              (Array.isArray(issueList) && issueList.length === 0) ? (
                <h5 className="text-primary">{t("noDataFound")}</h5>
              ) : null}
            </div>
          </Table>
          {issueList?.length > 0 && (
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

export default IssueLists;
