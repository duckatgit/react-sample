import React, { useCallback, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Table from "adminPanel/adminComponents/Table";
import Columnsview from "./viewColumnsSubscription";
import { useTranslation } from "react-i18next";

function ViewPopupSubscription({ addToggle, handleCloseModal, list }) {
  const { t } = useTranslation();
  const [columns, setcolumns] = useState([{ dataField: "", text: "" }]);

  const [filter, setfilter] = useState({
    order: -1,
    page: null,
    limit: null,
    order_by: "created_at",
    search: "",
    status: "",
  });

  const handleClose = () => {
    handleCloseModal();
  };
  useEffect(() => {
    setcolumns(Columnsview({ t }));
  }, [list, t]);

  return (
    <React.Fragment>
      <Modal
        centered
        show={addToggle}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("detail")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table
            data={list ? list : []}
            columns={columns || []}
            filter={filter}
            setFilter={setfilter}
          >
            <div className="no_data_found">
              {!list ||
                (list.length === 0 && (
                  <h5 className="text-primary"> {t("noDataFound")}</h5>
                ))}
            </div>
          </Table>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default ViewPopupSubscription;
