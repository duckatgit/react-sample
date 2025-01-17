import { createSlice } from "@reduxjs/toolkit";
import * as API from "./thunks";

const initialState = {
  message: "",
  isError: false,
  isSuccess: false,
  permissionSuccess: false,
  isLoading: false,
  salesKpi: {},
  purchaseKpi: {},
  topSalesKpi: {},
  allOrdersKpi: {},
  subscriptionKpi: {},
  topUsedCouponKpi: {},
  sideDashboard: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getDashboard: (state, action) => {
      state.user = action.payload;
    },
    changeSuccessStatus: (state, action) => {
      (state.isError = false),
        (state.isSuccess = false),
        (state.permissionSucess = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(API?.getPermissions?.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.getPermissions?.fulfilled, (state, action) => {
        action.payload.sort((a, b) => a.position - b.position);
        state.isLoading = false;
        state.isSuccess = true;
        state.sideDashboard = action.payload;
      })
      .addCase(API?.getPermissions?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(API?.getSalesKpi?.pending, (state, action) => {
        state.message = "";
      })
      .addCase(API?.getSalesKpi?.fulfilled, (state, action) => {
        state.salesKpi = action.payload.data || {};
      })
      .addCase(API?.getSalesKpi?.rejected, (state, action) => {
        state.salesKpi = {};
      })
      .addCase(API?.getPurchaseKpi?.pending, (state, action) => {
        state.message = "";
      })
      .addCase(API?.getPurchaseKpi?.fulfilled, (state, action) => {
        state.purchaseKpi = action.payload.data || {};
      })
      .addCase(API?.getPurchaseKpi?.rejected, (state, action) => {
        state.purchaseKpi = {};
      })
      .addCase(API?.getTopSalesKpi?.pending, (state, action) => {
        state.message = "";
      })
      .addCase(API?.getTopSalesKpi?.fulfilled, (state, action) => {
        state.topSalesKpi = action.payload.data || {};
      })
      .addCase(API?.getTopSalesKpi?.rejected, (state, action) => {
        state.topSalesKpi = {};
      })
      .addCase(API?.getTopOrdersKpi?.pending, (state, action) => {
        state.message = "";
      })
      .addCase(API?.getTopOrdersKpi?.fulfilled, (state, action) => {
        state.allOrdersKpi = action.payload.data || {};
      })
      .addCase(API?.getTopOrdersKpi?.rejected, (state, action) => {
        state.allOrdersKpi = {};
      })
      .addCase(API?.getSubscriptionKpi?.pending, (state, action) => {
        state.message = "";
      })
      .addCase(API?.getSubscriptionKpi?.fulfilled, (state, action) => {
        state.subscriptionKpi = action.payload.data || {};
      })
      .addCase(API?.getSubscriptionKpi?.rejected, (state, action) => {
        state.subscriptionKpi = {};
      })
      .addCase(API?.getTopUsedCoupon?.pending, (state, action) => {
        state.message = "";
      })
      .addCase(API?.getTopUsedCoupon?.fulfilled, (state, action) => {
        state.topUsedCouponKpi = action.payload.data || {};
      })
      .addCase(API?.getTopUsedCoupon?.rejected, (state, action) => {
        state.topUsedCouponKpi = {};
      });
  },
});

export const { changeSuccessStatus } = dashboardSlice.actions;

export default dashboardSlice.reducer;
