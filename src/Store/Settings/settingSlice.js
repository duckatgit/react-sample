import { createSlice } from "@reduxjs/toolkit";
import * as API from "./thunks";

const initialState = {
  message: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  home: [],
  aboutUs: [],
  contactUs:"",
  settingList:[],
};

const SettingSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    changeSuccessStatus: (state, action) => {
      (state.isError = false), (state.isSuccess = false);
    },
  },
  extraReducers: (builder) => {
    builder

      // get Home Page Section one
      .addCase(API.getHomepage.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API.getHomepage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.home = action.payload;
        state.message = "Success";
      })
      .addCase(API.getHomepage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // update Home Page Section one
      .addCase(API?.editHomeSectionOne.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(API?.editHomeSectionOne?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(API?.editHomeSectionOne?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // get About US  Page
      .addCase(API.getAboutus.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API.getAboutus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.aboutUs = action.payload;
        state.message = "Success";
      })
      .addCase(API.getAboutus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // update About Page Section one
      .addCase(API?.editAboutUs.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(API?.editAboutUs?.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(API?.editAboutUs?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // get Contact US  Page
      .addCase(API.getContactus.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(API.getContactus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contactUs = action.payload;
        state.message = "Success";
      })
      .addCase(API.getContactus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // update Contact Section 
      .addCase(API?.editContactUs.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(API?.editContactUs?.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(API?.editContactUs?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true
        state.message = action.payload;
      })

      //Send query
      .addCase(API?.sendQuery.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(API?.sendQuery?.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(API?.sendQuery?.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true
        state.message = action.payload;
      })

       //edit delivery charge
       .addCase(API?.editDeliveryCharge.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(API?.editDeliveryCharge?.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(API?.editDeliveryCharge?.rejected, (state, action) => {
        state.isLoading = false;
      })

       //Send query
       .addCase(API?.getAllSetting.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(API?.getAllSetting?.fulfilled, (state, action) => {
        state.settingList=action.payload
        state.isLoading=false
      })
      .addCase(API?.getAllSetting?.rejected, (state) => {
        state.isLoading = false;
        state.settingList =[]
      });

  },
});

export const { changeSuccessStatus } = SettingSlice.actions;
export default SettingSlice.reducer;
