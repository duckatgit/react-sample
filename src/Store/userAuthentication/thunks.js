import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminApi, userApi } from "utils/axiosSetup";
import { setRedirect } from "./signUpSlice";

// User SignUp
export const postSignUp = createAsyncThunk("auth", async (user, thunkAPI) => {
  try {
    const res = await userApi.post("/api/auth/signup", user);
    if (!(res.data.statusCode === 200 || res.data.statusCode === 201)) {
      return thunkAPI.rejectWithValue(res.data.message);
    }
    return res.data.data;
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

// User profile
export const updateProfileImage = createAsyncThunk(
  "/updateProfile",
  async ({ payload, isUsedForAdmin }, thunkAPI) => {
    try {
      let response;
      if (isUsedForAdmin) {
        response = await adminApi.put("/api/user/update-user-image", payload);
      } else {
        response = await userApi.put("/api/user/update-user-image", payload);
      }

      if (
        !(response.data.statusCode === 200 || response.data.statusCode === 201)
      ) {
        return thunkAPI.rejectWithValue(response.data.message);
      }
      if (response.data.data) {
        if (isUsedForAdmin) {
          localStorage.setItem("authAdmin", JSON.stringify(response.data.data));
        } else {
          localStorage.setItem("authUser", JSON.stringify(response.data.data));
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

// User Login
export const postLogin = createAsyncThunk("/login", async (user, thunkAPI) => {
  try {
    const response = await userApi.post("/api/auth/login", {
      ...user,
    });

    if (
      !(response.data.statusCode === 200 || response.data.statusCode === 201)
    ) {
      return thunkAPI.rejectWithValue(response.data.message);
    }
    if (response.data.data) {
      localStorage.setItem("authUser", JSON.stringify(response.data.data));
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

// Forgot Password

export const postForgotPassword = createAsyncThunk(
  "/forgot",
  async (payload, thunkAPI) => {
    try {
      const response = await userApi.post(`/api/auth/forgot`, payload);
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

// verify Otp
export const verifyOtp = createAsyncThunk(
  "/verifyOtp",
  async (payload, thunkAPI) => {
    try {
      const response = await userApi.post(`/api/auth/verify-Otp`, payload);
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

// Confirm Password

export const postConfirmPassword = createAsyncThunk(
  "/confirmpassword",
  async (email, thunkAPI) => {
    try {
      const response = await userApi.post("/api/auth/reset", {
        ...email,
      });
      if (response.data.statusCode === 200) {
        return response.data.message;
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
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
  }
);

// Admin Login
export const postAdminLogin = createAsyncThunk(
  "/Adminlogin",
  async (user, thunkAPI) => {
    try {
      const response = await adminApi.post("/api/auth/login", {
        ...user,
      });

      if (
        !(response.data.statusCode === 200 || response.data.statusCode === 201)
      ) {
        return thunkAPI.rejectWithValue(response.data.message);
      }
      if (response.data.data) {
        localStorage.setItem("authAdmin", JSON.stringify(response.data.data));
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

// Update User
export const putUser = createAsyncThunk(
  "/putUser",
  async (updateuser, thunkAPI) => {
    try {
      const response = await userApi.put("/api/user/update-user", {
        ...updateuser,
      });
      if (response.data.statusCode === 200) {
        return response.data.message;
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
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
  }
);

// Edit user Profile Information
export const editUserProfile = createAsyncThunk(
  "/edit_profile",
  async ({ payload, isUsedForAdmin }, thunkAPI) => {
    try {
      let response;
      if (isUsedForAdmin) {
        response = await adminApi.put("/api/user/update-user-details", payload);
      } else {
        response = await userApi.put("/api/user/update-user-details", payload);
      }
      if (response.data.data) {
        if (isUsedForAdmin) {
          localStorage.setItem("authAdmin", JSON.stringify(response.data.data));
        } else {
          localStorage.setItem("authUser", JSON.stringify(response.data.data));
        }
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

// Change User Password
export const changePassword = createAsyncThunk(
  "/change_password",
  async ({ payload, isUsedForAdmin }, thunkAPI) => {
    try {
      let response;
      if (isUsedForAdmin) {
        response = await adminApi.put("/api/user/change-password", payload);
      } else {
        response = await userApi.put("/api/user/change-password", payload);
      }
      if (response.data.statusCode === 200) {
        return response.data.message;
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
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
  }
);

// Get User Profile
export const getUserProfile = createAsyncThunk(
  "/get_user_profile",
  async (_, thunkAPI) => {
    try {
      const response = await userApi.get(`/api/user/get-user-profile`);
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

// Get Admin Profile
export const getAdminProfile = createAsyncThunk(
  "/get_admin_profile",
  async (_, thunkAPI) => {
    try {
      const response = await adminApi.get(`/api/user/get-admin-profile`);
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

export const postGoogleLogin = createAsyncThunk(
  "/postGoogleLogin",
  async (payload, thunkAPI) => {
    try {
      const response = await userApi.post(`/api/auth/google-login`, payload);
      if (response.status !== 200) {
        const errorData = response.data;
        return thunkAPI.rejectWithValue(
          errorData.message || "Failed to fetch data"
        );
      }

      if (response.data.data) {
        localStorage.setItem("authUser", JSON.stringify(response.data.data));
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

export const postGoogleSignup = createAsyncThunk(
  "/postGoogleSignup",
  async (payload, thunkAPI) => {
    try {
      const response = await userApi.post(`/api/auth/google-signup`, payload);
      if (response.status !== 200) {
        const errorData = response.data;
        return thunkAPI.rejectWithValue(
          errorData.message || "Failed to fetch data"
        );
      }

      if (response.data.data) {
        localStorage.setItem("authUser", JSON.stringify(response.data.data));
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

export const postInstaToken = createAsyncThunk(
  "/postInstaToken",
  async (payload, thunkAPI) => {
    try {
      const response = await userApi.post(`/api/auth/instagram-login`, payload);
      if (response.status !== 200) {
        const errorData = response.data;
        return thunkAPI.rejectWithValue(
          errorData.message || "Failed to fetch data"
        );
      }

      if (response.data.data) {
        localStorage.setItem("authUser", JSON.stringify(response.data.data));
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
