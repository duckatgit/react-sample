import { createSlice } from "@reduxjs/toolkit";
import * as API from "./thunks";

let user = JSON.parse(localStorage.getItem("authUser"));
let admin = JSON.parse(localStorage.getItem("authAdmin"));

const initialState = {
  message: "",
  isError: false,
  isSuccess: false,
  isLoading: true,
  isAutoLogoutError: false,
  isAutoLogoutMessage: "",
  user: user || null,
  admin: admin || null,
  userData: {},
  editMessage: "",
  isEditSuccess: false,
  isEditError: false,
  isEditLoading: false,
  isLogged: false,
  otpToken: "",
  redirect: false,
  msgState: false,
  adminProfile: {},
  userProfile: {},
  googleToken: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRedirect: (state, msg) => {
      if (state.msgState == false) {
        state.msgState = true;
        (state.redirect = true),
          (state.isAutoLogoutError = true),
          (state.isAutoLogoutMessage = msg.payload);
      }
    },
    logOut: (state) => {
      localStorage.removeItem("authUser");
      localStorage.removeItem("cartId");
      localStorage.removeItem("userOrderId");
      localStorage.removeItem("wishListId");
      localStorage.removeItem("supportId");
      state.user = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.redirect = false;
      (state.isAutoLogoutError = false), (state.isAutoLogoutMessage = "");
    },
    logOutAdmin: (state) => {
      localStorage.removeItem("authAdmin");
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isEditError = false;
      state.isEditSuccess = false;
      state.message = "";
      state.isLogged = false;
    },

    setStatus: (state) => {
      state.isLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // User Sign Up
      .addCase(API?.postSignUp?.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.postSignUp?.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.userData = action.payload;
        state.message = action.payload;
      })
      .addCase(API?.postSignUp?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // User Login
      .addCase(API?.postLogin?.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.postLogin?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.msgState = false;
        state.isLogged = true;
        state.message = "User successfully logged in";
      })
      .addCase(API?.postLogin?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      // admin Login
      .addCase(API?.postAdminLogin?.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.postAdminLogin?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(API?.postAdminLogin?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      // Forgot password
      .addCase(API?.postForgotPassword?.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.postForgotPassword?.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(API?.postForgotPassword?.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      //Verify Otp
      .addCase(API?.verifyOtp?.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.verifyOtp?.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = "Otp successfully verified";
        state.otpToken = action.payload;
      })
      .addCase(API?.verifyOtp?.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      // Confirm password
      .addCase(API?.postConfirmPassword?.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.postConfirmPassword?.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = "Password changed successfully";
      })
      .addCase(API?.postConfirmPassword?.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      // Update User
      .addCase(API?.putUser?.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API?.putUser?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(API?.putUser?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update User Image
      .addCase(API?.updateProfileImage?.pending, (state) => {
        state.message = "";
      })
      .addCase(API?.updateProfileImage?.fulfilled, (state, action) => {
        state.isEditSuccess = true;
        state.message = "Image updated successfully";
      })
      .addCase(API?.updateProfileImage?.rejected, (state, action) => {
        state.isEditError = true;
        state.message = action.payload;
      })

      // Update User Profile Information
      .addCase(API?.editUserProfile?.pending, (state) => {})
      .addCase(API?.editUserProfile?.fulfilled, (state) => {
        state.isEditSuccess = true;
        state.message = "Profile updated successfully";
      })
      .addCase(API?.editUserProfile?.rejected, (state, action) => {
        state.isEditError = true;
        state.message = action.payload;
      })

      // Change Password
      .addCase(API?.changePassword?.pending, (state) => {})
      .addCase(API?.changePassword?.fulfilled, (state, action) => {
        state.isEditSuccess = true;
        state.message = "Password changed successfully";
      })
      .addCase(API?.changePassword?.rejected, (state, action) => {
        state.isEditError = true;
        state.message = action.payload;
      })

      // get User Profile
      .addCase(API?.getUserProfile?.pending, (state) => {
        state.message = "";
      })
      .addCase(API?.getUserProfile?.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(API?.getUserProfile?.rejected, (state) => {
        state.userProfile = {};
      })

      // get admin Profile
      .addCase(API?.getAdminProfile?.pending, (state) => {
        state.message = "";
      })
      .addCase(API?.getAdminProfile?.fulfilled, (state, action) => {
        state.adminProfile = action.payload;
      })
      .addCase(API?.getAdminProfile?.rejected, (state) => {
        state.adminProfile = {};
      })

      // Login With Google
      .addCase(API?.postGoogleLogin?.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(API?.postGoogleLogin?.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = "User logged in ";
        state.isLogged = true;
        state.user = action.payload;
      })
      .addCase(API?.postGoogleLogin?.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      // Signup With Google
      .addCase(API?.postGoogleSignup?.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(API?.postGoogleSignup?.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = "User logged in ";
        state.user = action.payload;
      })
      .addCase(API?.postGoogleSignup?.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      // Login With Insta
      .addCase(API?.postInstaToken?.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(API?.postInstaToken?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(API?.postInstaToken?.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const {
  logOut,
  logOutAdmin,
  reset,
  updateUser,
  setStatus,
  changeSuccessStatus,
  setRedirect,
} = authSlice.actions;

export default authSlice.reducer;
