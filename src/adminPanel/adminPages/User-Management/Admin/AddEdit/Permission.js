import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Container, Form, FormGroup, Input, Label } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addPermission } from "Store/Users/thunks";
import { useTranslation } from "react-i18next";

function PermissionPopup({ isPermissionPopupOpen, handleCloseModal, userId }) {
  const { sideDashboard } = useSelector((state) => state?.dashboard);
  const {t}=useTranslation()

  const { userData } = useSelector((state) => state?.users);
  const dispatch = useDispatch();

  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [selectedError, setselectedError] = useState(false);

  const handlePermissionSelection = (permissionSlug) => {
    let temporary = [...selectedPermissions];
    if (temporary.includes(permissionSlug)) {
      if (permissionSlug !== "dashboard") {
        temporary = temporary.filter((item) => item !== permissionSlug);
      }
    } else {
      temporary.push(permissionSlug);
    }
    setSelectedPermissions(temporary);
  };

  useEffect(() => {
    if (userId) {
      let temp = userData;
      temp = temp.find((item) => item.id === userId);
      const resultedPermission = temp.permission
        ? JSON.parse(temp.permission)
        : [];

      setSelectedPermissions((prev) => [...prev, ...resultedPermission]);
    }
  }, [userId]);

  const handleSubmit = () => {
    if (userId) {
      if (selectedPermissions.length <= 0) {
        setselectedError(true);
        return;
      }
      const payload = {
        userId,
        permissions: selectedPermissions,
      };
      dispatch(addPermission(payload));
      handleCloseModal();
    }
  };
  const modalStyle = {
    maxWidth: "300px",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };

  const bodyStyle = {
    padding: "10px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "10px",
  };

  const checkboxLabelStyle = {
    fontWeight: "normal",
  };

  return (
    <React.Fragment>
      <Modal
        centered
        show={isPermissionPopupOpen}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        style={modalStyle}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("addPermission")}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={bodyStyle}>
          <Form>
            {sideDashboard.map((item, index) => (
              <>
                {item.slug == "order" || item.slug == "finance" ? (
                  ""
                ) : (
                  <FormGroup check key={index}>
                    <Label check style={labelStyle}>
                      <Input
                        type="checkbox"
                        onChange={() => handlePermissionSelection(item.slug)}
                        checked={
                          selectedPermissions &&
                          selectedPermissions.includes(item.slug)
                        }
                      />
                      <span style={checkboxLabelStyle}>{t(item.name)}</span>
                    </Label>
                  </FormGroup>
                )}
              </>
            ))}
          </Form>
          {selectedError ? (
            <div className="text-danger">{t("selectPermission")}</div>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
          {t("addPermission")}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  );
}

export default PermissionPopup;
