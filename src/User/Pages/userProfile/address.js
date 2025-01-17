import React, { useEffect, useState, useCallback } from "react";

// React Icons
import { RxCross2 } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";

// Components
import EditAddressModal from "User/Components/Auth/editAddressModal";
import { deleteUserAddress, getUsersAddresess } from "Store/Address/thunk";
import { useSelector, useDispatch } from "react-redux";
import nProgress from "nprogress";
import addressNotFound from "assets/images/Address-amico.png";
import * as ACTION from "Store/Address/addresSlice";
import { toast } from "react-toastify";
import ConfirmModal from "adminPanel/adminComponents/ConfirmModal";
import { UncontrolledTooltip } from "reactstrap";
import { useTranslation } from "react-i18next";

const Address = ({}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { allAddresess, success, error, message } = useSelector(
    (state) => state?.userAddress
  );
  const [toggleEditAddress, settoggleEditAddress] = useState(false);
  const [editAddressConfirm, seteditAddressConfirm] = useState({
    id: null,
  });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    id: null,
  });

  useEffect(() => {
    dispatch(getUsersAddresess());
  }, []);

  useEffect(() => {
    if (success) {
      toast.success(message, {
        autoClose: 5000,
      });
      dispatch(getUsersAddresess());
    } else if (error) {
      toast.error(message, {
        autoClose: 5000,
      });
    }
    dispatch(ACTION.reset());
  }, [success, error]);

  const openEditAddressModal = (id) => {
    settoggleEditAddress(true);
    seteditAddressConfirm({ id: id });
  };

  const handleDeleteAddress = async () => {
    const { id, isOpen } = confirmModal;
    nProgress.configure({ showSpinner: false });
    nProgress.start(); // Start the Progress bar
    try {
      await dispatch(deleteUserAddress({ deletedId: id }));
      setConfirmModal({ isOpen: !isOpen, id: null });
      await dispatch(getUsersAddresess());
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      nProgress.done(); // Finish the progress bar
    }
  };

  const toggleConfirm = useCallback((id) => {
    setConfirmModal((prevState) => ({
      isOpen: !prevState.isOpen,
      id,
    }));
  }, []);

  const handleDeletion = (id) => {
    setConfirmModal({ isOpen: true, id });
  };
  

  return (
    <React.Fragment>
      <ConfirmModal
        cancelBtnText={t("cancel")}
        confirmBtnText={t("delete")}
        type="danger"
        title={t("areYouSureDeleteAddress")}
        isOpen={confirmModal.isOpen}
        toggle={toggleConfirm}
        onConfirm={handleDeleteAddress}
      />
      {toggleEditAddress && (
        <EditAddressModal
          toggleEditAddress={toggleEditAddress}
          settoggleEditAddress={settoggleEditAddress}
          editAddressConfirm={editAddressConfirm}
          seteditAddressConfirm={seteditAddressConfirm}
        />
      )}

      <div className="billing-group padding-btm-billing-group">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h4 className="mb-0">{t("address")}</h4>
          <div className="text-right d-flex">
            <button
              className="custombtm"
              onClick={() => settoggleEditAddress(true)}
            >
              {t("addNewAddress")}
            </button>
          </div>
        </div>

        <div
          className="d-flex justify-content-start billing_wrap"
          style={{ gap: "10px" }}
        >
          {allAddresess && allAddresess.length > 0 ? (
            allAddresess.map((CsAddress, idx) => {
              return (
                <ul className="d-flex align-items-start" key={idx}>
                  <div className="user" style={{ width: "83%" }}>
                    <li>
                      <li className="name_textWrap">{CsAddress?.fullName}</li>
                      <li className="adress_styls"> {CsAddress?.address},</li>
                      <li className="state_nme">
                        {" "}
                        {CsAddress?.city}, {CsAddress?.state},
                      </li>
                      <li className="country_pin">
                        {" "}
                        {CsAddress?.country}, {CsAddress?.pincode}
                      </li>
                      <li>
                        {/* <span>
                          <i className="fas fa-phone-alt"></i>
                        </span> */}{" "}
                        {CsAddress?.phoneNumber},{" "}
                        {CsAddress?.alternatePhoneNumber.length > 5
                          ? CsAddress?.alternatePhoneNumber
                          : ""}
                      </li>
                    </li>
                  </div>
                  <div className="d-flex align-items-center">
                    <span
                      className="edit_btnnnn"
                      onClick={() => openEditAddressModal(CsAddress?.id)}
                    >
                      <i
                        className="far fa-edit me-2 cursor-pointer"
                        id={`edit-${CsAddress?.id}-tooltip`}
                      ></i>
                      <UncontrolledTooltip
                        placement="top"
                        target={`edit-${CsAddress?.id}-tooltip`}
                      >
                        {"Edit"}
                      </UncontrolledTooltip>
                    </span>
                    <span onClick={() => handleDeletion(CsAddress?.id)}>
                      <i
                        className="fas fa-trash-alt cursor-pointer"
                        id={`delete-${CsAddress?.id}-tooltip`}
                      ></i>
                      <UncontrolledTooltip
                        placement="top"
                        target={`delete-${CsAddress?.id}-tooltip`}
                      >
                        {"Delete"}
                      </UncontrolledTooltip>
                    </span>
                  </div>
                </ul>
              );
            })
          ) : (
            <div className="text-center d-flex flex-column align-items-center justify-content-center w-100">
              <img
                src={addressNotFound}
                style={{ width: "370px" }}
                className="img-fluid"
              ></img>
              <h3 className="mb-0">{t("noAddress")}</h3>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Address;
