import { createSlice } from "@reduxjs/toolkit";
import * as API from "./thunk";

const initialState = {
  message: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  subProductList: [],
  pagination: {},
};

const subproductSlice = createSlice({
  name: "sub-product",
  initialState,
  reducers: {
    changeSuccessStatus: (state, action) => {
      (state.isError = false), (state.isSuccess = false);
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(API?.addSubProduct?.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.addSubProduct?.fulfilled, (state) => {
        state.isSuccess = true;
        state.isError = false;
        state.message = "Subproduct added successfully";
      })
      .addCase(API?.addSubProduct?.rejected, (state, action) => {
        (state.message = action.payload), (state.isError = true);
      })

      .addCase(API?.generateSku?.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.generateSku?.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(API?.generateSku?.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(API?.getSubProducts?.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.getSubProducts?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.subProductList = action.payload.data || [];
        state.pagination = action.payload.pagination || {};
      })
      .addCase(API?.getSubProducts?.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.subProductList = [];
      })

      .addCase(API?.editSubProduct?.pending, (state, action) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.editSubProduct?.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.message = "Subproduct updated successfully";
      })
      .addCase(API?.editSubProduct?.rejected, (state, action) => {
        (state.message = action.payload), (state.isError = true);
      })

      .addCase(API?.deleteSubProduct?.pending, (state, action) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.deleteSubProduct?.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.message = "Subproduct deleted successfully";
      })
      .addCase(API?.deleteSubProduct?.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(API?.addQuantitySubProduct?.pending, (state, action) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.addQuantitySubProduct?.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.message = "Quantity updated successfully";
      })
      .addCase(API?.addQuantitySubProduct?.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isError = true;
      })

      .addCase(API?.getAllSubProducts?.pending, (state, action) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.getAllSubProducts?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.subProductList = action.payload.data || [];
        state.pagination = action.payload.pagination || {};
      })
      .addCase(API?.getAllSubProducts?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.subProductList = [];
      })

      .addCase(API?.addUpdateDiscount?.pending, (state, action) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.addUpdateDiscount?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Discount successfully added";
      })
      .addCase(API?.addUpdateDiscount?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(API?.deletediscount?.pending, (state, action) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.deletediscount?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Discount successfully removed";
      })
      .addCase(API?.deletediscount?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { changeSuccessStatus } = subproductSlice.actions;

export default subproductSlice.reducer;
