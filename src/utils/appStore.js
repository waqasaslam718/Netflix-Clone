// store.js
import { configureStore } from "@reduxjs/toolkit";
import gptReducer from "./gptSlice";
import userReducer from "./userSlice";
import configReducer from "./configSlice"; // 👈 import your config slice

const store = configureStore({
  reducer: {
    gpt: gptReducer,
    user: userReducer,
    config: configReducer, // 👈 register it here
  },
});

export default store;


