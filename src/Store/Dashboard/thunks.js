import { createAsyncThunk } from "@reduxjs/toolkit";
import { setRedirect } from "Store/userAuthentication/signUpSlice";
import { adminApi } from "utils/axiosSetup";

//get permissions
export const getPermissions = createAsyncThunk(
  "/permissions",
  async (thunkAPI) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await adminApi.get("/api/permissions/get-permission");
        if (response.data.statusCode === 200) {
          resolve(response.data.data);
        } else {
          thunkAPI?.rejectWithValue(response.data.message);
          reject(response.data.message);
        }
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
  }
);

export const getSalesKpi = createAsyncThunk(
  "getSalesKpi",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.post(
        `/api/kpi/get-sale-by-year`,
        payload,
        {
          headers: {
            token: process.env.REACT_APP_KPI_KEY,
          },
        }
      );
      if (response.status !== 200) {
        const errorData = response.data;
        return thunkAPI.rejectWithValue(
          errorData.message || "Failed to fetch data"
        );
      }
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
export const getPurchaseKpi = createAsyncThunk(
  "getPurchaseKpi",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.post(
        `/api/kpi/get-top-sold-product`,
        payload,
        {
          headers: {
            token: process.env.REACT_APP_KPI_KEY,
          },
        }
      );
      if (response.status !== 200) {
        const errorData = response.data;
        return thunkAPI.rejectWithValue(
          errorData.message || "Failed to fetch data"
        );
      }
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
export const getTopSalesKpi = createAsyncThunk(
  "getTopSalesKpi",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.post(
        `/api/kpi/get-top-selling-area`,
        payload,
        {
          headers: {
            token: process.env.REACT_APP_KPI_KEY,
          },
        }
      );
      if (response.status !== 200) {
        const errorData = response.data;
        return thunkAPI.rejectWithValue(
          errorData.message || "Failed to fetch data"
        );
      }
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
export const getTopOrdersKpi = createAsyncThunk(
  "getTopOrdersKpi",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.post(
        `/api/kpi/get-delivery-detail`,
        payload,
        {
          headers: {
            token: process.env.REACT_APP_KPI_KEY,
          },
        }
      );
      if (response.status !== 200) {
        const errorData = response.data;
        return thunkAPI.rejectWithValue(
          errorData.message || "Failed to fetch data"
        );
      }
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
export const getSubscriptionKpi = createAsyncThunk(
  "getSubscriptionKpi",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.post(
        `/api/kpi/get-subscription-detail`,
        payload,
        {
          headers: {
            token: process.env.REACT_APP_KPI_KEY,
          },
        }
      );
      if (response.status !== 200) {
        const errorData = response.data;
        return thunkAPI.rejectWithValue(
          errorData.message || "Failed to fetch data"
        );
      }
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
export const getTopUsedCoupon = createAsyncThunk(
  "getTopUsedCoupon",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.post(
        `/api/kpi/get-top-used-coupon`,
        payload,
        {
          headers: {
            token: process.env.REACT_APP_KPI_KEY,
          },
        }
      );
      if (response.status !== 200) {
        const errorData = response.data;
        return thunkAPI.rejectWithValue(
          errorData.message || "Failed to fetch data"
        );
      }
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
