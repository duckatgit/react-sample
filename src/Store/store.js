import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./Layout/layoutSlice";
import authSliceReducer from "./userAuthentication/signUpSlice";
import SettingSlice from "./Settings/settingSlice";
import userSlice from "./Users/userSlice";
import dashboardSlice from "./Dashboard/dashboardSlice";
import productSlice from "./Product/productSlice";
import subproductSlice from "./Product/ProductVariations/productVariationSlice";
import orderSlice from "./Order/orderSlice";


// Cart
import cartSlice from "./Carts/cartSlice";
import couponSlice from "./Coupon/CouponSlice";
import issueSlice from "./Customer-Support/issueSlice";
import userAddressSlice from "./Address/addresSlice";
import unitSlice from "./Unit/unitSlice";
import subUnitSlice from "./Unit/UnitVariations/unitVariationSlice";
import subscriptionSlice from "./Subscription/subscriptionSlice";
import wishlistSlice from "./Wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    Layout: layoutReducer,
    Settings: SettingSlice,
    users: userSlice,
    dashboard: dashboardSlice,
    product: productSlice,
    subproduct: subproductSlice,
    unit: unitSlice,
    subunit: subUnitSlice,
    Cart: cartSlice,
    order: orderSlice,
    coupon: couponSlice,
    issue: issueSlice,
    userAddress: userAddressSlice,
    subscription: subscriptionSlice,
    wishList:wishlistSlice
  },
});

export default store;
