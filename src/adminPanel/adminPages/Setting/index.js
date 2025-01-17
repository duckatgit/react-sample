import { Breadcrumbs } from "@material-ui/core";
import { getAllSetting } from "Store/Settings/thunks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, Container, Media, Row } from "reactstrap";
import EditPopUp from "./editPopup";

import Delivery1 from "assets/images/fee1.png";
import Currency from "utils/currency";
import { useTranslation } from "react-i18next";

const Setting = (props) => {
  const { t } = useTranslation();
  //meta title
  const [addToggle, setAddToggle] = useState({
    isOpen: false,
    id: "",
  });
  const { settingList } = useSelector((state) => state?.Settings);
  document.title = "Volca | Admin";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSetting());
  }, []);

  const handleToggle = (status, id) => {
    setAddToggle({
      isOpen: status,
      id,
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <EditPopUp
          addToggle={addToggle.isOpen}
          handleCloseModal={handleToggle}
          editId={addToggle.id}
          currentAmount={settingList[0]?.amount}
        ></EditPopUp>
        <Container fluid>
          <Breadcrumbs title={t("settings")} />
          <div className="settings-group d-flex align-items-start justify-content-between">
            <div className="text-right d-flex align-items-center">
              {settingList?.map((item, index) => (
                <div key={index} className="card p-3">
                  <div className="group d-flex justify-content-between align-items-center">
                    {/* <div className="first">
                      <p className="m-0">
                        {item.name}
                      </p>
                      <span>{item.amount}</span>
                    </div>
                    <div>
                      <img src={Fee} alt="" width="25" className="img-fluid"/>
                    </div> */}
                    <div className="delivery-group d-flex align-items-center">
                      <div className="icon-group">
                        <img
                          src={Delivery1}
                          alt=""
                          width="25"
                          className="img-fluid"
                        />
                      </div>
                      <div className="delivery-heading-group">
                        <p className="mb-0">{item.name}</p>
                        <span>
                          {item.amount}
                          <Currency />
                        </span>
                      </div>
                    </div>
                    <div className="btn-group">
                      <button
                        className="custombtm"
                        onClick={() => handleToggle(true, settingList[0]?.id)}
                      >
                        {t("updateAmount")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <button
              className="custombtm"
              onClick={() => handleToggle(true, settingList[0]?.id)}
            >
              Update amount
            </button> */}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Setting;
