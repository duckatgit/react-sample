import { createSlice } from "@reduxjs/toolkit";
import * as API from "./thunks";

const initialState = {
  message: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  productList: [],

  // Users
  products: [],
  variations: [],
  getAllSubVariation: [],
  getsubProductById: {},
  pagination: {},
  getreview: {},
  getAllReviews: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changeSuccessStatus: (state, action) => {
      (state.isError = false), (state.isSuccess = false);
    },
  },
  extraReducers: (builder) => {
    builder

      // get Products Admin
      .addCase(API?.getProducts?.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.getProducts?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.productList = action.payload.data || [];
        state.pagination = action.payload.pagination || {};
      })
      .addCase(API?.getProducts?.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.productList = [];
      })

      // Edit Product
      .addCase(API?.editProduct?.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.editProduct?.fulfilled, (state) => {
        state.isSuccess = true;
        state.isError = false;
        state.message = "Product updated successfully";
      })
      .addCase(API?.editProduct?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete Product
      .addCase(API?.deleteProduct?.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.deleteProduct?.fulfilled, (state) => {
        state.isSuccess = true;
        state.message = "Product deleted successfully";
      })
      .addCase(API?.deleteProduct?.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      // Add Product
      .addCase(API?.addProduct?.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.addProduct?.fulfilled, (state) => {
        state.isSuccess = true;
        state.message = "Product added successfully";
      })
      .addCase(API?.addProduct?.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(API?.addReview?.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.addReview?.fulfilled, (state) => {
        state.isSuccess = true;
        state.message = "Product added successfully";
      })
      .addCase(API?.addReview?.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(API?.getAllReviewData?.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.getAllReviewData?.fulfilled, (state, action) => {
        state.getAllReviews = action.payload.data || [];
        state.pagination = action.payload.pagination || {};
      })
      .addCase(API?.getAllReviewData?.rejected, (state, action) => {
        state.message = action.payload.data || {};
      })
      .addCase(API?.updateReview?.pending, (state) => {
        state.message = "";
      })
      .addCase(API?.updateReview?.fulfilled, (state) => {
        state.isSuccess = true;
        state.message = "Product added successfully";
      })
      .addCase(API?.updateReview?.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(API?.setLikeUser?.pending, (state, action) => {})
      .addCase(API?.setLikeUser?.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = "Liked";
      })
      .addCase(API?.setLikeUser?.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })

      // get Products For Users
      .addCase(API?.getAllProducts?.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.getAllProducts?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data || []; // Assuming response payload has 'data' array
        state.pagination = action.payload.pagination || {}; // Storing pagination data
      })
      .addCase(API?.getAllProducts?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // get SubProduct By id for Users
      .addCase(API?.getSubProductByid?.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.getSubProductByid?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.getsubProductById = action.payload || {};
      })
      .addCase(API?.getSubProductByid?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(API?.getReviews?.pending, (state) => {
        state.message = "";
      })
      .addCase(API?.getReviews?.fulfilled, (state, action) => {
        state.getreview = action.payload || {};
      })
      .addCase(API?.getReviews?.rejected, (state, action) => {
        state.message = action.payload;
      })

      // get Sub Products For Users
      .addCase(API?.getVariations?.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.getVariations?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.variations = action.payload.data || [];
        state.pagination = action.payload.pagination || {};
      })
      .addCase(API?.getVariations?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.data;
      })

      // get All Sub Products (Vaiations)
      .addCase(API?.getAllSubProducts?.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.getAllSubProducts?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.getAllSubVariation = action.payload.data;
      })
      .addCase(API?.getAllSubProducts?.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.getAllSubVariation = [];
      });
  },
});

export const { changeSuccessStatus } = productSlice.actions;

export default productSlice.reducer;
