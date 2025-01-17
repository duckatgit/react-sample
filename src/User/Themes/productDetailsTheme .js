import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components
import Header from "User/Components/Header";
import Footer from "User/Components/Footer";
import MineralWater from "User/Pages/Products/MineralWater";
import Descriptions from "User/Pages/Products/Descriptions";
import RatingReview from "User/Pages/Products/RatingReview"; // Import the Rating component

// Store
import { getSubProductByid } from "Store/Product/thunks";
import { useTranslation } from "react-i18next";

const ProductDetailsTheme = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const query = new URLSearchParams(location.search);
  const _id = query.get("id");

  const { getsubProductById } = useSelector((state) => state?.product);

  const dispatch = useDispatch();
  useEffect(() => {
    if (_id) {
      dispatch(getSubProductByid({ id: _id }));
    }
  }, [_id]);

  const [activeTab, setActiveTab] = useState("description");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <Header />
      <MineralWater getsubProductById={getsubProductById} />
      <div className="container">
        <div className="tabset tabs_descriptionwrap">
          <input
            type="radio"
            name="tabset"
            id="tab1"
            aria-controls="desc"
            checked={activeTab === "description"}
            onChange={() => handleTabChange("description")}
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
          />
          <label
            htmlFor="tab1"
            className={`active ${
              activeTab === "description" ? "active-tab" : ""
            }`}
            style={{
              borderBottom:
                activeTab === "description" ? "4px solid #090909" : "none",
            }}
          >
            {t("description")}
          </label>
          <input
            type="radio"
            name="tabset"
            id="tab2"
            aria-controls="rating"
            checked={activeTab === "rating"}
            onChange={() => handleTabChange("rating")}
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
          />
          <label
            htmlFor="tab2"
            className={`active ${activeTab === "rating" ? "active-tab" : ""}`}
            style={{
              borderBottom:
                activeTab === "rating" ? "4px solid #090909" : "none",
            }}
          >
            {t("ratingReview")}
          </label>

          {activeTab === "description" && (
            <Descriptions description={getsubProductById?.description} />
          )}
          {activeTab === "rating" && (
            <RatingReview
              rating={getsubProductById?.rating}
              subproductId={_id}
            />
          )}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ProductDetailsTheme;
