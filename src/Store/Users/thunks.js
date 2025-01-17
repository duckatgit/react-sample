import { createAsyncThunk } from "@reduxjs/toolkit";
import { setRedirect } from "Store/userAuthentication/signUpSlice";
import { adminApi, userApi } from "utils/axiosSetup";

// Get Users
export const getUsers = createAsyncThunk("users", async (payload, thunkAPI) => {
  try {
    const response = await adminApi.post(`/api/user/get-all-user`, payload);
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

//Get user by id
export const getUserById = createAsyncThunk(
  "usersById",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.get(
        `/api/user/get-user-by-admin/${payload.userId}`
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

//send email
export const sendInvite = createAsyncThunk(
  "sendInvite",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.post(`/api/user/send-invite`, payload);
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

//send email
export const acceptInvite = createAsyncThunk(
  "acceptInvite",
  async (payload, thunkAPI) => {
    try {
      const response = await userApi.post(`/api/user/accept-invite`, payload);
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

//Update Status
export const updateStatus = createAsyncThunk(
  "updateStatus",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.put(`/api/user/update-status`, payload);
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

// Delete user
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.delete(
        `/api/user/delete-user/${payload.id}`,
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

//add permisions
export const addPermission = createAsyncThunk(
  "/addPermisssion",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.post(
        "/api/permissions/add-permission",
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
