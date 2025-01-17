import { createSlice } from "@reduxjs/toolkit";
import * as API from "./thunks";

const initialState = {
  message: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  issueList: [],
  pagination: {},
  allOrderList: [],
};

const couponSlice = createSlice({
  name: "Issue",
  initialState,
  reducers: {
    changeSuccessStatus: (state, action) => {
      (state.isError = false), (state.isSuccess = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(API?.getIssue?.pending, (state, action) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.getIssue?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.issueList = action.payload.data;
        state.pagination = action.payload.pagination || {};
      })
      .addCase(API?.getIssue?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.issueList = [];
      })

      //   delete issue
      .addCase(API?.deleteIssue?.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.deleteIssue?.fulfilled, (state) => {
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(API?.deleteIssue?.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // edit issue
      .addCase(API?.editIssue?.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.editIssue?.fulfilled, (state) => {
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(API?.editIssue?.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // user specific issue
      .addCase(API?.getUserIssue?.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.getUserIssue?.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.issueList = action.payload.data;
        state.pagination = action.payload.pagination || {};
      })
      .addCase(API?.getUserIssue?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = [];
      })
      .addCase(API?.getUserOrderList?.pending, (state) => {
        state.message = "";
      })
      .addCase(API?.getUserOrderList?.fulfilled, (state, action) => {
        state.allOrderList = action.payload;
      })
      .addCase(API?.getUserOrderList?.rejected, (state, action) => {
        state.isError = [];
      })

      // add issue
      .addCase(API?.addIssue?.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.addIssue?.fulfilled, (state) => {
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(API?.addIssue?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const { changeSuccessStatus } = couponSlice.actions;

export default couponSlice.reducer;
