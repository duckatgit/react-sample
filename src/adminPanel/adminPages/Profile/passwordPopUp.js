import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ChangePassword from "User/Pages/userProfile/changePassword";

function PasswordPopUp({ isOpen, closePopUp }) {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Modal
        centered
        show={isOpen}
        onHide={closePopUp}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("changePassword")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="cp">
          <ChangePassword closePopUp={closePopUp} />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default PasswordPopUp;
