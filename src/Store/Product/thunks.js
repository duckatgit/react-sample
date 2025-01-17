import { createAsyncThunk } from "@reduxjs/toolkit";
import { setRedirect } from "Store/userAuthentication/signUpSlice";
import { adminApi, userApi } from "utils/axiosSetup";

// Get products
export const getProducts = createAsyncThunk(
  "product",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.post(
        `/api/product/get-all-products`,
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

// Edit Product
export const editProduct = createAsyncThunk(
  "/updateproduct",
  async (formData, thunkAPI) => {
    try {
      const response = await adminApi.put(
        "/api/product/update-product",
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

// Delete Product
export const deleteProduct = createAsyncThunk(
  "/deleteproduct",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.delete(
        `/api/product/delete-product/${payload.id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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

// add product
export const addProduct = createAsyncThunk(
  "/addproduct",
  async (formData, thunkAPI) => {
    try {
      const response = await adminApi.post(
        "/api/product/add-product",
        formData
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

// get Products For User
export const getAllProducts = createAsyncThunk(
  "/user/products",
  async (_, thunkAPI) => {
    try {
      const response = await userApi.post(`/api/product/get-all-products`);
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

// get Variations For User
export const getVariations = createAsyncThunk(
  "/variation",
  async (payload, thunkAPI) => {
    try {
      const response = await userApi.post(
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

// get All Sub Products for User
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
export const addReview = createAsyncThunk(
  "/addReview",
  async (payload, thunkAPI) => {
    try {
      const response = await userApi.post(`/api/review/add-review`, payload);
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
export const getAllReviewData = createAsyncThunk(
  "/getAllReviewData",
  async (payload, thunkAPI) => {
    try {
      const response = await userApi.post(`/api/review/get-review`, payload);
      if (response?.status !== 200) {
        const errorData = response.data;
        return thunkAPI.rejectWithValue(
          errorData.message || "Failed to fetch data"
        );
      }
      return response?.data.data;
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

export const updateReview = createAsyncThunk(
  "/updateReview",
  async (payload, thunkAPI) => {
    try {
      const response = await userApi.put("/api/review/update-review", payload);
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

//get sub product by id
export const getSubProductByid = createAsyncThunk(
  "/subproductById",
  async (payload, thunkAPI) => {
    try {
      const response = await userApi.get(
        `/api/sub-product/get-sub-product/${payload?.id}`
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

export const setLikeUser = createAsyncThunk(
  "/setLikeUser",
  async (payload, thunkAPI) => {
    try {
      const response = await userApi.put(
        "/api/review/update-Like-user",
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

export const getReviews = createAsyncThunk(
  "/getReviews",
  async (payload, thunkAPI) => {
    try {
      const response = await userApi.get(
        `/api/review/get-product-rating/${payload.subproductId}`
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
