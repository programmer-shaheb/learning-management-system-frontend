import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/app/store.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        theme="light"
        position="top-center"
        autoClose={2000}
        closeOnClick
      />
    </Provider>
  </React.StrictMode>
);
