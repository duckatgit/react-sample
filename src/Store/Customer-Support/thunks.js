import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminApi, userApi } from "utils/axiosSetup";
import { setRedirect } from "Store/userAuthentication/signUpSlice";

// Get Issue
export const getIssue = createAsyncThunk("issue", async (payload, thunkAPI) => {
  try {
    const response = await adminApi.post(
      `/api/customer-support/get-all-issues`,
      payload
    );
    if (response.status !== 200) {
      const errorData = response.data;
      return thunkAPI.rejectWithValue(
        errorData.message || "Failed to fetch data"
      );
    }
    return response.data.data;
  } catch (error) {
    const message =
      (error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    if (error.response.data.statusCode == 401) {
      return thunkAPI.dispatch(setRedirect(message));
    }
    return thunkAPI.rejectWithValue(message);
  }
});

// Get User Specific Issues
export const getUserIssue = createAsyncThunk(
  "getUserIssue",
  async (payload, thunkAPI) => {
    try {
      const response = await userApi.post(
        `/api/customer-support/get-issue-user`,
        payload
      );
      if (response.status !== 200) {
        const errorData = response.data;
        return thunkAPI.rejectWithValue(
          errorData.message || "Failed to fetch data"
        );
      }
      return response.data.data;
    } catch (error) {
      const message =
        (error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      if (error.response.data.statusCode == 401) {
        return thunkAPI.dispatch(setRedirect(message));
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserOrderList = createAsyncThunk(
  "getUserOrderList",
  async (payload, thunkAPI) => {
    try {
      const response = await userApi.get(`/api/order/get-user-order-list`);
      if (response.status !== 200) {
        const errorData = response.data;
        return thunkAPI.rejectWithValue(
          errorData.message || "Failed to fetch data"
        );
      }
      return response.data.data;
    } catch (error) {
      const message =
        (error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      if (error.response.data.statusCode == 401) {
        return thunkAPI.dispatch(setRedirect(message));
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete issue
export const deleteIssue = createAsyncThunk(
  "/deleteIssue",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.delete(
        `/api/customer-support/delete-issue/${payload.id}`
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      if (error.response.data.statusCode == 401) {
        return thunkAPI.dispatch(setRedirect(message));
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//add issue
export const addIssue = createAsyncThunk(
  "/addIssue",
  async (payload, thunkAPI) => {
    try {
      const response = await userApi.post(
        "/api/customer-support/add-issue",
        payload
      );
      if (response.status !== 200) {
        const errorData = response.data;
        return thunkAPI.rejectWithValue(
          errorData.message || "Failed to fetch data"
        );
      }
      if (response.data.data) {
        const supportId = localStorage?.getItem("supportId");
        if (!supportId) {
          localStorage.setItem("supportId", JSON.stringify(response.data.data));
        }
      }
      return response.data.data;
    } catch (error) {
      const message =
        (error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      if (error.response.data.statusCode == 401) {
        return thunkAPI.dispatch(setRedirect(message));
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//update issue
export const editIssue = createAsyncThunk(
  "/editIssue",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.put(
        "/api/customer-support/update-issue",
        payload
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      if (error.response.data.statusCode == 401) {
        return thunkAPI.dispatch(setRedirect(message));
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
