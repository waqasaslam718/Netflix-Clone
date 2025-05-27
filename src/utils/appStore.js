import { configureStore } from "@reduxjs/toolkit";
import gptReducer from "./gptSlice";
import userReducer from "./userSlice";
import configReducer from "./configSlice";
import moviesReducer from "./moviesSlice"; // ✅ import movies slice

const store = configureStore({
  reducer: {
    gpt: gptReducer,
    user: userReducer,
    config: configReducer,
    movies: moviesReducer, // ✅ register it here
  },
});

export default store;
