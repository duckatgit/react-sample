import React, { useState } from "react";

import { Button, Container, Row } from "reactstrap";
import Profile from "User/Pages/userProfile/profile";
import PasswordPopUp from "./passwordPopUp";
import { useTranslation } from "react-i18next";

export default function AdminProfile() {
  const { t } = useTranslation();
  const [isChangePopUp, setIsChangePopUp] = useState(false);

  const closePopUp = () => {
    setIsChangePopUp(false);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <PasswordPopUp isOpen={isChangePopUp} closePopUp={closePopUp} />
          <div className="text-end mb-2">
            <Button
              className="btn_theme"
              onClick={() => {
                setIsChangePopUp(true);
              }}
            >
              {t("changePassword")}
            </Button>
          </div>
          <Profile />
        </Container>
      </div>
    </React.Fragment>
  );
}
