import { createAsyncThunk } from "@reduxjs/toolkit";
import { setRedirect } from "Store/userAuthentication/signUpSlice";
import { adminApi, userApi } from "utils/axiosSetup";

// Get Home Page
export const getHomepage = createAsyncThunk("/homepage", async (thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await userApi.get(
        "/api/home-page/get-home-page-details"
      );
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
});

// Edit Section one
export const editHomeSectionOne = createAsyncThunk(
  "/edit_data",
  async (formData, thunkAPI) => {
    try {
      const response = await adminApi.put(
        "/api/home-page/edit-home-page-details",
        formData,
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

// Get About us Page
export const getAboutus = createAsyncThunk("/getabousus", async (thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await userApi.get(
        "/api/about-page/get-about-us-details"
      );
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
});

// Edit Aboutus Page
export const editAboutUs = createAsyncThunk(
  "/editabouts",
  async (formData, thunkAPI) => {
    try {
      const response = await adminApi.put(
        "/api/about-page/edit-about-us-details",
        formData,
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

// Get contact us Page
export const getContactus = createAsyncThunk(
  "/getContactus",
  async (thunkAPI) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await userApi.get(
          "/api/contact-page/get-contact-us-details"
        );
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

// Edit Aboutus Page
export const editContactUs = createAsyncThunk(
  "/editContactUs",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.put(
        "/api/contact-page/edit-contact-us-details",
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

// Send query
export const sendQuery = createAsyncThunk(
  "/sendQuery",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.post(
        "/api/contact-page/send-query",
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

// Edit delivery charge
export const editDeliveryCharge = createAsyncThunk(
  "/editDeliveryCharge",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.put(
        "/api/settings/update-charge",
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

// get setting details
export const getAllSetting = createAsyncThunk(
  "/getAllSetting",
  async (payload, thunkAPI) => {
    try {
      const response = await adminApi.get(
        "/api/settings/get-all-settings",
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
