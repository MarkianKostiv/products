import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./state/store";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProductComponent } from "./pages/ProductComponent";
import { AddUpdateForm } from "./pages/AddUpdateForm";
import { DeleteModal } from "./pages/DeleteModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/add_product", element: <AddUpdateForm AddOrUpdate='Add' /> },
      {
        path: "/update_product/:productId",
        element: <AddUpdateForm AddOrUpdate='Update' />,
      },
      {
        path: "/delete_product/:productId",
        element: <DeleteModal />,
      },
    ],
  },
  { path: "/product/:productId", element: <ProductComponent /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
