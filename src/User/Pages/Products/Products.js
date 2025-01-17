import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  addWishlistItem,
  getWishlist,
  removeWishlist,
} from "Store/Wishlist/thunk";
import { toast } from "react-toastify";
import * as ACTION from "Store/Wishlist/wishlistSlice";
import nProgress from "nprogress";
import { Form, Input } from "reactstrap";
import { validate } from "utils/common";
import { getVariations } from "Store/Product/thunks";

import HeartImage from "assets/images/heart.png";
import FilledHeart from "assets/images/fill-heart.png";
import BackgroundImage from "assets/images/bottlebanner.png"
import Currency from "utils/currency";
import { Rating } from "react-simple-star-rating";
import { useTranslation } from "react-i18next";

const OurProduct = ({
  subProductList,
  onAddToCart,
  getId,
  cartList,
  isSearchVisible,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [fields, setFields] = useState({
    searchInput: "",
  });

  let wishlistItemId;
  const { wishList, message, isSuccess, isError } = useSelector(
    (state) => state?.wishList
  );
  let wishListId = localStorage?.getItem("wishListId");
  if (wishListId) {
    wishListId = JSON.parse(wishListId);
  }

  const handleAddItem = (id, price) => {
    const alreadyInCart = cartList?.find((item) => item.subProductId == id);
    if (alreadyInCart) {
      navigate("/cart-item");
    } else {
      onAddToCart(id, price);
    }
  };

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setFields((prev) => ({ ...prev, [name + "Error"]: false, [name]: value }));
  };
  const handleKeyPress = (evt) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      handleSearch(evt);
    }
  };

  const handleWishlist = (subProductId) => {
    try {
      nProgress.configure({ showSpinner: false });
      nProgress.start();
      let payload = {};
      if (inWishList(subProductId, true)) {
        payload.wishlistItemId = wishlistItemId;
        dispatch(removeWishlist(payload));
        wishlistItemId = "";
      } else {
        payload.subProductId = subProductId;
        if (wishListId) {
          payload.wishlistId = wishListId?.wishlistId;
        }
        dispatch(addWishlistItem(payload));
      }
    } catch (error) {
      console.log(error);
    } finally {
      nProgress.done();
    }
  };

  const handleSearch = (evt) => {
    evt.preventDefault();
    const response = validate(fields);
    if (!response.notValid) {
      dispatch(
        getVariations({
          productId: 1,
          search: fields.searchInput,
          user: true,
        })
      );
      // Reset searchError when a valid search is performed
      setFields((prev) => ({ ...prev, searchError: false }));
    } else {
      setFields((prev) => ({ ...prev, ...response, searchError: true }));
    }
  };

  const handleClearSearch = (evt) => {
    setFields((prev) => ({ ...prev, searchInput: "", searchError: false }));
    dispatch(
      getVariations({
        productId: 1,
        search: "",
        user: true,
      })
    );
  };

  const inWishList = (subProductId, status) => {
    const result = wishList.find((item) => item.subProductId == subProductId);

    if (result) {
      if (status) {
        wishlistItemId = result.id;
      }
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(getWishlist({ wishlistId: wishListId?.wishlistId }));
    } else if (isError) {
      toast.error(message, {
        autoClose: 5000,
      });
    }
    dispatch(ACTION.changeSuccessStatus());
  }, [isError, isSuccess]);

  useEffect(() => {
    dispatch(getWishlist({ wishlistId: wishListId?.wishlistId }));
  }, []);

  const { search, searchError } = fields;

  useEffect(() => {
    if (searchError == true) {
      dispatch(
        getVariations({
          productId: 1,
          search: fields.search,
        })
      );
    }
  }, [searchError]);

  return (
    <React.Fragment>
      <section className="Product-banner"
      style={{
        backgroundImage: `url(${BackgroundImage})`, 
        backgroundSize: 'cover',
        width: '100%',
        height: '607px',
        margin: '70px 0 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 className="text-center">
          {t("trustedName")} <br />
          {t("waterInd")}
        </h1>
      </section>
      <section className="our-products">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between ourproductswrap">
            <div className="products">
              <h1 className="text-center mb-0"> {t("product")} </h1>
              {/* <img src={LineImage} alt="" className="img-fluid" /> */}
            </div>
            {isSearchVisible && (
              <div className="search srch_new_deign">
                <Form>
                  <Input
                    placeholder={t("searchProName")}
                    name="searchInput" // Change input name to searchInput
                    className={`form-control ${
                      fields.searchError ? "is-invalid" : ""
                    }`}
                    type="text"
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    value={fields.searchInput} // Update reference to searchInput
                  />
                  {fields.searchInput && (
                    <a onClick={(evt) => handleClearSearch(evt)}>
                      <i className="fa fa-times mr-2"></i>
                    </a>
                  )}
                  {!fields.searchInput && (
                    <a onClick={(evt) => handleSearch(evt)}>
                      <i className="fa fa-search mr-2"></i>
                    </a>
                  )}
                  {fields.searchError && (
                    <div className="search-invalid-feedback">
                      {t("searchEmptyPro")}
                    </div>
                  )}
                </Form>
              </div>
            )}
          </div>
          <div className="row water">
            <div className="container water_bottlecontainer">
              <div className="row">
                {subProductList?.length > 0 ? (
                  <>
                    {subProductList?.map((product, idx) => {
                      return (
                        <div
                          key={idx}
                          className="col-lg-4 col-md-6 product-images py-3 px-2"
                        >
                          <div className="box">
                            {product?.isDiscounted ? (
                              <span className="off">
                                {product.discountedValue}
                                {product.discountType === "percentage" ? (
                                  "% "
                                ) : (
                                  <Currency />
                                )}
                                {t("off")}
                              </span>
                            ) : null}
                            <div className="product_imge">
                              <img
                                onClick={() => handleWishlist(product?.id)}
                                src={
                                  inWishList(product?.id)
                                    ? FilledHeart
                                    : HeartImage
                                }
                                alt=""
                                className="heart img-fluid"
                              />
                            </div>
                            <div className="product-center text-center">
                              <div className="link_about mt-2">
                                <Link
                                  to={`/product-detail?id=${product?.id}`}
                                  className=""
                                >
                                  <img
                                    src={product?.coverImage}
                                    alt=""
                                    className="setbottleheight img-fluid w-100"
                                  />
                                </Link>
                              </div>
                              {/* <div className="quantity">
                                <span>{`${product?.subUnitData?.subUnitValue}`}</span>
                              </div> */}
                              <p className="first">{product?.title} </p>
                              <div className="dolar dolar_icons d-flex align-items-center justify-content-center flex-column">
                                {product?.isDiscounted ? (
                                  <sup className="under-line">
                                    {" "}
                                    {`${product?.price}`}
                                    <Currency />{" "}
                                  </sup>
                                ) : null}
                                <div className="dolar-price">
                                  <span>{`${
                                    product?.isDiscounted
                                      ? product?.discountedPrice
                                      : product?.price
                                  }`}</span>
                                  <Currency />
                                </div>
                              </div>
                              <div className=" d-flex align-items-center justify-content-center">
                                <Rating
                                  initialValue={
                                    product.rating ? product.rating : 0
                                  }
                                  readonly
                                  size={25}
                                />
                              </div>
                              <div className="contact">
                                <div className="clip">
                                  <div className="round"> </div>
                                  <a
                                    onClick={() =>
                                      handleAddItem(
                                        product?.id,
                                        product.isDiscounted
                                          ? product.discountedPrice
                                          : product?.price
                                      )
                                    }
                                  >
                                    <i className="fas fa-shopping-cart"></i>
                                    {t("addToCart")}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="mt-5">
                    <h3 className="text-center"> {t("noProductFound")}</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default OurProduct;
