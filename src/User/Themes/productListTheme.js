import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import nProgress from "nprogress";
import { toast } from "react-toastify";

// Components
import Header from "User/Components/Header";
import Footer from "User/Components/Footer";
import OurProduct from "User/Pages/Products/Products";

// Store
import * as ACTION from "Store/Carts/cartSlice";
import { getVariations, getAllSubProducts } from "Store/Product/thunks";
import { addToCart, getCartListItems } from "Store/Carts/thunks";

const ProductListTheme = () => {
  const getLocalCartId = localStorage?.getItem("cartId");
  const convertData = JSON.parse(getLocalCartId);

  const location = useLocation();
  const query = new URLSearchParams(location?.search);
  const id = query.get("id");

  const dispatch = useDispatch();

  const checkLocalStorage = () => {
    const getLocalCartId = localStorage?.getItem("cartId");
    const convertData = JSON.parse(getLocalCartId);
    return convertData;
  };

  const { cartList, isSuccess, message, isError } = useSelector(
    (state) => state?.Cart
  );
  const { variations } = useSelector((state) => state?.product);

  const [subProductList, setsubProductList] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onAddToCart = async (subId, price) => {
    nProgress.configure({ showSpinner: false });
    nProgress.start();
    try {
      const getLocalCartId = localStorage?.getItem("cartId");
      const convertData = JSON.parse(getLocalCartId);
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

  useEffect(() => {
    dispatch(getVariations({ productId: 1 }));
    setIsSearchVisible(false);
  }, []);

  useEffect(() => {
    if (variations) {
      setsubProductList(variations);
    }
    if (variations?.length > 0) {
      setIsSearchVisible(true);
    }
  }, [variations]);

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        autoClose: 5000,
      });
      dispatch(ACTION.changeSuccessStatus());
    }
  }, [isError]);

  return (
    <React.Fragment>
      <Header />
      <OurProduct
        getId={1}
        subProductList={subProductList}
        onAddToCart={onAddToCart}
        cartList={cartList?.data?.cartDetails}
        isSearchVisible={isSearchVisible}
      />

      <Footer />
    </React.Fragment>
  );
};

export default ProductListTheme;
