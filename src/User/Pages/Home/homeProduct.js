import React, { useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import nProgress from "nprogress";
import { Rating } from "react-simple-star-rating";
import {
  addWishlistItem,
  getWishlist,
  removeWishlist,
} from "Store/Wishlist/thunk";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Images
import productImage from "assets/images/bottle4.png";
import HeartImage from "assets/images/heart.png";
import FilledHeart from "assets/images/fill-heart.png";
import LineImage from "assets/images/lines.png";
import { BiEdit } from "react-icons/bi";
import Currency from "utils/currency";

import { getAllSubProducts } from "Store/Product/thunks";
import { addToCart, getCartListItems } from "Store/Carts/thunks";
import * as ACTION from "Store/Carts/cartSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const breakpoints = {
  // when window width is >= 320px
  320: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  // when window width is >= 575px
  575: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  // when window width is >= 768px
  768: {
    slidesPerView: 3,
    spaceBetween: 15,
  },
};

const HomeProduct = ({ productSection, edithomeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  let wishlistItemId;
  const { cartList, isError, message } = useSelector((state) => state?.Cart);
  const { getAllSubVariation } = useSelector((state) => state?.product);
  const { wishList } = useSelector((state) => state?.wishList);
  let wishListId = localStorage?.getItem("wishListId");
  let userData = JSON.parse(localStorage.getItem("authUser"));
  if (wishListId) {
    wishListId = JSON.parse(wishListId);
  }

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

  const handleAddItem = (id, price) => {
    const alreadyInCart = cartList?.data?.cartDetails?.find(
      (item) => item.subProductId == id
    );
    if (alreadyInCart) {
      navigate("/cart-item");
    } else {
      onAddToCart(id, price);
    }
  };

  const checkLocalStorage = () => {
    const getLocalCartId = localStorage?.getItem("cartId");
    const convertData = JSON.parse(getLocalCartId);
    return convertData;
  };

  const onAddToCart = async (subId, price, itemId) => {
    nProgress.configure({ showSpinner: false });
    nProgress.start();
    try {
      const alreadyInCart = cartList?.data?.cartDetails?.find(
        (item) => item.subProductId == subId
      );
      if (alreadyInCart) {
        return navigate("/cart-item");
      }
      const convertData = checkLocalStorage();
      let payload = {
        subProductId: subId,
        quantity: 1,
      };
      if (convertData?.[0]?.cartId) {
        payload.cartId = convertData?.[0]?.cartId;
      }
      const response = await dispatch(addToCart(payload));
      if (response.meta.requestStatus === "fulfilled") {
        if (payload.cartId) {
          await dispatch(getCartListItems({ cartId: payload.cartId }));
        } else {
          const convertData = checkLocalStorage();
          await dispatch(getCartListItems({ cartId: convertData?.[0]?.cartId }));
        }
      }
    } catch (error) {
    } finally {
      nProgress.done();
    }
  };

  const handleWishlist = async (subProductId) => {
    try {
      nProgress.configure({ showSpinner: false });
      nProgress.start();
      let payload = {};
      let response;
      if (inWishList(subProductId, true)) {
        payload.wishlistItemId = wishlistItemId;
        response = await dispatch(removeWishlist(payload));
        wishlistItemId = "";
      } else {
        payload.subProductId = subProductId;
        if (wishListId) {
          payload.wishlistId = wishListId?.wishlistId;
        }
        response = await dispatch(addWishlistItem(payload));
      }
      if (response.meta.requestStatus == "fulfilled") {
        dispatch(getWishlist({ wishlistId: wishListId?.wishlistId }));
      }
    } catch (error) {
    } finally {
      nProgress.done();
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        autoClose: 5000,
      });
      dispatch(ACTION.changeSuccessStatus());
    }
  }, [isError]);

  useEffect(() => {
    dispatch(getAllSubProducts());
    if (wishListId || userData?.id)
      dispatch(getWishlist({ wishlistId: wishListId?.wishlistId }));
  }, []);

  return (
    <React.Fragment>
      <section className="our-products">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="heading text-center">
                <h1>{productSection?.title}</h1>
                {location?.pathname === "/edit" && (
                  <div className="editraw2_icon bg-dark">
                    <BiEdit
                      onClick={() => edithomeModal(true, "section5")}
                      className="text-white font-size-23"
                    />
                  </div>
                )}
                <img src={LineImage} alt="" className="img-fluid" />
                <h1 className="last">{productSection?.subTitle}</h1>
                <p>{productSection?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="water">
        <div className="container">
          <div className="row">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              breakpoints={breakpoints}
              navigation
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log("")}
              onSlideChange={() => console.log("")}
            >
              {getAllSubVariation?.map((product, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <div className="col-md-12">
                      <div className="box">
                        {product?.isDiscounted ? (
                          <span className="off">
                            {product.discountedValue}
                            {product.discountType === "percentage" ? (
                              "%"
                            ) : (
                              <Currency />
                            )}
                            {" OFF"}
                          </span>
                        ) : null}
                        <div className="product_imge">
                          <img
                            onClick={() => handleWishlist(product?.id)}
                            src={
                              inWishList(product?.id) ? FilledHeart : HeartImage
                            }
                            alt=""
                            className="heart img-fluid"
                          />
                        </div>
                        <div className="product-center text-center">
                          <div className="link_about mt-2">
                            <img
                              src={product?.coverImage}
                              alt=""
                              className="setbottleheight img-fluid w-100"
                            />
                          </div>
                          <p className="first">{product?.title} </p>
                          <div className="dolar dolar_icons d-flex align-items-center justify-content-center flex-column">
                            {product?.isDiscounted ? (
                              <sup>
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
                          <div className="d-flex align-items-center justify-content-center">
                            <Rating
                              initialValue={product.rating ? product.rating : 0}
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
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeProduct;
