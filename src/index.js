import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer/index'
import { GoogleOAuthProvider } from '@react-oauth/google';

export const store = configureStore({
  reducer: rootReducer,
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="400756884938-e3lauegvtqkoaaripn0u7r6fq334rk63.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
    </GoogleOAuthProvider>;
  </Provider>
);
