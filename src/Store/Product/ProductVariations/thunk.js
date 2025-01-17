import { createAsyncThunk } from "@reduxjs/toolkit";
import { setRedirect } from "Store/userAuthentication/signUpSlice";
import { adminApi } from "utils/axiosSetup";

// add sub product
export const addSubProduct = createAsyncThunk(
  "/addsubproduct",
  async (formData, thunkAPI) => {
    try {
      const response = await adminApi.post(
        "/api/sub-product/add-sub-product",
        formData
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

// Generate sku
export const generateSku = createAsyncThunk(
  "/generateSku",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.post(
        "/api/sub-product/generate-sku",
        payload
      );
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

export const addQuantitySubProduct = createAsyncThunk(
  "/addQuantitySubproduct",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.put(
        "/api/sub-product/update-sub-product-quantity",
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

// get sub product
export const getSubProducts = createAsyncThunk(
  "/getsubproduct",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.post(
        `/api/sub-product/get-sub-product-by-product-id`,
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

// edit sub product
export const editSubProduct = createAsyncThunk(
  "/updatesubproduct",
  async (formData, thunkAPI) => {
    try {
      const response = await adminApi.put(
        "/api/sub-product/update-sub-product",
        formData
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

//deleteSub product
export const deleteSubProduct = createAsyncThunk(
  "/deletesubproduct",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.delete(
        `/api/sub-product/delete-sub-product/${payload.id}`
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

export const getAllSubProducts = createAsyncThunk(
  "/getAllsubProducts",
  async (_, thunkAPI) => {
    try {
      const response = await adminApi.post(
        `/api/sub-product/get-all-sub-products`
      );
      if (response?.status !== 200) {
        const errorData = response.data;
        return thunkAPI.rejectWithValue(
          errorData.message || "Failed to fetch data"
        );
      }
      return response?.data?.data;
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

// Add & update product
export const addUpdateDiscount = createAsyncThunk(
  "/addUpdateDiscount",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.put(
        "/api/discount/edit-discount",
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

// Delete Product
export const deletediscount = createAsyncThunk(
  "/deletediscount",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.delete(
        `/api/discount/remove-discount/${payload.id}`
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
