import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import Header from "User/Components/Header";
import Footer from "User/Components/Footer";
import ProductItem from "User/Pages/Products/ProductItem";

// Store
import {  getProducts } from "Store/Product/thunks";

const ProductsTheme = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state?.product);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <React.Fragment>
      <Header />
      <ProductItem list={productList} />
      <Footer />
    </React.Fragment>
  );
};

export default ProductsTheme;
