import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  layout: "light",
  layoutMode: "vertical",
  layoutWidth: "fluid",
  preloader: true,
  sidebarTheme: "dark",
  sidebarThemeImage: false,
  sidebarType: {
    sidebarType: "default",
    isMobile: false,
  },
  topbarTheme: "light",
  rightSidebarOpen: false,
  sidebarOpen: true,
  leftMenuOpen: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    changeLayout: (state, action) => {
      state.layout = action.payload;
    },
    changeLayoutMode: (state, action) => {
      state.layoutMode = action.payload;
    },
    changeLayoutWidth: (state, action) => {
      state.layoutWidth = action.payload;
    },
    changePreloader: (state, action) => {
      state.preloader = action.payload;
    },
    changeSidebarTheme: (state, action) => {
      state.sidebarTheme = action.payload;
    },
    changeSidebarThemeImage: (state, action) => {
      state.sidebarThemeImage = action.payload;
    },
    changeSidebarType: (state, action) => {
      state.sidebarType = action.payload;
    },
    changeTopbarTheme: (state, action) => {
      state.topbarTheme = action.payload;
    },
    showRightSidebarAction: (state, action) => {
      state.rightSidebarOpen = action.payload;
    },
    showSidebar: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleLeftmenu: (state, action) => {
      state.leftMenuOpen = action.payload;
    },
  },
});

export const {
  changeLayout,
  changeLayoutMode,
  changeLayoutWidth,
  changePreloader,
  changeSidebarTheme,
  changeSidebarThemeImage,
  changeSidebarType,
  changeTopbarTheme,
  showRightSidebarAction,
  showSidebar,
  toggleLeftmenu,
} = layoutSlice.actions;

export default layoutSlice.reducer;
