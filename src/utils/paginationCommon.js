import React from "react";
import { Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function paginationContainer({
  currentPage,
  totalPages,
  handlePageChange,
  itemsPerPage,
  handleItemsPerPageChange,
  isShowItem,
}) {
  const { t } = useTranslation();

  return (
    <div className="pagination-container">
      <Pagination className="d-flex justify-content-between align-items-center">
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={currentPage !== 1 ? "customHover" : ""}
        >
          {t("previous")}
        </Pagination.Prev>
        <div className="d-flex flex-row">
          {isShowItem && (
            <div className="page-info">
              {t("page")} {currentPage} {t("of")} {totalPages} {t("pages")}
            </div>
          )}
          <div style={{ marginLeft: "1rem" }}>
            <span>{t("itemsPerPage")}</span>
            <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={currentPage !== totalPages ? "customHover" : ""}
        >
          {t("next")}
        </Pagination.Next>
      </Pagination>
    </div>
  );
}

export default paginationContainer;
