import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import nProgress from "nprogress";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Currency from "utils/currency";
import { addToCart, getCartListItems } from "Store/Carts/thunks";
import * as ACTION from "Store/Carts/cartSlice";
import ImageSlider from "adminPanel/adminComponents/Common/ImageSlider";
import { useTranslation } from "react-i18next";

const MineralWater = ({ getsubProductById }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const getLocalCartId = localStorage?.getItem("cartId");
  const convertData = JSON.parse(getLocalCartId);
  const { cartList, isSuccess, isError, message } = useSelector(
    (state) => state?.Cart
  );
  const [preview, setPreview] = useState({
    isOpen: false,
    image: "",
  });

  const handleImageClick = () => {
    setPreview({ isOpen: true, image: JSON.parse(getsubProductById?.image) });
  };

  const checkLocalStorage = () => {
    const getLocalCartId = localStorage?.getItem("cartId");
    const convertData = JSON.parse(getLocalCartId);
    return convertData;
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

  const onAddToCart = async (subId, price) => {
    nProgress.configure({ showSpinner: false });
    nProgress.start();
    try {
      let payload = {
        subProductId: subId,
        quantity: 1,
      };
      if (convertData?.[0]?.cartId) {
        payload.cartId = convertData?.[0]?.cartId;
      }
      const response=await dispatch(addToCart(payload));
      if(response.meta.requestStatus=="fulfilled"){
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

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        autoClose: 5000,
      });
      dispatch(ACTION.changeSuccessStatus());
    } else if (isSuccess) {
      toast.success(message, {
        autoClose: 5000,
      });
    }
  }, [isError, isSuccess]);

  return (
    <React.Fragment>
      {preview.isOpen && (
        <ImageSlider
          isOpen={preview.isOpen}
          image={preview.image}
          setPreview={setPreview}
          isImageTrue={true}
        />
      )}
      <div className="product-detail">
        <div className="container">
          {/* <p className="mb-0">
            <span>Products / </span> Product Detail
          </p> */}
          <h1 className="pt-0">{t("productDetail")}</h1>

          <div className="row description p-0">
            <div className="col-lg-4 col-md-6 p-3">
              <div className="image">
                <img
                  src={getsubProductById?.coverImage}
                  alt=""
                  className="img-fluid"
                  onClick={handleImageClick}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
            <div className="col-lg-8 col-md-6 p-3">
              <div className="product-content">
                <p className="mb-0 font-fmly">{`${getsubProductById?.subUnitData?.subUnitValue}`}</p>
                <h1>{getsubProductById?.title}</h1>
                <div className="group d-flex align-items-center justify-content-start">
                  <Rating
                    initialValue={`${
                      getsubProductById?.rating ? getsubProductById?.rating : 0
                    }`}
                    readonly
                    size={25}
                  />
                </div>
                <p className="dolar mb-0">
                  {`${
                    getsubProductById?.isDiscounted
                      ? getsubProductById?.discountedPrice
                      : getsubProductById?.price
                  }`}
                  <Currency />
                  {getsubProductById?.isDiscounted ? (
                    <sup className="under-line">
                      {`${getsubProductById?.price}`}
                      <Currency />{" "}
                    </sup>
                  ) : null}
                </p>
                {getsubProductById.isDiscounted ? (
                  <div className="save d-flex align-items-center">
                    <span>{t("youSave")}</span>
                    <span>
                      <span className="off">
                        {getsubProductById.discountedValue}
                        {getsubProductById.discountType === "percentage" ? (
                          "%"
                        ) : (
                          <Currency />
                        )}
                        {" OFF"}
                      </span>
                    </span>
                  </div>
                ) : null}
                <hr className="line2" />
                <div className="add"> </div>
                <div className="contact">
                  <div
                    className="clip"
                    onClick={() =>
                      handleAddItem(
                        getsubProductById.id,
                        getsubProductById?.isDiscounted
                          ? getsubProductById?.discountedPrice
                          : getsubProductById?.price
                      )
                    }
                  >
                    <div className="round"></div>
                    <a>
                      <i className="fas fa-shopping-cart"></i>
                      {t("addToCart")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="line3" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MineralWater;
