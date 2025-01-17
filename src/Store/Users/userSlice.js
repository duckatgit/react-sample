import { createSlice } from "@reduxjs/toolkit";
import * as API from "./thunks";

const dataSlice = createSlice({
  name: "userData",
  initialState: {
    message: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    userData: [],
    product: [],
    pagination: {},
  },
  reducers: {
    changeSuccessStatus: (state, action) => {
      (state.isError = false), (state.isSuccess = false), (state.message = "");
    },
  },

  extraReducers: (builder) => {
    builder

      // Get Users
      .addCase(API?.getUsers?.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.getUsers?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.data || [];
        state.pagination = action.payload.pagination || {};
      })
      .addCase(API?.getUsers?.rejected, (state, action) => {
        state.isLoading = false;
      })

      // Get Users
      .addCase(API?.getUserById?.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.getUserById?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = [action.payload];
      })
      .addCase(API?.getUserById?.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })

      // Send Invite Request
      .addCase(API?.sendInvite?.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.sendInvite?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Email sent successfully";
      })
      .addCase(API?.sendInvite?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Accept Invite Request
      .addCase(API?.acceptInvite?.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.acceptInvite?.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(API?.acceptInvite?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update Status
      .addCase(API?.updateStatus?.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(API?.updateStatus?.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Status updated successfully";
      })
      .addCase(API?.updateStatus?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete User
      .addCase(API?.deleteUser?.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(API?.deleteUser?.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Deleted successfully";
      })
      .addCase(API?.deleteUser?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Add Permission
      .addCase(API?.addPermission?.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(API?.addPermission?.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Successfully added the Permissions";
      })
      .addCase(API?.addPermission?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { changeSuccessStatus } = dataSlice.actions;
export default dataSlice.reducer;
